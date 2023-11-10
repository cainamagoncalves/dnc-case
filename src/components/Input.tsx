'use client'

import { forwardRef, InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...rest }, ref) => {
  return (
    <input
      className="bg-transparent py-2 px-4 rounded-sm outline outline-2 outline-primary-70 text-primary-20 transition-all focus:outline-white"
      ref={ref}
      {...rest}
    />
  )
})

Input.displayName = 'Input'

export { Input }
