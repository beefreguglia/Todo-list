import { NextPageContext } from 'next'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

export function setAuthTokenCookie(
  ctx: NextPageContext | null,
  token: string,
): void {
  setCookie(ctx, 'todoToken', token, {
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
    HttpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })
}

export function getAuthTokenCookie(
  ctx: NextPageContext | null,
): string | undefined {
  const cookies = parseCookies(ctx)
  return cookies.todoToken
}

export function removeAuthTokenCookie(ctx: NextPageContext | null): void {
  destroyCookie(ctx, 'todoToken', {
    path: '/',
  })
}

export function isAuthenticated(ctx: NextPageContext | null): boolean {
  const token = getAuthTokenCookie(ctx)
  return !!token
}
