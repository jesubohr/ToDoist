import { useRegisterSW } from 'virtual:pwa-register/react'
import styles from '@/styles/ReloadPrompt.module.css'

const intervalMS = 60 * 60 * 1000

export function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegistered(register) {
      if (register) {
        setInterval(() => {
          register.update()
        }, intervalMS)
      }
    }
  })

  const closeModal = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return (
    <div className={styles.container}>
      {(offlineReady || needRefresh) && (
        <div className={styles.toast}>
          <div className={styles.message}>
            <span>
              {offlineReady
                ? 'App ready to work offline.'
                : 'New content available, click on reload button to update.'}
            </span>
          </div>
          {needRefresh && (
            <button
              className={styles['toast-button']}
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </button>
          )}
          <button
            className={styles['toast-button']}
            onClick={() => closeModal()}
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}
