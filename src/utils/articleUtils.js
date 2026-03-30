/**
 * @param {unknown} article
 * @returns {boolean}
 */
export function isValidArticle(article) {
  if (!article || typeof article !== 'object') return false
  const title = article.title
  return typeof title === 'string' && title.length > 0 && title !== '[Removed]'
}

/**
 * @param {unknown[]} list
 * @returns {unknown[]}
 */
export function filterValidArticles(list) {
  if (!Array.isArray(list)) return []
  return list.filter(isValidArticle)
}

/**
 * @param {Array<Record<string, unknown>>} articles
 * @param {string} query
 */
export function filterArticlesByQuery(articles, query) {
  const q = query.trim().toLowerCase()
  if (!q) return articles

  return articles.filter((a) => {
    const title = (a.title || '').toLowerCase()
    const desc = (a.description || '').toLowerCase()
    const source = (a.source?.name || '').toLowerCase()
    return title.includes(q) || desc.includes(q) || source.includes(q)
  })
}
