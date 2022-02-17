import { useInterval } from '@/hooks/useInterval'
import { globalCss } from '@/stitches.config'
import { User } from '@/types/User'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { SuccessApiResponse } from 'next-api-handler'
import type { AppProps } from 'next/app'
import { useCallback, useEffect } from 'react'
import { userAtom } from './atoms/user'

const globalStyles = globalCss({
  body: {
    fontFamily: 'Noto Sans JP',
    color: '#202020',
  },
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
})

export default function MyApp({ Component, pageProps, router }: AppProps) {
  globalStyles()

  const [user, setUser] = useAtom(userAtom)

  const createUser = useCallback(async () => {
    const { data } = await axios.post<SuccessApiResponse<User>>('/api/users')

    setUser(data.data)
  }, [setUser])

  useEffect(() => {
    if (!user) {
      createUser()
    }
  }, [createUser, user])

  useInterval(() => {
    if (!user) return

    axios.post(`/api/users/${user.id}/heartbeat`).catch(() => {
      createUser()
    })
  }, 3000)

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  )
}
