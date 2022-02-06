import { Variants } from 'framer-motion'

export const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }

export const fadeIn = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}

export const upFadeIn: Variants = {
  initial: { y: '16px', opacity: 0, transition },
  enter: {
    y: '0',
    opacity: 1,
    transition,
  },
  exit: {
    y: '16px',
    opacity: 0,
    transition,
  },
}
