import { styled } from '@linaria/react'
import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import SvgLogo from '../svgr/Logo'
import { Typography } from '../ui/Typography'

export const LogoBlock: FC = () => {
  return (
    <LogoContainer>
      <SvgLogo />
      <Box>
        <Typography fontSize={20} fontWeight={600}>
          VoteBox
        </Typography>
        <Typography fontSize={12} fontWeight={400}>
          <FormattedMessage
            id="logo-subtitle"
            defaultMessage="Монетизируйте ваш контент"
          />
        </Typography>
      </Box>
    </LogoContainer>
  )
}

const LogoContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px;
  grid-gap: 8px;
`
const Box = styled.div``
