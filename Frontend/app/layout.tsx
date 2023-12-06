import Header from './_components/Header'
import { AuthProvider } from './_contexts/authContext'
import './globals.css'

export const metadata = {
  title: 'Fantasy Cycling'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen child:min-w-[768px]">
        <AuthProvider>
          <Header/>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}