import Link from 'next/link'
import { AnimatedHighlight } from '@/components/AnimatedHighlight'
import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { FullHeightContainer } from '@/components/FullHeightContainer'
import { HomeSubtitle, HomeTitle } from './components'
import { motion } from 'framer-motion'
import { ExitAnimationable } from '@/components/ExitAnimationable'
import { fadeIn } from '@/utils/transition'

/**
 * Home props.
 */
export type HomeProps = {}

/**
 * Home component.
 */
export const Home: React.VFC<HomeProps> = (props) => {
  return (
    <>
      <ExitAnimationable>
        <FullHeightContainer variants={fadeIn}>
          <HomeTitle>TatakAI</HomeTitle>
          <HomeSubtitle>
            君だけの
            <AnimatedHighlight>最強のAI</AnimatedHighlight>
            を育成しよう
          </HomeSubtitle>
          <Box css={{ margin: '12px 0' }} />
          <Link href="/lobby" passHref>
            <Button as="a">今すぐはじめる</Button>
          </Link>
        </FullHeightContainer>
      </ExitAnimationable>
    </>
  )
}
