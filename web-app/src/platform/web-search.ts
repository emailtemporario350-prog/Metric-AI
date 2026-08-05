import { metricConfig } from '@/config/metric'

type SearchResult = {
  url: string
  title: string
  snippet: string
  published_at?: string
}

type FetchResult = {
  title: string
  url: string
  content: string
  truncated?: boolean
}

async function metricRequest<T>(path: string, body: unknown): Promise<T> {
  if (!metricConfig.apiUrl) {
    throw new Error('Configure VITE_METRIC_API_URL to use web tools.')
  }
  const response = await fetch(`${metricConfig.apiUrl.replace(/\/$/, '')}${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`Metric API returned ${response.status}.`)
  return response.json() as Promise<T>
}

export function webSearch(
  query: string,
  count?: number,
  apiKey?: string,
  searchProvider?: string,
  endpoint?: string
): Promise<SearchResult[]> {
  return metricRequest<SearchResult[]>('/web/search', {
    query,
    count,
    apiKey,
    searchProvider,
    endpoint,
  })
}

export function webFetch(
  url: string,
  apiKey?: string,
  searchProvider?: string,
  endpoint?: string
): Promise<FetchResult> {
  return metricRequest<FetchResult>('/web/fetch', {
    url,
    apiKey,
    searchProvider,
    endpoint,
  })
}
