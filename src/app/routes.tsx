import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { LocalizedNotFound } from '../components/LocalizedNotFound'
import { resolveLocale } from '../i18n/locale'
import { sections, shellCopy, type Section } from '../i18n/copy'
import type { Locale } from '../content/schema'

function SectionPlaceholder({ locale, section }: { locale: Locale; section: Section }) {
  return (
    <section className="section-placeholder">
      <p className="eyebrow">SEC / {String(sections.indexOf(section) + 1).padStart(2, '0')}</p>
      <h1>{shellCopy[locale].sections[section]}</h1>
    </section>
  )
}

function LocalizedRoutes() {
  const params = useParams()
  const locale = resolveLocale(params.locale)
  if (!locale) return <LocalizedNotFound locale="en" />

  return (
    <Routes>
      <Route element={<AppShell locale={locale} />}>
        <Route index element={<SectionPlaceholder locale={locale} section="brief" />} />
        {sections.slice(1).map((section) => (
          <Route key={section} path={section} element={<SectionPlaceholder locale={locale} section={section} />} />
        ))}
        <Route path="*" element={<LocalizedNotFound locale={locale} />} />
      </Route>
    </Routes>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/en" />} />
      <Route path="/:locale/*" element={<LocalizedRoutes />} />
      <Route path="*" element={<LocalizedNotFound locale="en" />} />
    </Routes>
  )
}
