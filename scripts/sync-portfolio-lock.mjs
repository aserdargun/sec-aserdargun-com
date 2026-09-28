#!/usr/bin/env node
// Regenerates src/content/portfolio.lock.json from the canonical public
// application manifest, which lives in the sibling `aserdargun-com` repo
// (data/living-system.json). The lock is committed on purpose: CI has no network
// access, so the hand-written SEC portfolio relationships are verified against
// this committed projection instead of against the live manifest.
//
// It also resolves `reviewedAt`, which used to be a hand-bumped date literal in
// src/content/portfolio.ts. It is now projected from the manifest (the newest
// lastVerified across the referenced codes), and the script refuses to write a
// lock whose reviewedAt is newer than SEC's newest content snapshot — the
// correct response to that is a new snapshot, not an edit to a magic string.
//
// Usage:
//   npm run sync:portfolio
//   ASERDARGUN_LIVING_SYSTEM=/abs/path/living-system.json npm run sync:portfolio
//   node scripts/sync-portfolio-lock.mjs /abs/path/living-system.json
import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const repoRoot = path.resolve(import.meta.dirname, '..')
const lockPath = path.join(repoRoot, 'src', 'content', 'portfolio.lock.json')
const snapshotsDir = path.join(repoRoot, 'content', 'snapshots')

// Declared here, never derived from src/content/portfolio.ts: the relationship
// list is SEC editorial copy, but which codes exist upstream is not. The test
// compares the module against this list, not against itself.
const CODES = ['hns', 'ctx', 'evl', 'lcl', 'cld']
// Minimal projection: only the fields src/content/portfolio.ts mirrors.
const FIELDS = ['code', 'address']

const defaultManifest = path.join(repoRoot, '..', 'aserdargun-com', 'data', 'living-system.json')
const manifestPath = path.resolve(process.env.ASERDARGUN_LIVING_SYSTEM ?? process.argv[2] ?? defaultManifest)

function fail(message) {
  console.error(`sync:portfolio — ${message}`)
  process.exit(1)
}

let raw
try {
  raw = await readFile(manifestPath, 'utf8')
} catch {
  fail(
    `canonical manifest not readable at ${manifestPath}. Clone the sibling aserdargun-com repo ` +
      'next to this checkout, or pass ASERDARGUN_LIVING_SYSTEM=<path to data/living-system.json>.',
  )
}

let manifest
try {
  manifest = JSON.parse(raw)
} catch (error) {
  fail(`canonical manifest is not valid JSON (${manifestPath}): ${error.message}`)
}

if (!Array.isArray(manifest?.applications)) {
  fail(`canonical manifest has no "applications" array (${manifestPath})`)
}

const byCode = new Map(manifest.applications.map((app) => [app?.code, app]))
const missing = CODES.filter((code) => !byCode.has(code))
if (missing.length > 0) {
  fail(
    `canonical manifest is missing ${missing.length} referenced code(s): ${missing.join(', ')}. ` +
      'Either the code was retired upstream or this repo must drop it deliberately.',
  )
}

const applications = CODES.map((code) => {
  const app = byCode.get(code)
  for (const field of FIELDS) {
    if (app[field] === undefined || app[field] === null) {
      fail(`manifest application "${code}" has no "${field}"`)
    }
  }
  if (typeof app.lastVerified !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(app.lastVerified)) {
    fail(`manifest application "${code}" has no ISO lastVerified date`)
  }
  return Object.fromEntries(FIELDS.map((field) => [field, app[field]]))
})

// The portfolio review date is the day the newest referenced identity was last
// verified upstream. It used to be a literal in src/content/portfolio.ts that had
// to be hand-bumped in lockstep with the newest snapshot.
const reviewedAt = applications
  .map(({ code }) => byCode.get(code).lastVerified)
  .sort()
  .at(-1)

const snapshotFiles = (await readdir(snapshotsDir).catch(() => fail(`cannot read ${snapshotsDir}`)))
  .filter((file) => file.endsWith('.json'))
if (snapshotFiles.length === 0) {
  fail(`no content snapshots found in ${snapshotsDir}`)
}
const cutoffDates = []
for (const file of snapshotFiles) {
  const snapshot = JSON.parse(await readFile(path.join(snapshotsDir, file), 'utf8'))
  if (typeof snapshot?.cutoffDate !== 'string') {
    fail(`content snapshot ${file} has no cutoffDate`)
  }
  cutoffDates.push(snapshot.cutoffDate)
}
const latestCutoff = cutoffDates.sort().at(-1)
if (reviewedAt > latestCutoff) {
  fail(
    `the manifest verifies the referenced applications on ${reviewedAt}, which is newer than SEC's ` +
      `newest content snapshot cutoff (${latestCutoff}). Cut a new snapshot under content/snapshots/ ` +
      'and register it in src/content/catalog.ts, then re-run this script. Do not edit reviewedAt by hand.',
  )
}

const next = {
  source: 'aserdargun-com/data/living-system.json',
  reviewedAtSource: 'max(lastVerified) across the referenced codes',
  reviewedAt,
  applications,
}

const previous = await readFile(lockPath, 'utf8').then(
  (text) => JSON.parse(text),
  () => null,
)

await writeFile(lockPath, `${JSON.stringify(next, null, 2)}\n`, 'utf8')

if (previous === null) {
  console.log(`sync:portfolio — created ${path.relative(repoRoot, lockPath)} with ${applications.length} applications from ${manifestPath}`)
} else {
  if (previous.source !== next.source) {
    console.log(`sync:portfolio — source changed: ${previous.source} -> ${next.source}`)
  }
  if (previous.reviewedAt !== next.reviewedAt) {
    console.log(`sync:portfolio — reviewedAt: ${previous.reviewedAt} -> ${next.reviewedAt} (snapshot cutoff ${latestCutoff})`)
  }
}

const previousByCode = new Map((previous?.applications ?? []).map((app) => [app.code, app]))
const changes = []
for (const app of applications) {
  const before = previousByCode.get(app.code)
  if (!before) {
    changes.push(`+ ${app.code} ${app.address}`)
    continue
  }
  for (const field of FIELDS) {
    if (JSON.stringify(before[field]) !== JSON.stringify(app[field])) {
      changes.push(`~ ${app.code}.${field}: ${JSON.stringify(before[field])} -> ${JSON.stringify(app[field])}`)
    }
  }
  previousByCode.delete(app.code)
}
for (const code of previousByCode.keys()) {
  changes.push(`- ${code} (no longer referenced by this repo's CODES list)`)
}

if (changes.length === 0) {
  console.log(`sync:portfolio — ${applications.length} applications already match ${manifestPath}`)
} else {
  console.log(`sync:portfolio — ${changes.length} change(s) written to ${path.relative(repoRoot, lockPath)}:`)
  for (const change of changes) console.log(`  ${change}`)
}
console.log('sync:portfolio — run `npm run test:run` to confirm src/content/portfolio.ts still matches the lock.')
