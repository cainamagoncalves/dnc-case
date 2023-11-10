'use client'

import Image from 'next/image'
import logo from '@/assets/images/logo.png'
import { Button } from './Button'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export function Header() {
  const { login, logout, user } = useAuth()

  const { push: redirect } = useRouter()

  const isAuthenticated = !!user

  return (
    <header className="bg-black w-full py-4 top-0 z-50 fixed">
      <div className="max-w-[1120px] m-auto flex items-center justify-between">
        <Image
          onClick={() => redirect('/')}
          alt="Logo"
          src={logo}
          width={85}
          height={85}
          className="cursor-pointer transition-transform hover:translate-y-2"
        />
        {isAuthenticated ? (
          <div className="flex items-center gap-20">
            <span
              onClick={() => redirect(`/user/${user.id}/courses`)}
              className="flex flex-col items-center cursor-pointer hover:after:transition-all hover:after:content:-[''] hover:after:outline hover:after:outline-2 hover:after:w-full hover:after:animate-fade"
            >
              MEUS CURSOS
            </span>
            <Button onClick={logout} variant="outline">
              Sair
            </Button>
          </div>
        ) : (
          <div className="inline-flex items-center gap-4">
            <Button
              onClick={() =>
                login({ email: 'jhondoe@email.com', password: '1234' })
              }
              variant="outline"
            >
              Entrar
            </Button>
            <Button variant="primary" className="font-bold">
              Criar conta
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
