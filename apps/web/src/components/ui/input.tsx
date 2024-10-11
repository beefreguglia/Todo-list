import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ ...props }: InputProps) {
  return (
    <input
      className="w-full appearance-none rounded-2xl border-2 border-solid border-transparent bg-slate-950 px-4 py-2 outline-none ring-1 ring-slate-500 hover:ring-teal-700 focus:ring-teal-700"
      {...props}
    />
  )
}
