import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

function fixture(t) {
  const cwd = mkdtempSync(path.join(os.tmpdir(), 'sec-release-'))
  t.after(() => rmSync(cwd, { recursive: true, force: true }))
  mkdirSync(path.join(cwd, 'dist/assets'), { recursive: true })
  mkdirSync(path.join(cwd, 'public'))
  writeFileSync(path.join(cwd, '.gitignore'), 'dist/\n')
  writeFileSync(path.join(cwd, 'source.txt'), 'original')
  for (const directory of ['public', 'dist']) copyFileSync(path.join(root, 'public/staticwebapp.config.json'), path.join(cwd, directory, 'staticwebapp.config.json'))
  writeFileSync(path.join(cwd, 'dist/index.html'), '<div id="root"></div><script src="/assets/index-abc.js"></script><link href="/assets/index-abc.css">')
  for (const asset of ['index-abc.js', 'index-abc.css', 'font.woff2']) writeFileSync(path.join(cwd, 'dist/assets', asset), '')
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()
  git('init')
  git('add', '.')
  git('-c', 'user.name=SEC Test', '-c', 'user.email=sec-test@example.invalid', 'commit', '-m', 'fixture')
  const run = (script, env = {}) => spawnSync(process.execPath, [path.join(root, 'scripts', script)], {
    cwd, encoding: 'utf8', env: { ...process.env, GITHUB_SHA: '', GITHUB_ACTIONS: '', ...env },
  })
  const release = () => JSON.parse(readFileSync(path.join(cwd, 'dist/release.json'), 'utf8'))
  return { cwd, git, run, release }
}

test('release records the checked-out revision and distinguishes local edits', (t) => {
  const f = fixture(t)
  assert.equal(f.run('stamp-release.mjs').status, 0)
  assert.equal(f.release().sha, f.git('rev-parse', 'HEAD'))
  assert.equal(f.release().dirty, false)
  assert.equal(f.release().schemaVersion, 2)
  assert.equal(f.run('validate-artifact.mjs').status, 0)
  writeFileSync(path.join(f.cwd, 'source.txt'), 'changed')
  assert.equal(f.run('stamp-release.mjs').status, 0)
  assert.equal(f.release().dirty, true)
  assert.notEqual(f.run('stamp-release.mjs', { GITHUB_ACTIONS: 'true' }).status, 0)
  assert.notEqual(f.run('validate-artifact.mjs', { GITHUB_ACTIONS: 'true' }).status, 0)
})

test('release refuses a SHA unrelated to the checkout', (t) => {
  const f = fixture(t)
  const result = f.run('stamp-release.mjs', { GITHUB_SHA: '0'.repeat(40) })
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /does not match/)
  assert.equal(f.run('stamp-release.mjs').status, 0)
  writeFileSync(path.join(f.cwd, 'dist/release.json'), JSON.stringify({ ...f.release(), sha: '0'.repeat(40) }))
  const validation = f.run('validate-artifact.mjs')
  assert.notEqual(validation.status, 0)
  assert.match(validation.stderr, /different Git revision/)
})

test('artifact validation catches changed hosting configuration and missing linked assets', (t) => {
  const f = fixture(t)
  assert.equal(f.run('stamp-release.mjs').status, 0)
  writeFileSync(path.join(f.cwd, 'dist/staticwebapp.config.json'), '{}')
  assert.notEqual(f.run('validate-artifact.mjs').status, 0)
  copyFileSync(path.join(f.cwd, 'public/staticwebapp.config.json'), path.join(f.cwd, 'dist/staticwebapp.config.json'))
  writeFileSync(path.join(f.cwd, 'dist/index.html'), '<div id="root"></div><script src="/assets/index-missing.js"></script>')
  const result = f.run('validate-artifact.mjs')
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /missing asset/)
})
