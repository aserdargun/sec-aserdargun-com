import { useEffect, useRef } from 'react'
import { NavLink, Outlet, useLocation, useNavigationType } from 'react-router-dom'
import type { Locale } from '../content/schema'
import { routePath } from '../i18n/locale'
import { sections, shellCopy } from '../i18n/copy'
import { GlobalHeader } from './GlobalHeader'

export function AppShell({ locale }: { locale: Locale }) {
  const copy = shellCopy[locale]
  const { pathname, hash, key } = useLocation()
  const navigationType = useNavigationType()
  const previousPath = useRef(pathname)
  const section = sections.find((item) => pathname.replace(/\/$/, '') === routePath(locale, item))
  const pageTitle = section === 'brief'
    ? `SEC - ${copy.pageTitle}`
    : `${section ? copy.sections[section] : copy.notFound} | SEC - ${copy.pageTitle}`

  useEffect(() => {
    const changedPage = previousPath.current !== pathname
    previousPath.current = pathname
    if (hash) {
      let id: string
      try { id = decodeURIComponent(hash.slice(1)) } catch { return }
      const target = document.getElementById(id)
      target?.scrollIntoView?.({ behavior: 'instant', block: 'start' })
      target?.focus({ preventScroll: true })
    } else if (changedPage) {
      if (navigationType !== 'POP') window.scrollTo({ top: 0, behavior: 'instant' })
      document.getElementById('main-content')?.focus({ preventScroll: true })
    }
  }, [pathname, hash, key, navigationType])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = pageTitle
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.append(description)
    }
    description.content = copy.metaDescription
  }, [copy.metaDescription, pageTitle, locale])
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">{locale === 'en' ? 'Skip to content' : 'İçeriğe geç'}</a>
      <GlobalHeader locale={locale} />
      <nav className="section-nav" aria-label={copy.navLabel}>
        {sections.map((section) => (
          <NavLink key={section} end={section === 'brief'} to={routePath(locale, section)}>
            {copy.sections[section]}
          </NavLink>
        ))}
      </nav>
      <main id="main-content" tabIndex={-1} className="main-content">
        <Outlet />
      </main>
      <footer className="global-footer">
        <span>SEC / {copy.descriptor}</span>
        <span>{locale === 'en' ? 'Static research instrument' : 'Statik araştırma aracı'}</span>
      </footer>
    </div>
  )
}
