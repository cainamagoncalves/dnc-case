'use client'

import { ReactNode, createContext, useState } from 'react'

type DialogContextProps = {
  open: boolean
  toggle: () => void
}

type DialogProviderProps = {
  children: ReactNode
}

export const DialogContext = createContext({} as DialogContextProps)

export function DialogProvider({ children }: DialogProviderProps) {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen((prevState) => !prevState)

  return (
    <DialogContext.Provider
      value={{
        open,
        toggle,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}
