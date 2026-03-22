import { useState, useRef, useEffect } from 'react'
import type { SharedListInfo } from '../types/Task'
import { FolderIcon, TrashIcon } from '@heroicons/react/24/outline'
import styles from '../styles/SavedSharedLists.module.css'

type SavedSharedListsProps = {
  savedLists: SharedListInfo[]
  onOpenList: (list: SharedListInfo) => void
  onRemoveList: (id: string) => void
}

export function SavedSharedLists({
  savedLists,
  onOpenList,
  onRemoveList
}: SavedSharedListsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (savedLists.length === 0) return null

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <button
        type='button'
        className={`btn ${styles['dropdown-btn']}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label='Open saved shared lists'
        aria-expanded={isOpen}
      >
        <FolderIcon width={24} height={24} />
      </button>

      {isOpen && (
        <div className={styles['dropdown-menu']}>
          <div className={styles.header}>Saved Lists</div>
          <ul className={styles.list}>
            {savedLists.map(list => (
              <li key={list.id} className={styles.item}>
                <button
                  type='button'
                  className={styles['item-btn']}
                  onClick={() => {
                    onOpenList(list)
                    setIsOpen(false)
                  }}
                >
                  <span className={styles['item-name']}>
                    {formatDate(list.savedAt)}
                  </span>
                  <span className={styles['item-count']}>
                    {list.tasks.length} tasks
                  </span>
                </button>
                <button
                  type='button'
                  className={styles['item-delete']}
                  onClick={e => {
                    e.stopPropagation()
                    onRemoveList(list.id)
                  }}
                  aria-label='Delete saved list'
                >
                  <TrashIcon width={16} height={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
