import { openDB } from './indexedDb'

export interface CollageEntity {
  id: string
  image: string
  createdAt: number
}

const STORE = 'collages'

export async function saveCollage(collage: CollageEntity) {
  const db = await openDB()

  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    const store = tx.objectStore(STORE)

    store.put(collage)

    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function getAllCollages(): Promise<CollageEntity[]> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    const store = tx.objectStore(STORE)
    const request = store.getAll()

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function deleteCollage(id: string) {
  const db = await openDB()

  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).delete(id)

    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}
