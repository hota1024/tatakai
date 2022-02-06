import { styled } from '@/stitches.config'
import { motion } from 'framer-motion'

export const FullHeightContainer = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
})
