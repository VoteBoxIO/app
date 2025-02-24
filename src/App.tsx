import React, { FC, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { MainLayout } from './layout/MainLayout'
import {
  activeVotingAccessToContentPagePath,
  activeVotingMoneyPoolPagePath,
  ActivePollsPage,
} from './pages/ActivePollsPage'
import { PollTypeTab } from './pages/ActivePollsPage.constants'
import {
  CreateMoneyPoolPage,
  createMoneyPoolPagePath,
} from './pages/CreateMoneyPoolPage'
import { FaqPage, faqPagePath } from './pages/FaqPage'
import { HowItWorksPage, howItWorksPagePath } from './pages/HowItWorksPage'
import {
  HowToCreatePollPage,
  howToCreatePollPagePath,
} from './pages/HowToCreatePollPage'
import { IndexPage, indexPagePath } from './pages/IndexPage'
import { LanguagePage, languagePagePath } from './pages/LanguagePage'
import {
  myActivePollsPagePath,
  myFinishedPollsPagePath,
  MyPollsPage,
} from './pages/MyPollsPage'
import { MyPollsTab } from './pages/MyPollsPage.constants'
import { MyVotingPage, myVotingPagePath } from './pages/MyVotingPage'
import { NotFoundPage } from './pages/NotFoundPage'
import {
  PaymentMethodsPage,
  paymentMethodsPagePath,
} from './pages/PaymentMethodsPage'
import { PollTypePage, pollTypePagePath } from './pages/PollTypePage'
import { SandboxPage, sandboxPagePath } from './pages/SandboxPage'
import { SupportPage, supportPagePath } from './pages/SupportPage'

export const App: FC = () => {
  useEffect(() => {
    window.Telegram.WebApp.ready()
    window.Telegram.WebApp.expand()
  }, [])

  return (
    <BrowserRouter
      basename={
        process.env.NODE_ENV === 'production'
          ? process.env.WEBPACK_PUBLIC_PATH
          : '/'
      }
    >
      <Routes>
        <Route element={<MainLayout />}>
          <Route index path={indexPagePath} element={<IndexPage />} />
          <Route path={myVotingPagePath} element={<MyVotingPage />} />
          <Route path={pollTypePagePath} element={<PollTypePage />} />
          <Route path={sandboxPagePath} element={<SandboxPage />} />
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
            path={myActivePollsPagePath}
            element={<MyPollsPage activeTab={MyPollsTab.Active} />}
          />
          <Route
            path={myFinishedPollsPagePath}
            element={<MyPollsPage activeTab={MyPollsTab.Finished} />}
          />
          <Route
            path={createMoneyPoolPagePath}
            element={<CreateMoneyPoolPage />}
          />
          <Route
            path={activeVotingMoneyPoolPagePath}
            element={<ActivePollsPage activeTab={PollTypeTab.MoneyPool} />}
          />
          <Route
            path={activeVotingAccessToContentPagePath}
            element={
              <ActivePollsPage activeTab={PollTypeTab.AccessToContent} />
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
