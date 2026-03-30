import { APP_NAME } from '../../constants/branding'
import { useNewsFeed } from '../../hooks/useNewsFeed'
import { ArticleCard } from './ArticleCard'
import { FeaturedStory } from './FeaturedStory'
import { NewsSkeleton } from './NewsSkeleton'
import { NewsToolbar } from './NewsToolbar'
import './NewsPage.css'

export function NewsPage() {
  const {
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
    showSkeleton,
    showNoMatches,
  } = useNewsFeed()

  return (
    <main className="news-page" id="top">
      <section className="news-intro" aria-labelledby="news-heading">
        <p className="news-kicker">Updated headlines</p>
        <h1 id="news-heading" className="news-title">
          Today&apos;s top stories
        </h1>
        <p className="news-subtitle">
          <strong>Global</strong> pulls worldwide English stories; <strong>India</strong> focuses on
          Indian headlines. Choose a topic, search by keyword, and open any story in a new tab.
        </p>
      </section>

      <NewsToolbar
        region={region}
        category={category}
        search={search}
        loading={loading}
        onRegionChange={setRegion}
        onCategoryChange={setCategory}
        onSearchChange={setSearch}
        onRefresh={refresh}
      />

      {error ? (
        <div className="message message-error" role="alert">
          <p>{error}</p>
          <button type="button" className="btn-retry" onClick={refresh}>
            Try again
          </button>
        </div>
      ) : null}

      {showSkeleton ? <NewsSkeleton /> : null}

      {showNoMatches ? (
        <p className="message message-empty">No articles match your search.</p>
      ) : null}

      {!loading && featured ? <FeaturedStory article={featured} /> : null}

      {rest.length > 0 ? (
        <section className="article-grid-section" aria-label="More headlines">
          <h2 className="section-heading">More headlines</h2>
          <div className="article-grid">
            {rest.map((article, index) => (
              <ArticleCard
                key={`${article.url || article.title}-${index}`}
                article={article}
              />
            ))}
          </div>
        </section>
      ) : null}

      <footer className="news-footer">
        <p className="news-footer-brand">{APP_NAME}</p>
        <p className="news-footer-tagline">
          A calm place to scan what&apos;s happening—open any story to read the full article on the
          original publisher&apos;s site.
        </p>
        <p className="news-footer-credit">
          Data provided by{' '}
          <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer">
            NewsAPI
          </a>
          . Made for learning and everyday reading; respect each outlet&apos;s terms and copyright.
        </p>
      </footer>
    </main>
  )
}

export default NewsPage
