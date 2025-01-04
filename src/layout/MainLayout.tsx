import { styled } from '@linaria/react'
import React, { FC } from 'react'
import { Outlet } from 'react-router'

export const MainLayout: FC<{ background?: string }> = ({
  background = 'linear-gradient(168.43deg, rgba(254, 189, 152, 0.6) 68.74%, rgba(79, 82, 119, 0.5) 101.84%)',
}) => {
  return (
    <MainLayoutWrapper background={background}>
      <Content>
        <Outlet />
      </Content>
    </MainLayoutWrapper>
  )
}

const MainLayoutWrapper = styled.div<{ background: string }>`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  padding: 20px 16px;
  background: ${props => props.background};
`
const Content = styled.div`
  flex-grow: 1;
`
