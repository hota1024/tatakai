import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { ExitAnimationable } from '@/components/ExitAnimationable'
import { FullHeightContainer } from '@/components/FullHeightContainer'
import { Textfield } from '@/components/Textfield'
import { upFadeIn } from '@/utils/transition'
import axios from 'axios'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

/**
 * RoomJoin props.
 */
export type RoomJoinProps = {}

/**
 * RoomJoin component.
 */
export const RoomJoin: React.VFC<RoomJoinProps> = (props) => {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const router = useRouter()

  const join = async () => {
    setLoading(true)
    setError(undefined)

    try {
      await axios.get(`/api/rooms/${code}`)

      router.push(`/rooms/${code}`)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data.message)
      }
    }

    setLoading(false)
  }

  return (
    <ExitAnimationable>
      <FullHeightContainer>
        <motion.div style={{ textAlign: 'center' }} variants={upFadeIn}>
          <Link href="/lobby" passHref>
            <Button as="a">戻る</Button>
          </Link>
          <h1>⏩ 部屋に参加する</h1>
          <Box
            css={{
              margin: '16px',
            }}
          >
            <Textfield
              placeholder="招待コード"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={loading}
            />
          </Box>
          {error && (
            <Box
              css={{
                margin: '16px',
                background: '#f44336',
                color: 'white',
                fontSize: '0.9rem',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
              }}
            >
              {error}
            </Box>
          )}
          <Box css={{ margin: '16px' }}>
            <Button variant="contained" onClick={join} disabled={loading}>
              参加する！
            </Button>
          </Box>
        </motion.div>
      </FullHeightContainer>
    </ExitAnimationable>
  )
}
