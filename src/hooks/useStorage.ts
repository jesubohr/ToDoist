import { useState, useEffect } from "react"

type LocalStorageReturn<T> = [T, (value: T) => void]

export function useLocalStorage<T = unknown>(key: string, initialValue: any): LocalStorageReturn<T> {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key)
      return (storedValue !== null) ? JSON.parse(storedValue) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  useEffect(() => {
    if (value === undefined) return window.localStorage.removeItem(key)
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
