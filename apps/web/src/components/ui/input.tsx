import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return (
      <input
        className="w-full appearance-none rounded-2xl border-2 border-solid border-transparent bg-slate-950 px-4 py-2 text-slate-100 outline-none ring-1 ring-slate-500 transition-colors placeholder:text-slate-400 hover:ring-teal-700 focus:ring-teal-700"
        {...props}
        ref={ref}
      />
    )
  },
)
