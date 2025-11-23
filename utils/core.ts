// Central API configuration
export const BASE_URL = 'https://dev.dursamiii.my.id/api/v1/admin/'

export const ENDPOINTS = {
  login: BASE_URL + 'login',
  // profile/me endpoint used to validate token
  profile: BASE_URL + 'profile',
  // add more endpoints here, e.g.:
  // users: BASE_URL + 'users',
  // register: BASE_URL + 'register',
}

export function buildUrl(path: string) {
  if (path.startsWith('http')) return path
  return `${BASE_URL}${path.replace(/^\//, '')}`
}

export type ApiEndpoints = typeof ENDPOINTS

export default {
  BASE_URL,
  ENDPOINTS,
  buildUrl,
}
