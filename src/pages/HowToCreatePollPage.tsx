import { styled } from '@linaria/react'
import React, { FC, ReactNode } from 'react'
import Stories from 'react-insta-stories'
import { Story } from 'react-insta-stories/dist/interfaces'
import { TitleAndSubtitle } from '../ui/TitleAndSubtitle'
import SvgCloseWhite from '../svgr/CloseWhite'
import { useNavigate } from 'react-router'

export const HowToCreatePollPage: FC = () => {
  return (
    <Stories
      stories={stories}
      defaultInterval={5000}
      width="100%"
      height="calc(100vh - 40px)"
      storyContainerStyles={{
        background: 'transparent',
      }}
      loop
    />
  )
}

const StoryItem: FC<{
  title: ReactNode
  subtitle: ReactNode
}> = ({ title, subtitle }) => {
  let navigate = useNavigate()

  return (
    <StoryContainer>
      <TitleAndSubtitle
        titleFontSize={28}
        gap="16px"
        title={title}
        subtitle={subtitle}
      />
      <Button onClick={() => navigate(-1)}>
        <CloseSvg />
      </Button>
    </StoryContainer>
  )
}

const CloseSvg = styled(SvgCloseWhite)`
  flex-shrink: 0;
`
const Button = styled.button`
  position: absolute;
  top: 24px;
  right: 0;
  cursor: pointer;
  z-index: 10000;
`
const StoryItem1: FC = () => {
  return (
    <StoryItem
      title="Как создать голосование"
      subtitle="Выберите тип голосования и настройте параметры. Есть два типа “Денежный пул” – победители делят деньги проигравших. Голосовать можно неограниченное количество раз; и “Доступ к контенту” – все участники получают доступ к контенту. Один голос – фиксированная стоимость."
    />
  )
}
const StoryItem2: FC = () => {
  return (
    <StoryItem
      title="Как участвовать в голосовании"
      subtitle="Выберите тип голосования и настройте параметры. Есть два типа “Денежный пул” – победители делят деньги проигравших. Голосовать можно неограниченное количество раз; и “Доступ к контенту” – все участники получают доступ к контенту. Один голос – фиксированная стоимость."
    />
  )
}

const StoryContainer = styled.div`
  display: flex;
  align-items: end;
  margin-top: auto;
  width: 100%;
  height: 100%;
`

const stories: Story[] = [
  {
    content: () => <StoryItem1 />,
  },
  {
    content: () => <StoryItem2 />,
  },
]

export const howToCreatePollPagePath = '/how-to-create-poll'
