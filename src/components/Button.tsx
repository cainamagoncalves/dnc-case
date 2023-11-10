'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { ButtonLoading } from './ButtonLoading'

const variants = cva(
  [
    'rounded-md',
    'text-base',
    'inline-flex items-center justify-center',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-white',
          'text-primary-100',
          'transition',
          'hover:opacity-90',
          'disabled:bg-primary-20',
        ],
        outline: [
          'outline',
          'outline-1',
          'outline-primary-70',
          'opacity-90',
          'disabled:opacity-50',
          'transition-all',
          'hover:opacity-100',
          'hover:outline-white',
        ],
      },
      size: {
        sm: ['py-1', 'px-4'],
        md: ['py-2', 'px-6', 'leading-6'],
        lg: [],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof variants> & {
    loading?: boolean
  }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, loading, ...rest }, ref) => {
    return (
      <button
        className={variants({ variant, size, className })}
        ref={ref}
        {...rest}
      >
        {loading ? <ButtonLoading /> : children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button }
