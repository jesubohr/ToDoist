import {
  ShareIcon,
  ClipboardDocumentIcon,
  CheckIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import type { TaskProps } from '../types/Task'
import {
  generateShareUrl,
  shareViaWebApi,
  copyToClipboard
} from '../utils/shareUtils'
import styles from '../styles/ShareButton.module.css'

type ShareButtonProps = {
  tasks: TaskProps[]
  onShare: () => void
}

export function ShareButton({ tasks, onShare }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    if (tasks.length === 0) return

    const url = generateShareUrl(tasks)

    const shared = await shareViaWebApi(url)

    if (!shared) {
      const copied = await copyToClipboard(url)
      if (copied) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }

    onShare()
  }

  return (
    <button
      type='button'
      className={`btn ${styles['share-btn']}`}
      onClick={handleShare}
      disabled={tasks.length === 0}
      aria-label='Share todo list'
    >
      {copied ? (
        <>
          <CheckIcon width={24} height={24} />
          <span className={styles['share-text']}>Copied!</span>
        </>
      ) : (
        <>
          <ShareIcon width={24} height={24} />
          <span className={styles['share-text']}>Share</span>
        </>
      )}
    </button>
  )
}
