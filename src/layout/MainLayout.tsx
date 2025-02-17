import { styled } from '@linaria/react'
import { TonConnectButton } from '@tonconnect/ui-react'
import React, { FC } from 'react'
import { Outlet, useNavigate } from 'react-router'
import SvgArrowRight from '../svgr/ArrowRight'

export const MainLayout: FC<{ background?: string }> = ({
  background = 'linear-gradient(168.43deg, rgba(254, 189, 152, 0.6) 68.74%, rgba(79, 82, 119, 0.5) 101.84%)',
}) => {
  const navigate = useNavigate()

  return (
    <MainLayoutWrapper background={background}>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </BackButton>
        <TonConnectButtonWrapper>
          <TonConnectButton />
        </TonConnectButtonWrapper>
      </Header>

      <MainLayoutInner>
        <Content>
          <Outlet />
        </Content>
      </MainLayoutInner>
    </MainLayoutWrapper>
  )
}

const BackButton = styled.button`
  position: relative;
  left: -5px;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    right: -10px;
    bottom: -10px;
    left: -10px;
  }
`
const MainLayoutWrapper = styled.div<{ background: string }>`
  min-height: 100%;
  background: ${props => props.background};
  display: flex;
  flex-direction: column;
`
const MainLayoutInner = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  min-height: 100%;
  padding: 0 20px 16px;
  width: 100%;
`
const ArrowBack = styled(SvgArrowRight)`
  width: 30px;
  height: 30px;
  transform: rotate(180deg);
`
const Content = styled.div`
  margin-top: 12px;
  flex-grow: 1;
`
const TonConnectButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  right: 0;
`
const Header = styled.header`
  padding: 10px 16px 10px;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #80808029;
`
