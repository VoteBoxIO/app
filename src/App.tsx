import React, { FC, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { MainLayout } from './layout/MainLayout'
import {
  ActiveVotingPage,
  activeVotingAccessToContentPagePath,
  activeVotingMoneyPoolPagePath,
} from './pages/ActiveVotingPage/ActiveVotingPage'
import { ActiveVotingTab } from './pages/ActiveVotingPage/ActiveVotingPage.constants'
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
import { MyPollsPage, myPollsPagePath } from './pages/MyPollsPage'
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
    <BrowserRouter>
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
          <Route path={myPollsPagePath} element={<MyPollsPage />} />
          <Route
            path={createMoneyPoolPagePath}
            element={<CreateMoneyPoolPage />}
          />
          <Route
            path={activeVotingMoneyPoolPagePath}
            element={
              <ActiveVotingPage activeVotingTab={ActiveVotingTab.MoneyPool} />
            }
          />
          <Route
            path={activeVotingAccessToContentPagePath}
            element={
              <ActiveVotingPage
                activeVotingTab={ActiveVotingTab.AccessToContent}
              />
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
