import { PLACEHOLDER_IMAGE_URL } from '../../constants/news'
import { formatRelativeTime } from '../../utils/formatRelativeTime'
import { SafeArticleImage } from '../common/SafeArticleImage'

export function ArticleCard({ article }) {
  if (!article?.url) return null

  return (
    <article className="article-card">
      <a className="article-card-link" href={article.url} target="_blank" rel="noopener noreferrer">
        <div className="article-thumb">
          <SafeArticleImage
            src={article.urlToImage}
            fallback={PLACEHOLDER_IMAGE_URL}
            loading="lazy"
          />
        </div>
        <div className="article-body">
          <span className="article-source">
            {article.source?.name || 'Source'}
            {article.publishedAt ? (
              <span className="article-time"> · {formatRelativeTime(article.publishedAt)}</span>
            ) : null}
          </span>
          <h3 className="article-title">{article.title}</h3>
          {article.description ? <p className="article-desc">{article.description}</p> : null}
          <span className="article-read">Read article</span>
        </div>
      </a>
    </article>
  )
}
