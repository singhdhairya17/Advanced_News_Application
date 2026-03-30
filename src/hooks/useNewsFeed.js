import { useCallback, useEffect, useState } from 'react'
import { fetchNews } from '../services/newsService'

const SEARCH_DEBOUNCE_MS = 450

export function useNewsFeed() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('general')
  const [region, setRegion] = useState('global')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search.trim()), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(id)
  }, [search])

  const load = useCallback(
    async (query) => {
      setLoading(true)
      setError(null)

      const result = await fetchNews({ region, category, search: query })

      if (!result.ok) {
        setError(result.error)
        setArticles([])
      } else {
        setArticles(result.articles)
      }

      setLoading(false)
    },
    [category, region]
  )

  useEffect(() => {
    load(debouncedSearch)
  }, [debouncedSearch, load])

  const refresh = useCallback(() => {
    load(search.trim())
  }, [load, search])

  const featured = articles[0]
  const rest = featured ? articles.slice(1) : []

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
    showNoMatches: !loading && !error && articles.length === 0,
  }
}
