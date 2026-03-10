import { spawn } from 'child_process'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { prompt, componentPath, componentName } = await req.json()

  if (!prompt?.trim()) {
    return NextResponse.json({ success: false, error: 'No prompt provided' }, { status: 400 })
  }

  const fullPrompt = [
    componentPath && `Edit the file at ${componentPath}. Make your changes directly to that file.`,
    componentName && `The component is called ${componentName}.`,
    prompt.trim(),
    'Keep the same design system: dark theme with #000/#181818 bg, Lato font, pink #EF508D for primary, green #4FC660 for deals/savings, orange #FB7A29 for fees, white #fff for primary text, #989898 for secondary text. Mobile 393px width.',
    'IMPORTANT: You must read and edit the file directly. Do not just describe changes — apply them.',
  ].filter(Boolean).join(' ')

  try {
    const output = await new Promise((resolve, reject) => {
      let stdout = ''
      let stderr = ''

      const claudePath = process.env.HOME + '/.local/bin/claude'
      const proc = spawn(claudePath, ['--dangerously-skip-permissions', '--verbose'], {
        cwd: process.cwd(),
        env: { ...process.env, TERM: 'dumb', CLAUDECODE: '', PATH: process.env.PATH + ':/usr/local/bin:/opt/homebrew/bin:' + process.env.HOME + '/.local/bin' },
        stdio: ['pipe', 'pipe', 'pipe'],
      })

      proc.stdin.write(fullPrompt)
      proc.stdin.end()

      proc.stdout.on('data', (chunk) => { stdout += chunk.toString() })
      proc.stderr.on('data', (chunk) => { stderr += chunk.toString() })

      const timer = setTimeout(() => {
        proc.kill('SIGTERM')
        reject(new Error('Claude Code timed out after 180s'))
      }, 180000)

      proc.on('close', (code) => {
        clearTimeout(timer)
        if (code === 0) {
          resolve(stdout)
        } else {
          reject(new Error(stderr || `Claude Code exited with code ${code}`))
        }
      })

      proc.on('error', (err) => {
        clearTimeout(timer)
        reject(new Error(`Failed to start Claude Code: ${err.message}`))
      })
    })

    return NextResponse.json({ success: true, output })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
