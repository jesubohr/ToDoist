import type { TaskProps } from '../types/Task'

export function encodeTasks(tasks: TaskProps[]): string {
  const json = JSON.stringify(tasks)
  return btoa(encodeURIComponent(json))
}

export function decodeTasks(encoded: string): TaskProps[] | null {
  try {
    const json = decodeURIComponent(atob(encoded))
    const tasks = JSON.parse(json)
    if (!Array.isArray(tasks)) return null
    for (const task of tasks) {
      if (
        typeof task.id !== 'number' ||
        typeof task.name !== 'string' ||
        typeof task.checked !== 'boolean'
      ) {
        return null
      }
    }
    return tasks
  } catch {
    return null
  }
}

export function parseSharedHash(): string | null {
  const hash = window.location.hash
  if (!hash.startsWith('#shared=')) return null
  return hash.slice(8)
}

export function generateShareUrl(tasks: TaskProps[]): string {
  const encoded = encodeTasks(tasks)
  const baseUrl = window.location.origin + window.location.pathname
  return `${baseUrl}#shared=${encoded}`
}

export async function shareViaWebApi(
  url: string,
  title: string = 'Shared Todo List'
): Promise<boolean> {
  if (navigator.share && navigator.canShare) {
    try {
      await navigator.share({
        title,
        url
      })
      return true
    } catch {
      return false
    }
  }
  return false
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
