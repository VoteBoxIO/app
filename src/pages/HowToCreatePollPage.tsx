import { styled } from '@linaria/react'
import React, { FC, ReactNode } from 'react'
import Stories from 'react-insta-stories'
import { Story } from 'react-insta-stories/dist/interfaces'
import { TitleAndSubtitle } from '../ui/TitleAndSubtitle'

export const HowToCreatePollPage: FC = () => {
  return (
    <StoriesWrapper>
      <Stories
        stories={stories}
        defaultInterval={5000}
        width="100%"
        height="100%"
        storyContainerStyles={{
          background: 'transparent',
        }}
        loop
      />
    </StoriesWrapper>
  )
}

const StoryItem: FC<{
  title: ReactNode
  subtitle: ReactNode
}> = ({ title, subtitle }) => {
  return (
    <StoryContainer>
      <TitleAndSubtitle
        titleFontSize={28}
        gap="16px"
        title={title}
        subtitle={subtitle}
      />
    </StoryContainer>
  )
}

const StoriesWrapper = styled.div``
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
  margin-top: 30px;
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
