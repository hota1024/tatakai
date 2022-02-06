import { styled } from '@/stitches.config'

export const Button = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 48,
  minWidth: 100,
  padding: '0 16px',
  border: 'none',
  borderRadius: 4,
  fontWeight: 'bold',
  fontSize: '1rem',
  color: '#202020',
  cursor: 'pointer',
  transition: 'all 100ms ease',
  variants: {
    variant: {
      default: {
        background: 'transparent',
        '&:hover': {
          background: '#f0f0f0',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
