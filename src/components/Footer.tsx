import { styled } from '@linaria/react'
import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { useAppContext } from '../App.context'
import { createLanguageName } from '../functions/createLanguageName'
import { faqPagePath } from '../pages/FaqPage'
import { languagePagePath } from '../pages/LanguagePage'
import { paymentMethodsPagePath } from '../pages/PaymentMethodsPage'
import { supportPagePath } from '../pages/SupportPage'
import { TextWithArrow } from '../ui/TextWithArrow'

export const Footer: FC = () => {
  const context = useAppContext()

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
