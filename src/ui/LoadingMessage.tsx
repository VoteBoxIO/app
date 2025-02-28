import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'

export const LoadingMessage: FC = () => {
  return <FormattedMessage id="status-loading" defaultMessage="Загружается" />
}
