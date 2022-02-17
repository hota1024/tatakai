import Link from 'next/link'
import {
  AreaButton,
  AreaButtonLabel,
  AreaButtonContent,
} from '@/components/AreaButton'
import { Box } from '@/components/Box'
import { ExitAnimationable } from '@/components/ExitAnimationable'
import { FullHeightContainer } from '@/components/FullHeightContainer'
import { upFadeIn } from '@/utils/transition'
import { motion } from 'framer-motion'
import { Centered } from '@/components/Centered'

/**
 * Lobby props.
 */
export type LobbyProps = {}

/**
 * Lobby component.
 */
export const Lobby: React.VFC<LobbyProps> = (props) => {
  return (
    <ExitAnimationable>
      <FullHeightContainer>
        <Centered variants={upFadeIn}>
          <motion.h1>ロビー</motion.h1>
          <Box css={{ margin: '16px 0' }} />
          <Box css={{ display: 'flex' }}>
            <Link href="/rooms/new" passHref>
              <AreaButton as="a" css={{ margin: '4px' }}>
                <AreaButtonLabel>➕ 部屋を作る</AreaButtonLabel>
                <AreaButtonContent>
                  お題を選んで
                  <br />
                  AI同士を戦わせよう
                </AreaButtonContent>
              </AreaButton>
            </Link>
            <Link href="/rooms/join" passHref>
              <AreaButton as="a" css={{ margin: '4px' }}>
                <AreaButtonLabel>⏩ 部屋に参加する</AreaButtonLabel>
                <AreaButtonContent>
                  招待を受け取ったら
                  <br />
                  ここから参加してね
                </AreaButtonContent>
              </AreaButton>
            </Link>
            <Link href="/vs-ai" passHref>
              <AreaButton as="a" css={{ margin: '4px' }}>
                <AreaButtonLabel>🔥 AIと対戦する</AreaButtonLabel>
                <AreaButtonContent>あなた vs AI</AreaButtonContent>
              </AreaButton>
            </Link>
          </Box>
        </Centered>
      </FullHeightContainer>
    </ExitAnimationable>
  )
}
