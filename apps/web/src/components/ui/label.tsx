import { LabelHTMLAttributes } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ ...props }: LabelProps) {
  return <label className="block pb-2 text-slate-200" {...props} />
}
