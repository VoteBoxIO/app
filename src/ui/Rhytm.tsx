import { styled } from '@linaria/react'

export const Rhytm = styled.div<{ gap?: string }>`
  display: grid;
  gap: ${props => props.gap || 12};
  grid-gap: ${props => props.gap || 12};
`
