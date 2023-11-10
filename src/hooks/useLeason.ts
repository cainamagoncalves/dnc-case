import { LeasonContext } from '@/contexts/LeasonContext'
import { useContext } from 'react'

export const useLeason = () => useContext(LeasonContext)
