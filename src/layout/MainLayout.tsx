import { styled } from '@linaria/react'
import React, { FC, PropsWithChildren } from 'react'

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MainLayoutWrapper>
      <Content>{children}</Content>
    </MainLayoutWrapper>
  )
}

const MainLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  padding: 20px 16px;
  background: linear-gradient(
    168.43deg,
    rgba(254, 189, 152, 0.6) 68.74%,
    rgba(79, 82, 119, 0.5) 101.84%
  );
`
const Content = styled.div`
  flex-grow: 1;
`
