'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

type AuthContainerProps = {
  children: ReactNode
}

export function AuthContainer({ children }: AuthContainerProps) {
  const { user } = useAuth()
  const { push: redirect } = useRouter()

  useEffect(() => {
    if (!user) {
      redirect('/')
    }
  }, [user])

  return <>{children}</>
}
