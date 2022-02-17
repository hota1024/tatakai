import { styled } from '@/stitches.config'
import { motion } from 'framer-motion'

export const Label = styled(motion.span, {
  fontSize: '0.6em',
  padding: '0.5em',
  margin: '0.5em',
  borderRadius: '4px',
  variants: {
    color: {
      red: {
        background: '#f44336',
        color: 'white',
      },
      blue: {
        background: '#3F51B5',
        color: 'white',
      },
    },
  },
})
