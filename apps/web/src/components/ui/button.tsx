import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="mt-8 w-full rounded-3xl bg-teal-700 px-4 py-3 font-semibold text-slate-100 transition-colors hover:bg-teal-600"
    />
  )
}
