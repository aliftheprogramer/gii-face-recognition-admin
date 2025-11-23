import { isTokenValid } from '../../utils/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  // allow public routes
  const publicPaths = ['/login', '/create-account', '/']

  if (publicPaths.includes(to.path)) return

  // only run client-side because we rely on localStorage
  if (!process.client) return

  try {
    const valid = await isTokenValid()
    if (!valid) {
      return navigateTo('/login')
    }
  } catch (e) {
    return navigateTo('/login')
  }
})
