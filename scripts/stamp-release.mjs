import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const repository = 'aserdargun/sec-aserdargun-com'
const head = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
const sha = process.env.GITHUB_SHA || head

if (!/^[0-9a-f]{40}$/i.test(sha)) {
  throw new Error(`Release SHA must contain exactly 40 hexadecimal characters; received ${JSON.stringify(sha)}`)
}
if (sha !== head) throw new Error('Release SHA does not match the checked-out Git revision')

const dirty = execFileSync('git', ['status', '--porcelain', '--untracked-files=normal'], { encoding: 'utf8' }).trim().length > 0
if (process.env.GITHUB_ACTIONS === 'true' && dirty) throw new Error('Production release requires a clean working tree')

const dist = resolve('dist')
mkdirSync(dist, { recursive: true })
const configSha256 = createHash('sha256').update(readFileSync(resolve(dist, 'staticwebapp.config.json'))).digest('hex')
writeFileSync(
  resolve(dist, 'release.json'),
  `${JSON.stringify({ schemaVersion: 2, sha, dirty, builtAt: new Date().toISOString(), repository, configSha256 }, null, 2)}\n`,
)

console.log(`Stamped ${repository} release ${sha}${dirty ? ' (local changes)' : ''}.`)
