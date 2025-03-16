import { styled } from '@linaria/react'
import React, { ComponentProps, FC } from 'react'
import {
  fontFamilyMapCss,
  FontSize,
  FontWeight,
  fontWeightMapCss,
  typographyMapCss,
} from './Typography'
import { cx } from '@linaria/core'

export const InputText: FC<InputBaseProps> = props => {
  return <InputBase type="text" {...props} />
}
export const InputNumber: FC<InputBaseProps> = props => {
  return <InputBase type="number" {...props} />
}
export const InputFile: FC<InputBaseProps> = props => {
  return <InputBase type="file" {...props} />
}
export const InputDate: FC<InputBaseProps> = props => {
  return <InputBase type="date" {...props} />
}
export const InputDateTime: FC<InputBaseProps> = props => {
  return <InputBase type="datetime-local" {...props} />
}
export const InputTextarea: FC<TextAreaBaseProps> = props => {
  return <TextAreaBase {...props} />
}

type CommonProps = {
  fontSize?: FontSize
  fontWeight?: FontWeight
}
type InputBaseProps = ComponentProps<typeof InputBase>

const InputBase: FC<ComponentProps<typeof StyledInput> & CommonProps> = ({
  fontSize = 14,
  fontWeight = 400,
  ...restProps
}) => {
  return (
    <StyledInput
      {...restProps}
      className={cx(
        typographyMapCss[fontSize],
        fontFamilyMapCss[fontSize],
        fontWeightMapCss[fontWeight],
      )}
    />
  )
}

type TextAreaBaseProps = ComponentProps<typeof TextAreaBase>

const TextAreaBase: FC<ComponentProps<typeof StyledTextArea> & CommonProps> = ({
  fontSize = 14,
  fontWeight = 400,
  ...restProps
}) => {
  return (
    <StyledTextArea
      {...restProps}
      className={cx(
        typographyMapCss[fontSize],
        fontFamilyMapCss[fontSize],
        fontWeightMapCss[fontWeight],
      )}
    />
  )
}

const commonCss = `
  width: 100%;
  display: block;
  padding: 12px 16px;
  border-radius: 16px;
  border: none;
  background-color: #f5f5f5; /* Light gray background */
  font-size: 16px;
  font-weight: 400;
  outline: none;
  ::placeholder {
    color: rgba(176, 176, 176, 1); /* Placeholder text color */
  }
  color: black; /* Gray text color */
`

const StyledInput = styled.input`
  ${commonCss};
`
const StyledTextArea = styled.textarea`
  ${commonCss};
  resize: none; /* Запрет изменения размера */
`
