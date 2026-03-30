import React from 'react'
import './CitizenLogo.css'

/**
 * Citizen Post wordmark icon — document stack suggesting a civic bulletin / post.
 * @param {{ className?: string }} props
 */
export function CitizenLogo({ className = '' }) {
  return (
    <svg
      className={`citizen-logo-mark ${className}`.trim()}
      width="40"
      height="40"
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      <rect className="citizen-logo-bg" width="32" height="32" rx="9" ry="9" />
      <path
        className="citizen-logo-fold"
        d="M21 3h8v8L21 3z"
      />
      <rect className="citizen-logo-line" x="6.5" y="10" width="19" height="2.25" rx="1.12" />
      <rect className="citizen-logo-line" x="6.5" y="14.75" width="14" height="2.25" rx="1.12" />
      <rect className="citizen-logo-line" x="6.5" y="19.5" width="16.5" height="2.25" rx="1.12" />
      <rect className="citizen-logo-line" x="6.5" y="24.25" width="11" height="2.25" rx="1.12" />
    </svg>
  )
}
