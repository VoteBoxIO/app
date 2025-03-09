import { styled } from '@linaria/react'
import React, { FC, ReactNode } from 'react'
import { Typography } from './Typography'
import { NavLink } from 'react-router'

export type TabId = string | number
type Tab = { to: string; id: TabId; label: ReactNode }

export const Tabs: FC<{
  tabs: Tab[]
  activeTabId: TabId
  onTabChange?: (id: TabId) => void
}> = ({ tabs, activeTabId, onTabChange }) => {
  const handleTabClick = (id: TabId) => {
    onTabChange?.(id)
  }

  return (
    <TabsContainer>
      {tabs.map(tab => (
        <NavLink key={tab.id} to={tab.to} style={{ width: '100%' }} replace>
          <Tab
            isActive={tab.id === activeTabId}
            onClick={() => handleTabClick(tab.id)}
          >
            <Label fontSize={16} fontWeight={500}>
              {tab.label}
            </Label>
          </Tab>
        </NavLink>
      ))}
    </TabsContainer>
  )
}

const TabsContainer = styled.div`
  display: flex;
  border-radius: 16px;
  background: rgba(244, 244, 244, 1);
  overflow: hidden;
`
const Label = styled(Typography)``

const Tab = styled.button<{ isActive: boolean }>`
  width: 100%;
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  border: none;
  background-color: ${({ isActive }) =>
    isActive ? 'rgba(79, 82, 119, 1)' : 'transparent'};
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 8px 12px;
  border-radius: 26px;

  ${Label} {
    color: ${({ isActive }) => (isActive ? '#fff' : '#1e1e1e')};
    transition: color 0.3s;
  }
`
