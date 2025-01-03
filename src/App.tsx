import React, { FC, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { IndexPage, indexPagePath } from './pages/IndexPage'
import { MainLayout } from './layout/MainLayout'
import { SandboxPage, sandboxPagePath } from './pages/SandboxPage'
import {
  ActiveVotingPage,
  activeVotingPagePath,
} from './pages/ActiveVotingPage'
import {
  CreateVotingPage,
  createVotingPagePath,
} from './pages/CreateVotingPage'
import { MyVotingPage, myVotingPagePath } from './pages/MyVotingPage'

export const App: FC = () => {
  useEffect(() => {
    window.Telegram.WebApp.ready()
    window.Telegram.WebApp.expand()
  }, [])

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route index path={indexPagePath} element={<IndexPage />} />
          <Route path={activeVotingPagePath} element={<ActiveVotingPage />} />
          <Route path={myVotingPagePath} element={<MyVotingPage />} />
          <Route path={createVotingPagePath} element={<CreateVotingPage />} />
          <Route path={sandboxPagePath} element={<SandboxPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}
