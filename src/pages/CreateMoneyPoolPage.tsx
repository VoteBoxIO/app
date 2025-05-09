import { styled } from '@linaria/react'
import React, { FC, FormEventHandler, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { AddOptionButton } from '../components/AddOptionButton'
import { VOTING_SETTINGS } from '../constants'
import { formatPercentInBasisPoints } from '../functions/formatPercentInBasisPoints'
import { useCreateBox } from '../hooks/useCreateBox'
import { CreateBoxLayout } from '../layout/CreateBoxLayout'
import { ButtonRegular } from '../ui/Button'
import { ErrorText } from '../ui/ErrorText'
import { InputDateTime, InputNumber, InputText } from '../ui/Input'
import { Rhytm } from '../ui/Rhytm'
import { Toggle } from '../ui/Toggle'
import { Typography } from '../ui/Typography'

export const CreateMoneyPoolPage: FC = () => {
  const { formatMessage } = useIntl()
  const { sendCreateBoxMessage } = useCreateBox()

  const [voting, setVoting] = useState({
    creatorBasisPoints: '',
    pollName: '',
    deadline: '',
    options: [''],
    allowMultipleOptions: false,
    // rewardFile: null as File | null,
    // quizMode: false,
  })

  const [error, setError] = useState({
    creatorBasisPoints: '',
    pollName: '',
    deadline: '',
    options: '',
  })

  const validateForm = (submitting: boolean) => {
    let hasError = false

    if (voting.creatorBasisPoints) {
      if (+voting.creatorBasisPoints < 0 || +voting.creatorBasisPoints > 15) {
        hasError = true
        setError(prev => ({
          ...prev,
          creatorBasisPoints: formatMessage({
            id: 'creator-basis-points-error',
            defaultMessage: 'Комиссия блогера должна быть между 0% и 15%',
          }),
        }))
      } else {
        setError(prev => ({ ...prev, creatorBasisPoints: '' }))
      }
    }

    if (submitting && !voting.pollName) {
      hasError = true
      setError(prev => ({
        ...prev,
        pollName: formatMessage({
          id: 'poll-name-error',
          defaultMessage: 'Название голосования не должно быть пустым',
        }),
      }))
    } else {
      setError(prev => ({ ...prev, pollName: '' }))
    }

    if (voting.deadline) {
      const parsedDate = Date.parse(voting.deadline)

      if (parsedDate < Date.now() + VOTING_SETTINGS.minDuration) {
        hasError = true
        setError(prev => ({
          ...prev,
          deadline: formatMessage({
            id: 'deadline-error-too-early',
            defaultMessage: 'Дедлайн должен быть не раньше чем через 2 часа',
          }),
        }))
      } else if (parsedDate > Date.now() + VOTING_SETTINGS.maxDuration) {
        hasError = true
        setError(prev => ({
          ...prev,
          deadline: formatMessage({
            id: 'deadline-error-too-late',
            defaultMessage: 'Дедлайн должен быть не позже чем через 90 дней',
          }),
        }))
      } else {
        setError(prev => ({ ...prev, deadline: '' }))
      }
    }

    if (submitting && voting.options.some(option => !option)) {
      hasError = true
      setError(prev => ({
        ...prev,
        options: formatMessage({
          id: 'options-error',
          defaultMessage: 'Варианты ответа не должны быть пустыми',
        }),
      }))
    } else {
      setError(prev => ({ ...prev, options: '' }))
    }

    return hasError
  }

  useEffect(() => {
    validateForm(false)
  }, [voting])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index?: number,
  ) => {
    const { name, value, type, files } = event.target
    if (type === 'file') {
      setVoting(prev => ({ ...prev, rewardFile: files ? files[0] : null }))
      // Вариант ответа
    } else if (index !== undefined) {
      // Update specific option in options array
      setVoting(prev => {
        const updatedOptions = [...prev.options]
        updatedOptions[index] = value
        return { ...prev, options: updatedOptions }
      })
    } else {
      // Все остальные инпуты
      setVoting(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleToggleChange = (
    name: 'allowMultipleOptions' /** | 'quizMode' */,
  ) => {
    setVoting(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const canAddOption = voting.options.length < VOTING_SETTINGS.maxChoices

  const addOption = () => {
    if (canAddOption) {
      setVoting(prev => ({ ...prev, options: [...prev.options, ''] }))
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()

    if (validateForm(true)) {
      return
    }

    sendCreateBoxMessage({
      name: voting.pollName.trim(),
      description: '@TODO Hardcoded description',
      choices: voting.options.map(option => option.trim()),
      endTimeInSeconds: BigInt(Date.parse(voting.deadline) / 1000),
      creatorBasisPoints: BigInt(
        formatPercentInBasisPoints(Number(voting.creatorBasisPoints)),
      ),
      rewardType: 0n,
      hideVotes: false,
      referral: null,
      fixedVoteAmount: null,
    })
  }

  return (
    <CreateBoxLayout
      titleElement={formatMessage({
        id: 'money-pool-title',
        defaultMessage: 'Денежный пул',
      })}
      subtitleElement={formatMessage({
        id: 'money-pool-subtitle',
        defaultMessage:
          'Победители делят деньги проигравших. Голосовать можно неограниченное количество раз.',
      })}
      showAddWalletStub
    >
      <CreateMoneyPoolPageContainer>
        <Rhytm>
          <form onSubmit={handleSubmit}>
            <Rhytm>
              <div>
                <InputNumber
                  name="creatorBasisPoints"
                  placeholder={formatMessage({
                    id: 'blogger-commission-placeholder',
                    defaultMessage: 'Комиссия блогера',
                  })}
                  value={voting.creatorBasisPoints}
                  onChange={handleInputChange}
                />
                {error.creatorBasisPoints && (
                  <ErrorText>{error.creatorBasisPoints}</ErrorText>
                )}
              </div>
              {/* <InputFile
              name="rewardFile"
              placeholder={formatMessage({
                id: 'add-reward-placeholder',
                defaultMessage: 'Добавить вознаграждение',
              })}
              onChange={handleInputChange}
            /> */}
              <InputText
                name="pollName"
                placeholder={formatMessage({
                  id: 'poll-name-placeholder',
                  defaultMessage: 'Название голосования',
                })}
                value={voting.pollName}
                onChange={handleInputChange}
                maxLength={110}
              />
              <InputDateTime
                name="deadline"
                placeholder={formatMessage({
                  id: 'deadline-placeholder',
                  defaultMessage: 'Установить дедлайн',
                })}
                value={voting.deadline}
                onChange={handleInputChange}
              />
              {error.deadline && <ErrorText>{error.deadline}</ErrorText>}
            </Rhytm>
            <Rhytm style={{ marginTop: 20 }}>
              <Typography fontSize={20} fontWeight={600}>
                <FormattedMessage id="poll" defaultMessage="Опрос" />
              </Typography>
              {voting.options.map((option, index) => (
                <InputText
                  key={index}
                  name={`option-${index}`}
                  placeholder={formatMessage({
                    id: 'option-placeholder',
                    defaultMessage: 'Вариант ответа',
                  })}
                  value={option}
                  onChange={event => handleInputChange(event, index)}
                  maxLength={55}
                />
              ))}
              {error.options && <ErrorText>{error.options}</ErrorText>}
              {canAddOption && <AddOptionButton onClick={addOption} />}
            </Rhytm>

            <Rhytm style={{ marginTop: 20 }}>
              <Toggle
                label={formatMessage({
                  id: 'multiple-options-toggle',
                  defaultMessage: 'Выбор нескольких вариантов',
                })}
                checked={voting.allowMultipleOptions}
                onChange={() => handleToggleChange('allowMultipleOptions')}
              />
              {/* <Toggle
              label={formatMessage({
                id: 'quiz-mode-toggle',
                defaultMessage: 'Режим викторины',
              })}
              checked={formData.quizMode}
              onChange={() => handleToggleChange('quizMode')}
            /> */}
            </Rhytm>

            <ButtonRegular
              color="purple"
              type="submit"
              style={{
                marginTop: 20,
                width: '100%',
                position: 'sticky',
                bottom: 16,
              }}
            >
              {formatMessage({
                id: 'create-button',
                defaultMessage: 'Создать',
              })}
            </ButtonRegular>
          </form>
        </Rhytm>
      </CreateMoneyPoolPageContainer>
    </CreateBoxLayout>
  )
}

export const createMoneyPoolPagePath = '/create-money-pool'

const CreateMoneyPoolPageContainer = styled.div`
  textarea {
    min-height: 100px;
  }
`
