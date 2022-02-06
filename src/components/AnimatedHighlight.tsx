import { keyframes, styled } from '@/stitches.config'

const show = keyframes({
  from: {
    visibility: 'hidden',
  },
  to: {
    visibility: 'visible',
  },
})

const lineIn = keyframes({
  from: {
    right: '100%',
  },
  to: {
    right: 0,
  },
})

export const AnimatedHighlight = styled('span', {
  position: 'relative',
  color: 'white',
  '&::before': {
    position: 'absolute',
    background: 'black',
    content: '',
    visibility: 'visible',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    animation: `${lineIn} 700ms cubic-bezier(0.13, 0.7, 0.2, 1) both`,
    zIndex: -1,
  },
})
