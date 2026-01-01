const ACCESS_KEY = import.meta.env.PUBLIC_UNSPLASH_ACCESS_KEY

if (!ACCESS_KEY) {
  console.warn('Unsplash API key is missing')
}

export async function unsplashFetch<T>(
  endpoint: string,
  params: Record<string, string | number> = {}
): Promise<T> {
  const url = new URL(`https://api.unsplash.com${endpoint}`)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value))
  })

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Unsplash error: ${res.status} ${error}`)
  }

  return res.json()
}
