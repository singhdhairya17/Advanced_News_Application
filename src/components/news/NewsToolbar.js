import { NEWS_CATEGORIES, NEWS_REGIONS } from '../../constants/news'

export function NewsToolbar({
  region,
  category,
  search,
  loading,
  onRegionChange,
  onCategoryChange,
  onSearchChange,
  onRefresh,
}) {
  return (
    <div className="news-toolbar" id="feed">
      <div className="toolbar-row">
        <label className="visually-hidden" htmlFor="region-select">
          Edition
        </label>
        <select
          id="region-select"
          className="select-control"
          value={region}
          onChange={(e) => onRegionChange(e.target.value)}
          disabled={loading}
        >
          {NEWS_REGIONS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>

        <div className="category-tabs" role="tablist" aria-label="News category">
          {NEWS_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={category === c.id}
              className={`category-tab ${category === c.id ? 'is-active' : ''}`}
              onClick={() => onCategoryChange(c.id)}
              disabled={loading}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="toolbar-row toolbar-row-2">
        <input
          type="search"
          className="search-input"
          placeholder="Search headlines…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search headlines"
        />
        <button
          type="button"
          className="btn-refresh"
          onClick={onRefresh}
          disabled={loading}
          aria-label="Refresh news"
        >
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>
    </div>
  )
}
