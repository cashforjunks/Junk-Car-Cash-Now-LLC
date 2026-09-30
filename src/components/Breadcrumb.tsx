import { Link } from 'react-router-dom'

interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[#7A7672]">
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {crumb.href && i < crumbs.length - 1 ? (
              <Link
                to={crumb.href}
                className="hover:text-[#F59E0B] transition-colors"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className={i === crumbs.length - 1 ? 'text-[#F0EDE8]' : ''}>{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
