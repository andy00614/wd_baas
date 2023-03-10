import { useState } from "react"

type AnyFunction = (...args: any[]) => any

function useLoading() {
  const [loading, setLoading] = useState(false)
  const LoadingHoc = <T extends AnyFunction>(fn: T): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
    return async function(...args: Parameters<T>): Promise<ReturnType<T>> {
      try {
        setLoading(true)
        return await fn(...args);
      } finally {
        setLoading(false)
      }
    }
  }
  
  return {
    loading,
    setLoading,
    LoadingHoc
  }
}

export default useLoading
