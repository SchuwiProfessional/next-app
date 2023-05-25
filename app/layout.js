
import login from "../app/page.jsx"
import '../styles/globals.css'

export const metadata = {
  title: 'LA CASA DEL FRENO HUANCAYO E.I.R.L',
}
  
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
