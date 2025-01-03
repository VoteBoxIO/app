import { styled } from '@linaria/react'
import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import SvgLink from '../svgr/Link'
import { Typography } from '../ui/Typography'

export const ReferralLink: FC = () => {
  return (
    <ReferralLinkBlock onClick={() => alert('тут че делать?')}>
      <SvgLink />
      <Block>
        <Typography fontSize={16} fontWeight={700}>
          <FormattedMessage
            id="invite-friend"
            defaultMessage="Пригласить друга"
          />
        </Typography>
        <Typography fontSize={14} fontWeight={500}>
          <FormattedMessage
            id="invite-friend-bonus"
            defaultMessage="Приведи друга и получи бонусы"
          />
        </Typography>
      </Block>
    </ReferralLinkBlock>
  )
}

const ReferralLinkBlock = styled.div`
  display: grid;
  grid-gap: 10px;
  gap: 10px;
  grid-template-columns: auto 1fr;
  background: rgba(255, 239, 230, 1);
  padding: 12px 16px;
  gap: 10px;
  border-radius: 16px;
  cursor: pointer;
`
const Block = styled.div``
