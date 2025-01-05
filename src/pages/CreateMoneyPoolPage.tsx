import { styled } from '@linaria/react'
import React, { FC, FormEventHandler, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { AddVariantButton } from '../components/AddVariantButton'
import { ButtonRegular } from '../ui/Button'
import { InputDate, InputFile, InputText } from '../ui/Input'
import { Rhytm } from '../ui/Rhytm'
import { TitleAndSubtitle } from '../ui/TitleAndSubtitle'
import { Toggle } from '../ui/Toggle'
import { Typography } from '../ui/Typography'

export const CreateMoneyPoolPage: FC = () => {
  const { formatMessage } = useIntl()

  const [formData, setFormData] = useState({
    bloggerCommission: '',
    rewardFile: null as File | null,
    pollName: '',
    deadline: '',
    question: '',
    options: [''], // Start with one option
    allowMultipleOptions: false,
    quizMode: false,
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number,
  ) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        rewardFile: files ? files[0] : null,
      }))
    } else if (index !== undefined) {
      // Update specific option in options array
      setFormData(prev => {
        const updatedOptions = [...prev.options]
        updatedOptions[index] = value
        return { ...prev, options: updatedOptions }
      })
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleToggleChange = (name: 'allowMultipleOptions' | 'quizMode') => {
    setFormData(prev => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, ''],
    }))
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    console.log('Form Data:', formData)
    // Perform further actions, like sending the data to the server
  }

  return (
    <CreateMoneyPoolPageContainer>
      <Rhytm>
        <TitleAndSubtitle
          titleFontSize={24}
          title={formatMessage({
            id: 'money-pool-title',
            defaultMessage: 'Денежный пул',
          })}
          subtitle={formatMessage({
            id: 'money-pool-subtitle',
            defaultMessage:
              'Победители делят деньги проигравших. Голосовать можно неограниченное количество раз.',
          })}
        />
        <form onSubmit={handleSubmit}>
          <Rhytm>
            <InputText
              name="bloggerCommission"
              placeholder={formatMessage({
                id: 'blogger-commission-placeholder',
                defaultMessage: 'Комиссия блогера',
              })}
              value={formData.bloggerCommission}
              onChange={handleInputChange}
            />
            <InputFile
              name="rewardFile"
              placeholder={formatMessage({
                id: 'add-reward-placeholder',
                defaultMessage: 'Добавить вознаграждение',
              })}
              onChange={handleInputChange}
            />
            <InputText
              name="pollName"
              placeholder={formatMessage({
                id: 'poll-name-placeholder',
                defaultMessage: 'Название голосования',
              })}
              value={formData.pollName}
              onChange={handleInputChange}
            />
            <InputDate
              name="deadline"
              placeholder={formatMessage({
                id: 'deadline-placeholder',
                defaultMessage: 'Установить дедлайн',
              })}
              value={formData.deadline}
              onChange={handleInputChange}
            />
          </Rhytm>
          <Rhytm style={{ marginTop: 20 }}>
            <Typography fontSize={20} fontWeight={600}>
              <FormattedMessage id="poll" defaultMessage="Опрос" />
            </Typography>
            <InputText
              name="question"
              placeholder={formatMessage({
                id: 'question-placeholder',
                defaultMessage: 'Вопрос',
              })}
              value={formData.question}
              onChange={handleInputChange}
            />
            {formData.options.map((option, index) => (
              <InputText
                key={index}
                name={`option-${index}`}
                placeholder={formatMessage({
                  id: 'option-placeholder',
                  defaultMessage: 'Вариант ответа',
                })}
                value={option}
                onChange={event => handleInputChange(event, index)}
              />
            ))}
            <AddVariantButton onClick={addOption} />
          </Rhytm>

          <Rhytm style={{ marginTop: 20 }}>
            <Toggle
              label={formatMessage({
                id: 'multiple-options-toggle',
                defaultMessage: 'Выбор нескольких вариантов',
              })}
              checked={formData.allowMultipleOptions}
              onChange={() => handleToggleChange('allowMultipleOptions')}
            />
            <Toggle
              label={formatMessage({
                id: 'quiz-mode-toggle',
                defaultMessage: 'Режим викторины',
              })}
              checked={formData.quizMode}
              onChange={() => handleToggleChange('quizMode')}
            />
          </Rhytm>

          <ButtonRegular
            color="peach"
            type="submit"
            style={{ marginTop: 20, width: '100%' }}
          >
            {formatMessage({
              id: 'create-button',
              defaultMessage: 'Создать',
            })}
          </ButtonRegular>
        </form>
      </Rhytm>
    </CreateMoneyPoolPageContainer>
  )
}

export const createMoneyPoolPagePath = '/create-money-pool'

const CreateMoneyPoolPageContainer = styled.div``
