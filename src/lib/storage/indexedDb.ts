/**
 * IndexedDB configuration and utilities
 */

const DB_NAME = 'collage-db'
const DB_VERSION = 1
const STORE_NAME = 'collages'

export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this browser'))
      return
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = event => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        // Create index for createdAt for better querying
        store.createIndex('createdAt', 'createdAt', { unique: false })
      }
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(
        new Error(
          `Failed to open database: ${request.error?.message || 'Unknown error'}`
        )
      )
    }

    request.onblocked = () => {
      console.warn(
        'IndexedDB upgrade blocked. Please close other tabs with this app open.'
      )
    }
  })
}
