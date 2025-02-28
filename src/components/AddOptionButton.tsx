import React, { ComponentProps, FC } from 'react'
import SvgPlusSmall from '../svgr/PlusSmall'
import { Typography } from '../ui/Typography'
import { FormattedMessage } from 'react-intl'
import { styled } from '@linaria/react'

export const AddOptionButton: FC<{
  onClick: ComponentProps<typeof AddOptionButtonContainer>['onClick']
}> = ({ onClick }) => {
  return (
    <AddOptionButtonContainer onClick={onClick} type="button">
      <Typography fontSize={14} fontWeight={700}>
        <FormattedMessage id="add-option" defaultMessage="Добавить вариант" />
      </Typography>
      <SvgPlusSmall />
    </AddOptionButtonContainer>
  )
}

const AddOptionButtonContainer = styled.button`
  display: grid;
  grid-auto-flow: column;
  gap: 8px;
  grid-gap: 8px;
  justify-content: start;
  align-items: center;
`
