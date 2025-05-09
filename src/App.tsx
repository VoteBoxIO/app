import React, { FC, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { useAppContext } from './App.context'
import { BoxActivityType } from './constants'
import { MainLayout } from './layout/MainLayout'
import {
  activeBoxesAccessToContentPagePath,
  activeBoxesMoneyPoolPagePath,
  ActiveBoxesPage,
} from './pages/ActiveBoxesPage'
import { BoxTypeTab } from './pages/ActiveBoxesPage.constants'
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
  myActiveBoxesPagePath,
  MyBoxesPage,
  myFinishedBoxesPagePath,
} from './pages/MyBoxesPage'
import { NotFoundPage } from './pages/NotFoundPage'
import {
  PaymentMethodsPage,
  paymentMethodsPagePath,
} from './pages/PaymentMethodsPage'
import { PollTypePage, pollTypePagePath } from './pages/PollTypePage'
import { SandboxPage, sandboxPagePath } from './pages/SandboxPage'
import { SupportPage, supportPagePath } from './pages/SupportPage'
import {
  myActiveVotesPagePath,
  myFinishedVotesPagePath,
  MyVotesPage,
} from './pages/MyVotesPage'

export const App: FC = () => {
  const { basePath } = useAppContext()

  useEffect(() => {
    window.Telegram.WebApp.ready()
    window.Telegram.WebApp.expand()
  }, [])

  return (
    <BrowserRouter basename={basePath}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index path={indexPagePath} element={<IndexPage />} />
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
            path={myActiveBoxesPagePath}
            element={<MyBoxesPage activeTab={BoxActivityType.Active} />}
          />
          <Route
            path={myFinishedBoxesPagePath}
            element={<MyBoxesPage activeTab={BoxActivityType.Finished} />}
          />
          <Route
            path={myActiveVotesPagePath}
            element={<MyVotesPage activeTab={BoxActivityType.Active} />}
          />
          <Route
            path={myFinishedVotesPagePath}
            element={<MyVotesPage activeTab={BoxActivityType.Finished} />}
          />
          <Route
            path={createMoneyPoolPagePath}
            element={<CreateMoneyPoolPage />}
          />
          <Route
            path={activeBoxesMoneyPoolPagePath}
            element={<ActiveBoxesPage activeTab={BoxTypeTab.MoneyPool} />}
          />
          <Route
            path={activeBoxesAccessToContentPagePath}
            element={<ActiveBoxesPage activeTab={BoxTypeTab.AccessToContent} />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
