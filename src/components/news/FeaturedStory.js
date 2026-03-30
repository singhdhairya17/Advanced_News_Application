import { PLACEHOLDER_IMAGE_URL } from '../../constants/news'
import { formatRelativeTime } from '../../utils/formatRelativeTime'
import { SafeArticleImage } from '../common/SafeArticleImage'

export function FeaturedStory({ article }) {
  if (!article?.url) return null

  return (
    <section className="featured-section" aria-labelledby="featured-heading">
      <h2 id="featured-heading" className="visually-hidden">
        Featured story
      </h2>
      <a className="featured-card" href={article.url} target="_blank" rel="noopener noreferrer">
        <div className="featured-image-outer">
          <div className="featured-image-aspect">
            <SafeArticleImage
              src={article.urlToImage}
              fallback={PLACEHOLDER_IMAGE_URL}
              className="featured-image"
            />
            <div className="featured-gradient" aria-hidden="true" />
          </div>
        </div>
        <div className="featured-content">
          <span className="featured-badge">Featured</span>
          <span className="featured-meta">
            {article.source?.name || 'News'}
            {article.publishedAt ? ` · ${formatRelativeTime(article.publishedAt)}` : ''}
          </span>
          <h3 className="featured-headline">{article.title}</h3>
          {article.description ? <p className="featured-desc">{article.description}</p> : null}
          <span className="featured-cta">Read full story →</span>
        </div>
      </a>
    </section>
  )
}
