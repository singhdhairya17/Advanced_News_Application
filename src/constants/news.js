export const PLACEHOLDER_IMAGE_URL =
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80'

export const DEFAULT_HEADLINES_PAGE_SIZE = 40

export const NEWS_CATEGORIES = [
  { id: 'general', label: 'Top' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Tech' },
  { id: 'science', label: 'Science' },
  { id: 'health', label: 'Health' },
  { id: 'sports', label: 'Sports' },
  { id: 'entertainment', label: 'Culture' },
]

/** Edition: global uses /everything (English, worldwide); India uses /top-headlines?country=in */
export const NEWS_REGIONS = [
  { id: 'global', label: 'Global' },
  { id: 'in', label: 'India' },
]

/** Search terms for NewsAPI /everything when edition is global (category is ignored by API for this path) */
export const GLOBAL_CATEGORY_QUERIES = {
  general: 'world OR international OR breaking news',
  business: 'business',
  technology: 'technology',
  science: 'science',
  health: 'health',
  sports: 'sports',
  entertainment: 'entertainment',
}
