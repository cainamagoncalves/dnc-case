'use client'

import { ReactNode, createContext, useState } from 'react'

type LeasonProviderProps = {
  children: ReactNode
}

type LeasonContextProps = {
  leason: Leason
  selectLeason: (leason: Leason) => void
}

export const LeasonContext = createContext({} as LeasonContextProps)

export function LeasonProvider({ children }: LeasonProviderProps) {
  const [leason, setLeason] = useState<Leason>({} as Leason)

  function selectLeason(leason: Leason) {
    setLeason(leason)
  }

  return (
    <LeasonContext.Provider
      value={{
        leason,
        selectLeason,
      }}
    >
      {children}
    </LeasonContext.Provider>
  )
}
