import { styled } from '@linaria/react'
import { useTonConnectModal } from '@tonconnect/ui-react'
import React, { FC, useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useAppContext } from '../App.context'
import SvgClose from '../svgr/Close'
import { ButtonRegular } from '../ui/Button'
import { InputNumber } from '../ui/Input'
import { Rhytm } from '../ui/Rhytm'
import { TitleAndSubtitle } from '../ui/TitleAndSubtitle'
import { AddWallet } from './AddWallet'

export const EnterAmountDialog: FC<{
  onClose: VoidFunction
  onSubmit: (amount: string) => void
  isValidVotingAmount: (amount: string) => boolean
}> = ({ onClose, onSubmit, isValidVotingAmount }) => {
  const [amount, setAmount] = useState('')
  const [dialog, setDialog] = useState<HTMLDialogElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { wallet } = useAppContext()
  const { open: openTonConnectModal } = useTonConnectModal()
  const { formatMessage } = useIntl()

  useEffect(() => {
    if (!dialog) {
      return
    }

    dialog.showModal()
    setIsVisible(true)

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
      dialog.close()
    }
  }, [dialog])

  const handleSubmit = () => {
    onSubmit(amount)
    handleClose()
  }

  const handleConnectWallet = () => {
    handleClose()
    openTonConnectModal()
  }

  const handleClose = () => {
    setIsVisible(false)
    animationTimeoutRef.current = setTimeout(() => {
      onClose()
    }, 300) // Duration of the hide animation
  }

  // Handle backdrop click
  const handleDialogClick = (
    event: React.MouseEvent<HTMLDialogElement, MouseEvent>,
  ) => {
    if (event.target === dialog) {
      handleClose()
    }
  }

  return (
    <Dialog
      ref={setDialog}
      onClose={handleClose}
      isVisible={isVisible}
      onClick={handleDialogClick}
    >
      <CloseButton onClick={handleClose}>
        <SvgClose />
      </CloseButton>

      {wallet ? (
        <Rhytm gap="24px">
          <TitleAndSubtitle
            titleFontSize={24}
            title={
              <FormattedMessage
                id="enter-amount.title"
                defaultMessage="Введите сумму"
              />
            }
            subtitle={
              <FormattedMessage
                id="enter-amount.subtitle"
                defaultMessage="Введите сумму вашей ставки"
              />
            }
          />

          <InputNumber
            type="number"
            placeholder={formatMessage({
              id: 'enter-amount.placeholder',
              defaultMessage: 'Сумма ставки Ton',
            })}
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />

          <ButtonRegular
            color="purple"
            onClick={handleSubmit}
            disabled={!isValidVotingAmount(amount)}
          >
            <FormattedMessage
              id="enter-amount.submit"
              defaultMessage="Готово"
            />
          </ButtonRegular>
        </Rhytm>
      ) : (
        <AddWallet connectWallet={handleConnectWallet} />
      )}
    </Dialog>
  )
}

const Dialog = styled.dialog<{ isVisible: boolean }>`
  border: none;
  border-radius: 26px;
  padding: 24px;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  text-align: center;

  /* Centering the dialog */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: ${props =>
    props.isVisible
      ? 'translate(-50%, -50%) scale(1)'
      : 'translate(-50%, -50%) scale(0.95)'};
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;

  /* ::backdrop styling */
  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    opacity: ${props => (props.isVisible ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`
