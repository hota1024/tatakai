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
import { userAtom } from '@/atoms/user'

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
            <Button as="a">??????</Button>
          </Link>
          <h2>??? ???????????????</h2>
          <p>AI??????????????????????????????????????????????????????</p>
          <Box css={{ margin: '16px 0' }} />
          <h3>1. ??????????????????</h3>
          <Box css={{ margin: '16px 0', display: 'flex' }}>
            <AreaButton {...themeSelectProps('handwritten-numbers')}>
              <AreaButtonLabel>???? ???????????????</AreaButtonLabel>
              <AreaButtonContent>
                ????????????AI????????????????????????????????????????????????????????????????????????
              </AreaButtonContent>
            </AreaButton>
            <AreaButton {...themeSelectProps('cats-and-dogs')} disabled>
              <AreaButtonLabel>???</AreaButtonLabel>
              <AreaButtonContent>???????????????...</AreaButtonContent>
            </AreaButton>
          </Box>
          <h3>2. ?????????????????????????????????</h3>
          <Box css={{ margin: '16px 0', display: 'flex' }}>
            <AreaButton {...isPublicProps(false)}>
              <AreaButtonLabel>???? ????????????</AreaButtonLabel>
              <AreaButtonContent>
                ?????????????????????????????????????????????????????????????????????
              </AreaButtonContent>
            </AreaButton>
            <AreaButton {...isPublicProps(true)} disabled>
              <AreaButtonLabel>???? ?????????OK</AreaButtonLabel>
              <AreaButtonContent>
                ??????????????????????????????...
                {/* ??????????????????????????????????????????????????????????????? */}
              </AreaButtonContent>
            </AreaButton>
          </Box>
          <h3>3. ?????????OK?</h3>
          <Box css={{ margin: '16px 0' }}>
            <Button variant="contained" onClick={create} disabled={loading}>
              ??? ??????????????????
            </Button>
          </Box>
        </motion.div>
      </FullHeightContainer>
    </ExitAnimationable>
  )
}
