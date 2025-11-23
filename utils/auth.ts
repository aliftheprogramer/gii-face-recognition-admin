import { ENDPOINTS } from './core'
import { ref } from 'vue'

const STORAGE_KEY = 'auth'

export type AuthPayload = {
  access_token: string
  refresh_token?: string
  token_type?: string
  expires_in?: number
  admin?: Record<string, any>
  // internal helper
  expiry_at?: number
}

export function setAuth(payload: AuthPayload) {
  try {
    const copy: AuthPayload = { ...payload }
    // compute absolute expiry timestamp (ms)
    if (payload.expires_in && !payload.expiry_at) {
      // subtract small buffer (30s) to avoid edge cases
      copy.expiry_at = Date.now() + Math.max(0, payload.expires_in * 1000 - 30000)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(copy))
    // update reactive store as well
    try { authStore.value = copy } catch (e) { /* ignore */ }
  } catch (e) {
    // ignore storage errors
  }
}

export function getAuth(): AuthPayload | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (!v) return null
    return JSON.parse(v) as AuthPayload
  } catch (e) {
    return null
  }
}

export function getAccessToken(): string | null {
  const a = getAuth()
  return a?.access_token ?? null
}

export function removeAuth() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    // ignore
  }
}

// reactive auth store (client-side) so UI can react to login/logout
export const authStore = ref<AuthPayload | null>(null)

// hydrate store from localStorage on client
if (process.client) {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v) authStore.value = JSON.parse(v)
  } catch (e) {
    authStore.value = null
  }
}

async function verifyWithServer(token: string): Promise<boolean> {
  try {
    const res = await fetch(ENDPOINTS.profile, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    return res.ok
  } catch (e) {
    return false
  }
}

export async function isTokenValid(): Promise<boolean> {
  const auth = getAuth()
  const token = auth?.access_token
  if (!token) return false

  // if expiry timestamp exists, trust it (fast path)
  if (auth?.expiry_at) {
    return Date.now() < auth.expiry_at
  }

  // otherwise verify with server
  return await verifyWithServer(token)
}

export default {
  setAuth,
  getAuth,
  getAccessToken,
  removeAuth,
  isTokenValid,
}
