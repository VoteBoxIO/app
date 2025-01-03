import React, { FC, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { MainLayout } from './layout/MainLayout'
import {
  ActiveVotingPage,
  activeVotingPagePath,
} from './pages/ActiveVotingPage'
import {
  CreateVotingPage,
  createVotingPagePath,
} from './pages/CreateVotingPage'
import { IndexPage, indexPagePath } from './pages/IndexPage'
import { MyPollsPage, myPollsPagePath } from './pages/MyPollsPage'
import { MyVotingPage, myVotingPagePath } from './pages/MyVotingPage'
import { SandboxPage, sandboxPagePath } from './pages/SandboxPage'
import { NotFoundPage } from './pages/NotFoundPage'

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
          <Route path={myPollsPagePath} element={<MyPollsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}
