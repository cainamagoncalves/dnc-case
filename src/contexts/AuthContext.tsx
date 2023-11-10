'use client'

import { ReactNode, createContext, useState } from 'react'
import { toast } from 'react-toastify'

type LoginProps = {
  email: string
  password: string
}

type AuthContextProps = {
  user: Omit<User, 'password'> | null
  login: (props: LoginProps) => Promise<void>
  logout: () => void
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null)

  async function login(props: LoginProps) {
    const response = await fetch(
      `http://localhost:3333/users?email=${props.email}&password=${props.password}`,
    )

    if (!response.ok) {
      toast.error('Usuário e/ou senha incorretos.')
    }

    const user = await response.json()

    delete user.password

    setUser(user[0])

    toast.success('Login realizado com sucesso!')
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
