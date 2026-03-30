import { NEWS_API_BASE, getNewsApiKey } from '../config/api'
import { DEFAULT_HEADLINES_PAGE_SIZE, GLOBAL_CATEGORY_QUERIES } from '../constants/news'
import { filterValidArticles } from '../utils/articleUtils'

/**
 * @typedef {Object} FetchHeadlinesResult
 * @property {boolean} ok
 * @property {unknown[]} articles
 * @property {string | null} error
 */

const FALLBACK_KEY = '6df65848ae72492da5458da9fc528a67'

/**
 * @param {unknown} data
 * @returns {FetchHeadlinesResult}
 */
function resultFromApiPayload(data) {
  if (data.status === 'error') {
    return {
      ok: false,
      articles: [],
      error: data.message || 'Could not load headlines.',
    }
  }
  const raw = Array.isArray(data.articles) ? data.articles : []
  return {
    ok: true,
    articles: filterValidArticles(raw),
    error: null,
  }
}

/**
 * India-focused search when top-headlines returns nothing (some keys/plans behave oddly per country).
 * @param {{ category: string; pageSize: number; apiKey: string }} p
 */
async function fetchIndiaEverythingFallback({ category, pageSize, apiKey }) {
  const topic = GLOBAL_CATEGORY_QUERIES[category] || 'news'
  const q = category === 'general' ? 'India' : `(${topic}) AND India`

  const url = new URL(`${NEWS_API_BASE}/everything`)
  url.searchParams.set('q', q)
  url.searchParams.set('language', 'en')
  url.searchParams.set('sortBy', 'publishedAt')
  url.searchParams.set('pageSize', String(pageSize))
  url.searchParams.set('apiKey', apiKey)

  const response = await fetch(url.toString())
  const data = await response.json()
  return resultFromApiPayload(data)
}

/**
 * India: top-headlines for country=in, then everything+India if the list is empty.
 * @param {{ category: string; pageSize: number; apiKey: string }} p
 */
async function fetchIndiaHeadlines({ category, pageSize, apiKey }) {
  const url = new URL(`${NEWS_API_BASE}/top-headlines`)
  url.searchParams.set('country', 'in')
  url.searchParams.set('category', category)
  url.searchParams.set('pageSize', String(pageSize))
  url.searchParams.set('apiKey', apiKey)

  const response = await fetch(url.toString())
  const data = await response.json()
  const first = resultFromApiPayload(data)

  if (first.ok && first.articles.length > 0) {
    return first
  }

  const fallback = await fetchIndiaEverythingFallback({ category, pageSize, apiKey })
  if (fallback.ok && fallback.articles.length > 0) {
    return fallback
  }

  return first.ok ? fallback : first
}

/**
 * Global: English articles from many sources (NewsAPI everything — not limited to one country code).
 * @param {{ category: string; pageSize: number; apiKey: string }} p
 */
async function fetchGlobalEverything({ category, pageSize, apiKey }) {
  const q = GLOBAL_CATEGORY_QUERIES[category] || GLOBAL_CATEGORY_QUERIES.general

  const url = new URL(`${NEWS_API_BASE}/everything`)
  url.searchParams.set('q', q)
  url.searchParams.set('language', 'en')
  url.searchParams.set('sortBy', 'publishedAt')
  url.searchParams.set('pageSize', String(pageSize))
  url.searchParams.set('apiKey', apiKey)

  const response = await fetch(url.toString())
  const data = await response.json()
  return resultFromApiPayload(data)
}

/**
 * @param {{ region: 'global' | 'in'; category: string; pageSize?: number }} params
 * @returns {Promise<FetchHeadlinesResult>}
 */
export async function fetchNews({ region, category, pageSize = DEFAULT_HEADLINES_PAGE_SIZE }) {
  const apiKey = getNewsApiKey() || FALLBACK_KEY

  if (!apiKey) {
    return {
      ok: false,
      articles: [],
      error: 'Missing API key. Add REACT_APP_NEWS_API_KEY to a .env file.',
    }
  }

  try {
    if (region === 'in') {
      return await fetchIndiaHeadlines({ category, pageSize, apiKey })
    }
    return await fetchGlobalEverything({ category, pageSize, apiKey })
  } catch {
    return {
      ok: false,
      articles: [],
      error: 'Network error. Check your connection and try again.',
    }
  }
}
