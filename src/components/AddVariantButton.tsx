import React, { ComponentProps, FC } from 'react'
import SvgPlusSmall from '../svgr/PlusSmall'
import { Typography } from '../ui/Typography'
import { FormattedMessage } from 'react-intl'
import { styled } from '@linaria/react'

export const AddVariantButton: FC<{
  onClick: ComponentProps<typeof AddVariantButtonContainer>['onClick']
}> = ({ onClick }) => {
  return (
    <AddVariantButtonContainer onClick={onClick} type="button">
      <Typography fontSize={14} fontWeight={700}>
        <FormattedMessage id="add-option" defaultMessage="Добавить вариант" />
      </Typography>
      <SvgPlusSmall />
    </AddVariantButtonContainer>
  )
}

const AddVariantButtonContainer = styled.button`
  display: grid;
  grid-auto-flow: column;
  gap: 8px;
  grid-gap: 8px;
  justify-content: start;
  align-items: center;
`
