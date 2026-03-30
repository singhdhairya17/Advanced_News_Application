export const NEWS_API_BASE = 'https://newsapi.org/v2'

export function getNewsApiKey() {
  return process.env.REACT_APP_NEWS_API_KEY || ''
}
