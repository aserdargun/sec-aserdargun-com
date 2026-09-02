import { NavLink, Outlet } from 'react-router-dom'
import type { Locale } from '../content/schema'
import { routePath } from '../i18n/locale'
import { sections, shellCopy } from '../i18n/copy'
import { GlobalHeader } from './GlobalHeader'

export function AppShell({ locale }: { locale: Locale }) {
  const copy = shellCopy[locale]
  return (
    <div className="app-shell">
      <GlobalHeader locale={locale} />
      <nav className="section-nav" aria-label={copy.navLabel}>
        {sections.map((section) => (
          <NavLink key={section} end={section === 'brief'} to={routePath(locale, section)}>
            {copy.sections[section]}
          </NavLink>
        ))}
      </nav>
      <main id="main-content" className="main-content">
        <Outlet />
      </main>
      <footer className="global-footer">
        <span>SEC / {copy.descriptor}</span>
        <span>{locale === 'en' ? 'Static research instrument' : 'Statik araştırma aracı'}</span>
      </footer>
    </div>
  )
}
