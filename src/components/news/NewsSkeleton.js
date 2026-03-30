import { SKELETON_CARD_COUNT } from '../../constants/ui'

export function NewsSkeleton() {
  return (
    <div className="skeleton-layout" aria-busy="true" aria-label="Loading articles">
      <div className="skeleton skeleton-hero" />
      <div className="skeleton-grid">
        {Array.from({ length: SKELETON_CARD_COUNT }, (_, i) => (
          <div key={`sk-${i}`} className="skeleton skeleton-card" />
        ))}
      </div>
    </div>
  )
}
