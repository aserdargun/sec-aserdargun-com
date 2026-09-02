import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve('dist')
const required = ['index.html', 'release.json', 'staticwebapp.config.json']
for (const file of required) assert.ok(existsSync(resolve(dist, file)), `Missing dist/${file}`)

const config = JSON.parse(readFileSync(resolve(dist, 'staticwebapp.config.json'), 'utf8'))
assert.deepEqual(config.navigationFallback, { rewrite: '/index.html', exclude: ['/assets/*', '/*.json'] })
const rootRoute = config.routes.find((route) => route.route === '/')
assert.deepEqual(rootRoute, { route: '/', redirect: '/en', statusCode: 301 })
for (const header of ['Content-Security-Policy', 'Permissions-Policy', 'Referrer-Policy', 'X-Content-Type-Options', 'X-Frame-Options']) {
  assert.ok(config.globalHeaders[header], `Missing ${header}`)
}
assert.doesNotMatch(config.globalHeaders['Content-Security-Policy'], /unsafe-inline|unsafe-eval/)

const release = JSON.parse(readFileSync(resolve(dist, 'release.json'), 'utf8'))
assert.match(release.sha, /^[0-9a-f]{40}$/i)
assert.equal(release.repository, 'aserdargun/sec-aserdargun-com')
assert.ok(!Number.isNaN(Date.parse(release.builtAt)), 'release builtAt is not a valid timestamp')

const assets = readdirSync(resolve(dist, 'assets'))
assert.ok(assets.some((file) => /^index-[A-Za-z0-9_-]+\.js$/.test(file)), 'Missing hashed JavaScript entry')
assert.ok(assets.some((file) => /^index-[A-Za-z0-9_-]+\.css$/.test(file)), 'Missing hashed CSS entry')
assert.ok(assets.some((file) => file.endsWith('.woff2')), 'Missing bundled WOFF2 fonts')

const html = readFileSync(resolve(dist, 'index.html'), 'utf8')
assert.match(html, /<div id="root"><\/div>/)
assert.match(html, /\/assets\/index-[A-Za-z0-9_-]+\.js/)

console.log(`SEC artifact valid: ${assets.length} assets, release ${release.sha}.`)
