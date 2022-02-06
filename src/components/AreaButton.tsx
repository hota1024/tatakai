import { styled } from '@/stitches.config'

export const AreaButton = styled('button', {
  display: 'inline-flex',
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
  color: '#202020',
})

export const AreaButtonLabel = styled('div', {
  textAlign: 'center',
  fontSize: '1.2rem',
  textDecoration: 'none',
  fontWeight: 'bold',
})

export const AreaButtonContent = styled('div', {
  textAlign: 'center',
  textDecoration: 'none',
  marginTop: 4,
  fontSize: '0.9rem',
  fontWeight: 'normal',
  color: '#404040',
})
