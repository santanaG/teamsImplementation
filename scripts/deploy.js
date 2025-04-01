import { exec } from 'node:child_process'
import { platform } from 'node:os'

const isWindows = platform() === 'win32'

const command = isWindows
  ? 'npm ci --omit=dev && npx func azure functionapp publish VF-Teams'
  : 'npm ci --omit=dev && func azure functionapp publish VF-Teams'

console.log(`Running deploy script for ${isWindows ? 'Windows' : 'macOS/Linux'}...`)

exec(command, { shell: true })
  .then(({ stdout, stderr }) => {
    if (stdout) console.log(stdout)
    if (stderr) console.error(stderr)
    console.log('Deployment completed successfully.')
  })
  .catch(error => {
    console.error('Deployment failed:', error.message)
    process.exit(1)
  })
