import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

test('Playwright uses the configured SEC preview port', () => {
  const script = [
    "import config from './playwright.config.ts'",
    "console.log(JSON.stringify({ baseURL: config.use?.baseURL, webServerUrl: config.webServer?.url, webServerCommand: config.webServer?.command }))",
  ].join('; ')
  const result = spawnSync('npm', ['exec', '--', 'tsx', '-e', script], {
    cwd: projectRoot,
    encoding: 'utf8',
    env: { ...process.env, SEC_PREVIEW_PORT: '43123' },
  })

  assert.equal(result.status, 0, result.stderr)
  assert.deepEqual(JSON.parse(result.stdout.trim()), {
    baseURL: 'http://127.0.0.1:43123',
    webServerUrl: 'http://127.0.0.1:43123/en',
    webServerCommand: 'npm run build && npm run preview:serve -- --port 43123',
  })
})
