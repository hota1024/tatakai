import { globalCss } from '@/stitches.config'
import { AnimatePresence, motion } from 'framer-motion'
import type { AppProps } from 'next/app'

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

function MyApp({ Component, pageProps, router }: AppProps) {
  globalStyles()

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  )
}

export default MyApp
