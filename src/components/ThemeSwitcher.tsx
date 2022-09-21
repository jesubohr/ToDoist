import { useEffect, useState } from 'react'
import { XMarkIcon, SunIcon, MoonIcon, SwatchIcon } from '@heroicons/react/24/outline'
import { useLocalStorage } from '../hooks/useStorage'
import styles from '../styles/ThemeSwitcher.module.css'

export function ThemeSwitcher() {
  const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  const [isColorPicking, setIsColorPicking] = useState(false)
  const [theme, setTheme] = useLocalStorage<string>("todoist.theme", defaultTheme)
  const [themeHue, setThemeHue] = useLocalStorage<number>("todoist.color", 270)

  function toggleTheme () {
    if (theme === "light") setTheme("dark")
    else setTheme("light")
  }

  function handleColorPicking(ev: React.ChangeEvent<HTMLInputElement>) {
    const { currentTarget } = ev
    setThemeHue(currentTarget.valueAsNumber)
  }

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("color-scheme", theme)
  }, [theme])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--_hue', themeHue.toString())
  }, [themeHue])

  return (
    <aside className={styles.wrapper} style={{
      backgroundColor: isColorPicking ? `hsl(var(--muted) / 0.6)` : "transparent"
    }}>
      {
        isColorPicking
          ? (
            <>
              <button
                className={`btn ${styles.close}`}
                aria-label="Close color picking mode"
                onClick={() => setIsColorPicking(false)}
              >
                <XMarkIcon />
              </button>
              <input
                type="range"
                className={styles.picker}
                aria-label="Color theme slider"
                min="0"
                max="360"
                step={5}
                value={themeHue}
                onInput={handleColorPicking}
              />
            </>
          ) : (
            <div className={styles.btns}>
              <button
                className="btn"
                role="switch"
                aria-label={`Change theme to ${theme === "light" ? "dark" : "light"} mode`}
                onClick={toggleTheme}
              >
                { theme === "light" ? <MoonIcon /> : <SunIcon /> }
              </button>
              <button
                className="btn"
                aria-label="Enable color picking mode"
                onClick={() => setIsColorPicking(true)}>
                <SwatchIcon />
              </button>
            </div>
          )
      }
    </aside>
  )
}
