import { useState, useLayoutEffect, useCallback } from 'react'

const LocalStorageHook = (key: string, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    const storageValue = localStorage.getItem(key)
    return storageValue === null ? defaultValue : JSON.parse(storageValue)
  })

  const updateValue = useCallback(
    newValue => {
      setValue(() => {
        localStorage.setItem(key, JSON.stringify(newValue))
        return newValue
      })
    },
    [key]
  )

  useLayoutEffect(() => {
    const onStorage = event => {
      if (event.storageArea === localStorage && event.key === key) {
        setValue(
          event.newValue === null ? defaultValue : JSON.parse(event.newValue)
        )
      }
    }

    window.addEventListener('storage', onStorage)

    return () => window.removeEventListener('storage', onStorage)
  })

  return [value, updateValue]
}

const createLocalStorageHook = (key: string, defaultValue: any) => {
  const updates = []

  return () => {
    const [value, setValue] = LocalStorageHook(key, defaultValue)
    const updateValue = useCallback(newValue => {
      for (const update of updates) {
        update(newValue)
      }
    }, [])

    useLayoutEffect(() => {
      updates.push(setValue)
      return () => {
        updates.splice(updates.indexOf(setValue), 1)
      }
    }, [setValue])

    return [value, updateValue]
  }
}

const hookInstances = {}

const useLocalStorage = (key: string, defaultValue: any = '') => {
  if (key in hookInstances) {
    return hookInstances[key]()
  }

  hookInstances[key] = createLocalStorageHook(key, defaultValue)
  return hookInstances[key]()
}

export default useLocalStorage
