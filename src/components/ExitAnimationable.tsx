import { motion } from 'framer-motion'

/**
 * ExitAnimationable props.
 */
export type ExitAnimationableProps = {
  children?: React.ReactNode
}

/**
 * ExitAnimationable component.
 */
export const ExitAnimationable: React.VFC<ExitAnimationableProps> = (props) => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={{ exit: { transition: { staggerChildren: 0.1 } } }}
    >
      {props.children}
    </motion.div>
  )
}
