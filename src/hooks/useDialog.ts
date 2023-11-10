import { DialogContext } from '@/contexts/DialogContext'
import { useContext } from 'react'

export const useDialog = () => useContext(DialogContext)
