import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import type { SharedListInfo } from '../types/Task'

const MAX_SAVED_LISTS = 10

export function useSharedLists() {
  const [savedLists, setSavedLists] = useLocalStorage<SharedListInfo[]>(
    'todoist.sharedLists',
    []
  )

  const addSavedList = useCallback(
    (tasks: SharedListInfo['tasks']): SharedListInfo => {
      const id = generateId(tasks)
      const newList: SharedListInfo = {
        id,
        tasks,
        savedAt: Date.now()
      }

      setSavedLists(prev => {
        const existing = prev || []
        const filtered = existing.filter(l => l.id !== id)
        const updated = [newList, ...filtered]
        return updated.slice(0, MAX_SAVED_LISTS)
      })

      return newList
    },
    [setSavedLists]
  )

  const removeSavedList = useCallback(
    (id: string) => {
      setSavedLists(prev => {
        const existing = prev || []
        return existing.filter(l => l.id !== id)
      })
    },
    [setSavedLists]
  )

  const isListSaved = useCallback(
    (tasks: SharedListInfo['tasks']): boolean => {
      const id = generateId(tasks)
      const existing = savedLists || []
      return existing.some(l => l.id === id)
    },
    [savedLists]
  )

  return {
    savedLists: savedLists || [],
    addSavedList,
    removeSavedList,
    isListSaved
  }
}

function generateId(tasks: SharedListInfo['tasks']): string {
  const content = JSON.stringify(tasks)
  let hash = 0
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}
