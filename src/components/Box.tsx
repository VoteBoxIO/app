import { Address, fromNano } from '@ton/core'
import React, { FC, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { BoxV0Wrappers } from 'votebox_wrappers'
import { useAppContext } from '../App.context'
import { BOX_STATUS } from '../constants'
import { getTimeLeft } from '../functions/getTimeLeft'
import { useAsyncInitialize } from '../hooks/useAsyncInitialize'
import { Box as TypeBox } from '../hooks/useBoxes'
import { useSendUserVote } from '../hooks/useSendUserVote'
import { BoxView } from '../ui/BoxView'
import { BoxClaimRewardBlock } from './BoxClaimRewardBlock'
import { EnterAmountDialog } from './EnterAmountDialog'

export const Box: FC<{ box: TypeBox }> = ({ box }) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  )

  const { client, wallet } = useAppContext()

  const boxV0OpenedContract = useAsyncInitialize(async () => {
    if (client) {
      return client.open(
        BoxV0Wrappers.BoxV0.fromAddress(Address.parse(box.address)),
      )
    }
  }, [client])

  const { sendUserVote, isValidVotingAmount } = useSendUserVote(
    boxV0OpenedContract,
    box.recommendedVoteGas,
  )

  const handlePollItemClick = (index: number) => {
    setSelectedOptionIndex(index)
  }

  const { minutes, days, hours, isExpired } = getTimeLeft(Number(box.deadline))

  const largestVoteAmount = Math.max(
    ...box.boxChoices.map(choice => Number(choice.votesAmount)),
  )

  return (
    <>
      <BoxView
        title={box.question}
        expiration={
          isExpired ? (
            box.boxStatus === BOX_STATUS.STATE_VOTING_FINISHED ? (
              <FormattedMessage
                id="status-completed"
                defaultMessage="Завершен"
              />
            ) : (
              <FormattedMessage
                id="status-completing"
                defaultMessage="Завершается"
              />
            )
          ) : (
            getTimeLeftLexeme(minutes, hours, days)
          )
        }
        bid={fromNano(
          // Суммируем votesAmount у boxChoices
          box.boxChoices.reduce(
            (acc, value) => (acc += Number(value.votesAmount)),
            0,
          ),
        )}
        commission={
          <FormattedMessage
            id="percent-commission"
            defaultMessage="{commission}% комиссии"
            values={{
              commission:
                (Number(box.creatorBasisPoints) +
                  Number(box.platformBasisPoints)) /
                100,
            }}
          />
        }
        bottomElement={
          wallet && (
            // На этом статусе можно забрать выигрыш
            // box.boxStatus === BOX_STATUS.STATE_REWARDS_DISTRIBUTED &&
            <BoxClaimRewardBlock boxIndex={Number(box.itemIndex)} />
          )
        }
        boxChoices={box.boxChoices}
        onPollItemClick={handlePollItemClick}
        largestVoteAmount={largestVoteAmount}
        isExpired={isExpired}
      />
      {selectedOptionIndex !== null && (
        <EnterAmountDialog
          onSubmit={amount => sendUserVote(selectedOptionIndex, amount)}
          onClose={() => setSelectedOptionIndex(null)}
          isValidVotingAmount={isValidVotingAmount}
        />
      )}
    </>
  )
}

const filterVotesCreatedByUser = (
  boxChoices: TypeBox['boxChoices'],
  wallet: string,
) => {
  const votesCreatedByUser = boxChoices
    .flatMap(boxChoice =>
      boxChoice.votes.map(vote => ({
        ...vote,
        jettonMasterAddress: boxChoice.jettonMasterAddress,
        choiceIndex: boxChoice.choiceIndex,
      })),
    )
    .filter(vote => vote.user === wallet)

  return votesCreatedByUser
}

const getTimeLeftLexeme = (minutes: number, hours: number, days: number) => {
  if (days > 0) {
    return (
      <FormattedMessage
        id="voteSettings.timeLeft"
        values={{ days, hours }}
        defaultMessage="Еще {days} д и {hours} ч"
      />
    )
  }
  if (hours > 0) {
    return (
      <FormattedMessage
        id="voteSettings.timeLeftHoursOnly"
        values={{ hours }}
        defaultMessage="Еще {hours} ч"
      />
    )
  }
  if (minutes > 0) {
    return (
      <FormattedMessage
        id="voteSettings.timeLeftMinutesOnly"
        values={{ minutes }}
        defaultMessage="Еще {minutes} мин"
      />
    )
  }
}
