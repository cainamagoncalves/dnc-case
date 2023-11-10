import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { AuthContextProvider } from '@/contexts/AuthContext'
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-primary-100 scroll-smooth`}>
        <AuthContextProvider>
          {children}
          <ToastContainer />
        </AuthContextProvider>
      </body>
    </html>
  )
}
