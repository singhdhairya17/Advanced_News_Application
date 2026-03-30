import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchNews } from '../services/newsService'
import { filterArticlesByQuery } from '../utils/articleUtils'

export function useNewsFeed() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('general')
  const [region, setRegion] = useState('global')
  const [search, setSearch] = useState('')

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)

    const result = await fetchNews({ region, category })

    if (!result.ok) {
      setError(result.error)
      setArticles([])
    } else {
      setArticles(result.articles)
    }

    setLoading(false)
  }, [category, region])

  useEffect(() => {
    refresh()
  }, [refresh])

  const filtered = useMemo(
    () => filterArticlesByQuery(articles, search),
    [articles, search]
  )

  const featured = filtered[0]
  const rest = featured ? filtered.slice(1) : []

  return {
    articles,
    loading,
    error,
    category,
    setCategory,
    region,
    setRegion,
    search,
    setSearch,
    refresh,
    featured,
    rest,
    showSkeleton: loading && articles.length === 0 && !error,
    showNoMatches: !loading && !error && filtered.length === 0,
  }
}
