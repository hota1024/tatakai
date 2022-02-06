import { styled } from '@/stitches.config'

export const AreaButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '200px',
  height: '200px',
  fontSize: '1rem',
  fontWeight: 'bold',
  padding: '1rem',
  border: 'none',
  borderRadius: '4px',
  background: '#f5f5f5',
  textDecoration: 'none',
  cursor: 'pointer',
})

export const AreaButtonLabel = styled('div', {
  fontSize: '1.2rem',
})

export const AreaButtonContent = styled('div', {
  marginTop: 4,
  fontSize: '0.9rem',
  color: '#404040',
})
