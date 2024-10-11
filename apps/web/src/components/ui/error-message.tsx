import { HTMLAttributes } from 'react'

interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {}

export function ErrorMessage({ ...props }: ErrorMessageProps) {
  return <p {...props} className="mt-2 text-sm text-rose-400" />
}
