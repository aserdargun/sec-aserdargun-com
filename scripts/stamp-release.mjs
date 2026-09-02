import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const repository = 'aserdargun/sec-aserdargun-com'
const sha = process.env.GITHUB_SHA || execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()

if (!/^[0-9a-f]{40}$/i.test(sha)) {
  throw new Error(`Release SHA must contain exactly 40 hexadecimal characters; received ${JSON.stringify(sha)}`)
}

const dist = resolve('dist')
mkdirSync(dist, { recursive: true })
writeFileSync(
  resolve(dist, 'release.json'),
  `${JSON.stringify({ sha, builtAt: new Date().toISOString(), repository }, null, 2)}\n`,
)

console.log(`Stamped ${repository} release ${sha}.`)
