import { styled } from '@linaria/react'
import React, { ComponentProps, FC, ReactNode } from 'react'

export const InputText: FC<ComponentProps<typeof StyledInput> & {}> = props => {
  return <StyledInput type="text" {...props} />
}
export const InputNumber: FC<
  ComponentProps<typeof StyledInput> & {}
> = props => {
  return <StyledInput type="number" {...props} />
}
export const InputFile: FC<ComponentProps<typeof StyledInput> & {}> = props => {
  return <StyledInput type="file" {...props} />
}
export const InputDate: FC<ComponentProps<typeof StyledInput> & {}> = props => {
  return <StyledInput type="date" {...props} />
}
export const InputDateTime: FC<
  ComponentProps<typeof StyledInput> & {}
> = props => {
  return <StyledInput type="datetime-local" {...props} />
}
export const InputTextarea: FC<
  ComponentProps<typeof StyledTextArea> & {}
> = props => {
  return <StyledTextArea {...props} />
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
