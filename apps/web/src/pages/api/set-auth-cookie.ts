import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { token } = req.body

  if (token) {
    setCookie({ res }, 'todoToken', token, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
  }

  return res.status(201).end()
}
