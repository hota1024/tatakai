import { useEffect } from 'react'

/**
 * use interval.
 *
 * @param callback callback.
 * @param ms ms.
 */
export const useInterval = (callback: () => void, ms: number): void => {
  useEffect(() => {
    const interval = setInterval(callback, ms)

    return () => clearInterval(interval)
  }, [callback, ms])
}
