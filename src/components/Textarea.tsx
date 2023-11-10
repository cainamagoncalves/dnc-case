'use client'

import { forwardRef, TextareaHTMLAttributes } from 'react'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...rest }, ref) => {
    return (
      <textarea
        className={`bg-transparent py-2 px-4 rounded-sm outline outline-2 outline-primary-70 ext-primary-20 transition-all focus:outline-white ${className}`}
        ref={ref}
        {...rest}
      />
    )
  },
)

Textarea.displayName = 'Textarea'

export { Textarea }
