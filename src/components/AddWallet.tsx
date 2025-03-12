import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { ButtonRegular } from '../ui/Button'
import { Rhytm } from '../ui/Rhytm'
import { TitleAndSubtitle } from '../ui/TitleAndSubtitle'
import { useTonConnectModal } from '@tonconnect/ui-react'

export const AddWallet: FC<{
  connectWallet?: VoidFunction
  showTitle?: boolean
}> = ({ connectWallet, showTitle = true }) => {
  const { open: openTonConnectModal } = useTonConnectModal()

  return (
    <Rhytm gap="24px">
      <TitleAndSubtitle
        titleFontSize={24}
        title={
          showTitle && (
            <FormattedMessage
              id="connect-wallet.title"
              defaultMessage="Подключить кошелек"
            />
          )
        }
        subtitle={
          <FormattedMessage
            id="connect-wallet.subtitle"
            defaultMessage="Необходимо подключить кошелек, чтобы оплачивать участие и получать награду после завершения голосований. Это не займет много времени."
          />
        }
      />
      <ButtonRegular
        color="purple"
        onClick={connectWallet || openTonConnectModal}
      >
        <FormattedMessage
          id="connect-wallet.button"
          defaultMessage="Подключить кошелек"
        />
      </ButtonRegular>
    </Rhytm>
  )
}
