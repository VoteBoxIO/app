import { styled } from '@linaria/react'
import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { ButtonRegular } from '../ui/Button'

export const FetchingError: FC<{ onRetry: VoidFunction }> = ({ onRetry }) => {
  return (
    <ErrorWrapper>
      <ButtonRegular color="peach" onClick={onRetry}>
        <FormattedMessage
          id="error-loading"
          defaultMessage="Ошибка загрузки. Повторить"
        />
      </ButtonRegular>
    </ErrorWrapper>
  )
}

const ErrorWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  width: 100%;
`
