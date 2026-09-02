import { LocaleSchema, type Locale } from '../content/schema'

export const defaultLocale: Locale = 'en'

export function resolveLocale(value: unknown): Locale | null {
  const result = LocaleSchema.safeParse(value)
  return result.success ? result.data : null
}

export function routePath(locale: Locale, section: string, search = ''): string {
  const suffix = section === 'brief' ? '' : `/${section}`
  return `/${locale}${suffix}${search}`
}
