import React, { FC, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { MainLayout } from './layout/MainLayout'
import {
  ActiveVotingPage,
  activeVotingPagePath,
} from './pages/ActiveVotingPage'
import { PollTypePage, pollTypePagePath } from './pages/PollTypePage'
import { IndexPage, indexPagePath } from './pages/IndexPage'
import { MyPollsPage, myPollsPagePath } from './pages/MyPollsPage'
import { MyVotingPage, myVotingPagePath } from './pages/MyVotingPage'
import { SandboxPage, sandboxPagePath } from './pages/SandboxPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { HowItWorksPage, howItWorksPagePath } from './pages/HowItWorksPage'
import { FaqPage, faqPagePath } from './pages/FaqPage'
import { LanguagePage, languagePagePath } from './pages/LanguagePage'
import {
  PaymentMethodsPage,
  paymentMethodsPagePath,
} from './pages/PaymentMethodsPage'
import { SupportPage, supportPagePath } from './pages/SupportPage'
import {
  HowToCreatePollPage,
  howToCreatePollPagePath,
} from './pages/HowToCreatePollPage'
import {
  CreateMoneyPoolPage,
  createMoneyPoolPagePath,
} from './pages/CreateMoneyPoolPage'

export const App: FC = () => {
  useEffect(() => {
    window.Telegram.WebApp.ready()
    window.Telegram.WebApp.expand()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index path={indexPagePath} element={<IndexPage />} />
          <Route path={activeVotingPagePath} element={<ActiveVotingPage />} />
          <Route path={myVotingPagePath} element={<MyVotingPage />} />
          <Route path={pollTypePagePath} element={<PollTypePage />} />
          <Route path={sandboxPagePath} element={<SandboxPage />} />
          <Route path={myPollsPagePath} element={<MyPollsPage />} />
          <Route path={howItWorksPagePath} element={<HowItWorksPage />} />
          <Route path={faqPagePath} element={<FaqPage />} />
          <Route path={supportPagePath} element={<SupportPage />} />
          <Route
            path={paymentMethodsPagePath}
            element={<PaymentMethodsPage />}
          />
          <Route path={languagePagePath} element={<LanguagePage />} />
          <Route
            path={howToCreatePollPagePath}
            element={<HowToCreatePollPage />}
          />
        </Route>

        <Route element={<MainLayout background="transparent" />}>
          <Route
            path={createMoneyPoolPagePath}
            element={<CreateMoneyPoolPage />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
