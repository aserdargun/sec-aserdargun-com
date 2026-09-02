import { useRef, type KeyboardEvent } from 'react'
import type { Locale, TrustNode, TrustNodeId } from '../../content/schema'
import { localize } from '../../content/selectors'

export function TrustPath({
  nodes,
  locale,
  selectedId,
  onSelect,
}: {
  nodes: TrustNode[]
  locale: Locale
  selectedId: TrustNodeId
  onSelect: (id: TrustNodeId) => void
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([])

  function moveFocus(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 0
    if (!direction) return
    event.preventDefault()
    const next = (index + direction + nodes.length) % nodes.length
    refs.current[next]?.focus()
  }

  return (
    <ol className="trust-path" aria-label={locale === 'en' ? 'Ordered trust path' : 'Sıralı güven zinciri'}>
      {nodes.map((node, index) => (
        <li key={node.id} className={node.id === selectedId ? 'is-selected' : undefined}>
          <button
            ref={(element) => { refs.current[index] = element }}
            type="button"
            aria-label={`${String(node.order).padStart(2, '0')} ${localize(node.title, locale)}`}
            aria-pressed={node.id === selectedId}
            onClick={() => onSelect(node.id)}
            onKeyDown={(event) => moveFocus(event, index)}
          >
            <span className="node-order">{String(node.order).padStart(2, '0')}</span>
            <span>{localize(node.title, locale)}</span>
          </button>
        </li>
      ))}
    </ol>
  )
}
