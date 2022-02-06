import { styled } from '@/stitches.config'
import { motion } from 'framer-motion'

export const Button = styled(motion.button, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 40,
  minWidth: 100,
  padding: '0 24px',
  border: 'none',
  borderRadius: 4,
  fontWeight: 'bold',
  fontSize: '0.975rem',
  color: '#202020',
  cursor: 'pointer',
  transition: 'all 100ms ease',
  textDecoration: 'none',
  variants: {
    variant: {
      default: {
        background: 'transparent',
        '&:hover': {
          background: '#f0f0f0',
        },
      },
      contained: {
        background: '#f0f0f0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
