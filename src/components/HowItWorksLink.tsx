import { styled } from '@linaria/react'
import React, { FC } from 'react'
import { Typography } from '../ui/Typography'
import { FormattedMessage } from 'react-intl'
import SvgArrowBack from '../svgr/ArrowBack'
import { Link } from 'react-router'
import { howItWorksPagePath } from '../pages/HowItWorksPage'

export const HowItWorksLink: FC = () => {
  return (
    <Link to={howItWorksPagePath}>
      <HowItWorksLinkContainer>
        <Typography fontSize={16} fontWeight={700}>
          <FormattedMessage
            id="how-it-works"
            defaultMessage="Как это работает?"
          />
        </Typography>
        <Arrow />
      </HowItWorksLinkContainer>
    </Link>
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
