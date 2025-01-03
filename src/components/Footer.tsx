import { styled } from '@linaria/react'
import React, { FC, useContext } from 'react'
import { TextWithArrow } from '../ui/TextWithArrow'
import { faqPagePath } from '../pages/FaqPage'
import { supportPagePath } from '../pages/SupportPage'
import { paymentMethodsPagePath } from '../pages/PaymentMethodsPage'
import { languagePagePath } from '../pages/LanguagePage'
import { FormattedMessage } from 'react-intl'
import { AppContext } from '../App.context'
import { createLanguageName } from '../functions/createLanguageName'

export const Footer: FC = () => {
  const context = useContext(AppContext)

  return (
    <FooterContainer>
      <TextWithArrow to={faqPagePath}>FAQ</TextWithArrow>
      <TextWithArrow to={supportPagePath}>
        <FormattedMessage id="support" defaultMessage="Поддержка" />
      </TextWithArrow>
      <TextWithArrow to={paymentMethodsPagePath}>
        <FormattedMessage
          id="payment-methods"
          defaultMessage="Способы оплаты"
        />
      </TextWithArrow>
      <TextWithArrow to={languagePagePath}>
        {createLanguageName(context.language)}
      </TextWithArrow>
    </FooterContainer>
  )
}

const FooterContainer = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 12px;
  grid-gap: 12px;
`
