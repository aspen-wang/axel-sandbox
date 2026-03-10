import { Lato, Raleway } from 'next/font/google'
import './globals.css'

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-raleway',
})

export const metadata = {
  title: 'Axel Design Sandbox',
  description: 'Design workbench for the Axel travel app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lato.variable} ${raleway.variable}`}>
      <body>
        {children}
        <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
      </body>
    </html>
  )
}
