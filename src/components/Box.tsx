import { Address, fromNano } from '@ton/core'
import React, { FC, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { BoxV0Wrappers } from 'votebox_wrappers'
import { useAppContext } from '../App.context'
import { getHoursAndDaysLeft } from '../functions/getHoursAndDaysLeft'
import { useAsyncInitialize } from '../hooks/useAsyncInitialize'
import { Box as TypeBox } from '../hooks/useBoxes'
import { useSendUserVote } from '../hooks/useSendUserVote'
import { BoxView } from '../ui/BoxView'
import { EnterAmountDialog } from './EnterAmountDialog'

export const Box: FC<{ box: TypeBox }> = ({ box }) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  )

  const { client } = useAppContext()

  // Инициализируем контракт для каждого NftItem
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

  const { days, hours, isExpired } = getHoursAndDaysLeft(Number(box.deadline))

  const largestVoteAmount = Math.max(
    ...box.boxChoices.map(choice => Number(choice.votesAmount)),
  )

  return (
    <>
      <BoxView
        title={box.question}
        expiration={
          isExpired ? (
            <FormattedMessage id="status-completed" defaultMessage="Завершен" />
          ) : days ? (
            <FormattedMessage
              id="voteSettings.timeLeft"
              values={{ days, hours }}
              defaultMessage="Еще {days} д и {hours} ч"
            />
          ) : (
            <FormattedMessage
              id="voteSettings.timeLeftHoursOnly"
              values={{ hours }}
              defaultMessage="Еще {hours} ч"
            />
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

// {
//   "address": "0:982dd64f8c58492480e312db15cb0d20becd82ec9e044fb0ee3f079f9f02c81d",
//   "masterCollectionAddress": "0:d49a10d40fed647ecdcd2743ca35faa34ef003499163557154fa9dcd72464be1",
//   "itemIndex": "9",
//   "owner": "0:e8e5aa9b85c20080c2369913c61061a7613abb88aa430b72f6ea085b2841a43b",
//   "createBlockchainTimestamp": "33640927000003",
//   "updateBlockchainTimestamp": "33640927000003",
//   "question": "Видно?",
//   "voteStatus": "0",
//   "winner": null,
//   "voteRewardType": 0,
//   "hideVotes": false,
//   "fixedVoteAmount": null,
//   "minVoteAmount": "50000000",
//   "platformBasisPoints": "200",
//   "creatorBasisPoints": "0",
//   "referralFeeBasisPoints": null,
//   "referralAddress": null,
//   "deadline": "1745035380000",
//   "pollTimestamp": null,
//   "boxChoices": [
//       {
//           "id": 176,
//           "boxAddress": "0:982dd64f8c58492480e312db15cb0d20becd82ec9e044fb0ee3f079f9f02c81d",
//           "choice": "Да",
//           "choiceIndex": 0,
//           "votesAmount": "0",
//           "voteJettonMasterAddress": null
//       },
//       {
//           "id": 177,
//           "boxAddress": "0:982dd64f8c58492480e312db15cb0d20becd82ec9e044fb0ee3f079f9f02c81d",
//           "choice": "Ноу",
//           "choiceIndex": 1,
//           "votesAmount": "0",
//           "voteJettonMasterAddress": null
//       }
//   ]
// }
