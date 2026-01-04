// Central API configuration
export const BASE_URL = 'https://dev.dursamiii.my.id/api/v1/admin/'

export const ENDPOINTS = {
  login: BASE_URL + 'login',
  // profile/me endpoint used to validate token
  profile: BASE_URL + 'profile',
  // get users
  getUsers: BASE_URL + 'get-users',
  // delete user
  deleteUser: BASE_URL + 'delete-user',
  // add more endpoints here, e.g.:
  // users: BASE_URL + 'users',
  // register: BASE_URL + 'register',
}

export function buildUrl(path: string) {
  if (path.startsWith('http')) return path
  return `${BASE_URL}${path.replace(/^\//, '')}`
}

// Build absolute URL for stored files (storage/...)
export function buildFileUrl(filepath: string) {
  if (!filepath) return ''
  // derive site root from BASE_URL (remove api path)
  const siteRoot = BASE_URL.replace(/api\/v1\/admin\/?$/, '')
  return filepath.startsWith('http') ? filepath : `${siteRoot.replace(/\/$/, '')}/${filepath.replace(/^\//, '')}`
}

export type ApiEndpoints = typeof ENDPOINTS

export default {
  BASE_URL,
  ENDPOINTS,
  buildUrl,
}
