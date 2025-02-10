import { styled } from '@linaria/react'
import React, { FC, useEffect, useRef, useState } from 'react'

export const EnterAmountDialog: FC<{
  onClose: VoidFunction
  onSubmit: (amount: string) => void
}> = ({ onClose, onSubmit }) => {
  const [amount, setAmount] = useState('')
  const [dialog, setDialog] = useState<HTMLDialogElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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

  const handleClose = () => {
    setIsVisible(false)
    animationTimeoutRef.current = setTimeout(() => {
      onClose()
    }, 300) // Duration of the hide animation
  }

  return (
    <Dialog ref={setDialog} onClose={handleClose} isVisible={isVisible}>
      <CloseButton onClick={handleClose}>✖</CloseButton>
      <Title>Введите сумму</Title>
      <Subtitle>Введите сумму вашей ставки</Subtitle>
      <InputWrapper>
        <Input
          type="number"
          placeholder="Сумма ставки Ton"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </InputWrapper>
      <SubmitButton onClick={handleSubmit}>Готово</SubmitButton>
    </Dialog>
  )
}

const Dialog = styled.dialog<{ isVisible: boolean }>`
  border: none;
  border-radius: 12px;
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
    animation: ${props =>
      props.isVisible
        ? 'fadeInBackdrop 0.3s ease'
        : 'fadeOutBackdrop 0.3s ease'};
  }

  /* Animations for the backdrop */
  @keyframes fadeInBackdrop {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  @keyframes fadeOutBackdrop {
    from {
      background-color: rgba(0, 0, 0, 0.5);
    }
    to {
      background-color: rgba(0, 0, 0, 0);
    }
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

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #000000;
`

const Subtitle = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  color: #666666;
`

const InputWrapper = styled.div`
  margin-bottom: 20px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fdf1eb;
  color: #000;
  box-sizing: border-box;
`

const SubmitButton = styled.button`
  width: 100%;
  background: #4a3aff;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #372cad;
  }
`
