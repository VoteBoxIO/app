import { styled } from '@linaria/react'
import React, { FC } from 'react'
import { Rhytm } from '../ui/Rhytm'
import { TitleAndSubtitle } from '../ui/TitleAndSubtitle'

export const CreateMoneyPoolPage: FC = () => {
  return (
    <CreateMoneyPoolPageCOntainer>
      <Rhytm>
        <TitleAndSubtitle
          titleFontSize={24}
          title="Денежный пул"
          subtitle="Победители делят деньги проигравших. Голосовать можно неограниченное количество раз."
        />
      </Rhytm>
    </CreateMoneyPoolPageCOntainer>
  )
}

export const createMoneyPoolPagePath = '/create-money-pool'

const CreateMoneyPoolPageCOntainer = styled.div``
