import { useEffect, useState } from 'react'

export function SafeArticleImage({ src, fallback, className, loading }) {
  const resolved = src || fallback
  const [current, setCurrent] = useState(resolved)

  useEffect(() => {
    setCurrent(resolved)
  }, [resolved])

  return (
    <img
      src={current}
      alt=""
      className={className}
      loading={loading}
      onError={() => setCurrent(fallback)}
    />
  )
}
