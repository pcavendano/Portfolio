const ALLOWED_GITHUB_USER = 'pcavendano'

export async function validateAdmin(request: Request): Promise<boolean> {
  const token = request.headers.get('x-github-token')
  if (!token) return false

  try {
    const res = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })
    if (!res.ok) return false
    const user = await res.json()
    return user.login === ALLOWED_GITHUB_USER
  } catch {
    return false
  }
}

export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-github-token',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  }
}

export function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
  })
}

export function errorResponse(message: string, status = 400) {
  return jsonResponse({ error: message }, status)
}
