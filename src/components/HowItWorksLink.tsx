import { styled } from '@linaria/react'
import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { howItWorksPagePath } from '../pages/HowItWorksPage'
import SvgArrowBack from '../svgr/ArrowBack'
import { RouterLink } from '../ui/RouterLink'
import { Typography } from '../ui/Typography'

export const HowItWorksLink: FC = () => {
  return (
    <RouterLink to={howItWorksPagePath}>
      <HowItWorksLinkContainer>
        <Typography fontSize={16} fontWeight={700}>
          <FormattedMessage
            id="how-it-works"
            defaultMessage="Как это работает?"
          />
        </Typography>
        <Arrow />
      </HowItWorksLinkContainer>
    </RouterLink>
  )
}

const HowItWorksLinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  padding: 12px 16px 12px 16px;
  border-radius: 26px;
`
const Arrow = styled(SvgArrowBack)`
  transform: rotate(180deg);
  margin-left: 8px;
`
