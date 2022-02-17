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
import { Button } from '@/components/Button'
import { useState } from 'react'
import { RoomRes, RoomTheme } from '@/types/Room'
import { useRouter } from 'next/router'
import axios from 'axios'
import { SuccessApiResponse } from 'next-api-handler'
import { useAtom } from 'jotai'
import { userAtom } from '@/pages/atoms/user'

const useSelectButton = <T,>(defaultValue: T) => {
  const [value, setValue] = useState(defaultValue)

  const selectProps = (v: T) => {
    const props = {
      css: {
        margin: '4px',
      },
      onClick: () => setValue(v),
    }

    if (v === value) {
      return {
        ...props,
        css: {
          ...props.css,
          border: '2px solid black',
        },
      }
    }

    return props
  }

  return [value, selectProps] as const
}

/**
 * NewRoom props.
 */
export type NewRoomProps = {}

/**
 * NewRoom component.
 */
export const NewRoom: React.VFC<NewRoomProps> = (props) => {
  const [theme, themeSelectProps] = useSelectButton<RoomTheme>(
    'handwritten-numbers'
  )
  const router = useRouter()
  const [user] = useAtom(userAtom)
  const [isPublic, isPublicProps] = useSelectButton(false)
  const [loading, setLoading] = useState(false)

  const create = async () => {
    setLoading(false)
    if (!user) {
      return
    }

    const { data } = await axios.post<SuccessApiResponse<RoomRes>>(
      '/api/rooms',
      {
        theme,
        isPublic,
        hostId: user.id,
      }
    )

    await router.push(`/rooms/${data.data.id}`)
    setLoading(true)
  }

  return (
    <ExitAnimationable>
      <FullHeightContainer>
        <motion.div style={{ textAlign: 'center' }} variants={upFadeIn}>
          <Link href="/lobby" passHref>
            <Button as="a">戻る</Button>
          </Link>
          <h2>➕ 部屋を作る</h2>
          <p>AI同士をバトルさせる部屋を作りましょう</p>
          <Box css={{ margin: '16px 0' }} />
          <h3>1. お題を選ぼう</h3>
          <Box css={{ margin: '16px 0', display: 'flex' }}>
            <AreaButton {...themeSelectProps('handwritten-numbers')}>
              <AreaButtonLabel>🔢 手書き数字</AreaButtonLabel>
              <AreaButtonContent>
                どちらのAIが正しく手書き数字を当てられるかを競うお題です。
              </AreaButtonContent>
            </AreaButton>
            <AreaButton {...themeSelectProps('cats-and-dogs')} disabled>
              <AreaButtonLabel>???</AreaButtonLabel>
              <AreaButtonContent>準備中です...</AreaButtonContent>
            </AreaButton>
          </Box>
          <h3>2. 部屋の公開設定をしよう</h3>
          <Box css={{ margin: '16px 0', display: 'flex' }}>
            <AreaButton {...isPublicProps(false)}>
              <AreaButtonLabel>🙌 友達限定</AreaButtonLabel>
              <AreaButtonContent>
                友達のみが参加できるようにすることができます。
              </AreaButtonContent>
            </AreaButton>
            <AreaButton {...isPublicProps(true)} disabled>
              <AreaButtonLabel>🌏 誰でもOK</AreaButtonLabel>
              <AreaButtonContent>
                この機能は準備中です...
                {/* 誰でも参加できるようにすることができます。 */}
              </AreaButtonContent>
            </AreaButton>
          </Box>
          <h3>3. 準備はOK?</h3>
          <Box css={{ margin: '16px 0' }}>
            <Button variant="contained" onClick={create} disabled={loading}>
              ➕ 部屋を作成！
            </Button>
          </Box>
        </motion.div>
      </FullHeightContainer>
    </ExitAnimationable>
  )
}
