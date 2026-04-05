import { useState, useEffect } from 'react'

export function useFetch<T>(fetchFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFn().then(result => {
      setData(result)
      setLoading(false)
    })
    .catch(() => {
      setError('Error al cargar los datos');
      setLoading(false)
    })
  }, [])

  return { data, loading, error }
}