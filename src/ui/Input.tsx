import { styled } from '@linaria/react'
import React, { ComponentProps, FC, ReactNode } from 'react'

export const InputText: FC<ComponentProps<typeof StyledInput> & {}> = props => {
  return <StyledInput type="text" {...props} />
}
export const InputFile: FC<ComponentProps<typeof StyledInput> & {}> = props => {
  return <StyledInput type="file" {...props} />
}
export const InputDate: FC<ComponentProps<typeof StyledInput> & {}> = props => {
  return <StyledInput type="date" {...props} />
}

const StyledInput = styled.input`
  display: block;
  padding: 12px 16px;
  border-radius: 16px;
  border: none;
  background-color: #f5f5f5; /* Light gray background */
  font-size: 14px;
  color: black; /* Gray text color */
  outline: none;

  ::placeholder {
    color: #aaa; /* Placeholder text color */
  }
`
