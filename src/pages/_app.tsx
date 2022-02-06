import { globalCss } from '@/stitches.config'
import type { AppProps } from 'next/app'

const globalStyles = globalCss({
  body: {
    fontFamily: 'Noto Sans JP',
  },
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
