import { useCallback, useEffect, useState } from 'react'

// Pobiera dane z API i pamięta stan ładowania oraz błąd.
//
// Użycie:
//   const { data, loading, error, reload } = useApi(() => api.getQuiz(id), [id])
//
// Gdy zmienią się wartości w tablicy (np. id), dane pobiorą się ponownie.
export function useApi(fetcher, deps = []) {
  const [reloadCount, setReloadCount] = useState(0)
  const requestKey = JSON.stringify([...deps, reloadCount])
  const [result, setResult] = useState({ key: null, data: undefined, error: null })

  useEffect(() => {
    let active = true

    fetcher()
      .then((data) => {
        if (active) setResult({ key: requestKey, data, error: null })
      })
      .catch((error) => {
        if (active) setResult({ key: requestKey, data: undefined, error })
      })

    return () => {
      active = false
    }
    // fetcher to nowa funkcja przy każdym renderze – zależności pilnuje requestKey
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey])

  const reload = useCallback(() => setReloadCount((n) => n + 1), [])

  return {
    data: result.data,
    error: result.key === requestKey ? result.error : null,
    loading: result.key !== requestKey,
    reload,
  }
}
