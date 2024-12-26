// import { TonClient } from 'ton'
// import { getHttpEndpoint } from '@orbs-network/ton-access'
// import {
//   MasterNftCollectionWrappers,
//   VoteJettonMasterWrappers,
//   VoteJettonWalletWrappers,
//   VotingNftItemWrappers,
// } from 'votebox_wrappers'

// export async function initializeWrappers() {
//   const endpoint = await getHttpEndpoint({ network: 'mainnet' }) // или 'testnet'
//   const client = new TonClient({ endpoint })

//   const masterNftAddress = 'EQC...' // Адрес MasterNftCollection
//   const voteJettonMasterAddress = 'EQD...' // Адрес VoteJettonMaster
//   const voteJettonWalletAddress = 'EQF...' // Адрес VoteJettonWallet
//   const votingNftItemAddress = 'EQG...' // Адрес VotingNftItem

//   const masterNftWrapper = MasterNftCollectionWrappers.MasterNftCollection.fromAddress()
//   const voteJettonMasterWrapper = new VoteJettonMasterWrappers(
//     client,
//     voteJettonMasterAddress,
//   )
//   const voteJettonWalletWrapper = new VoteJettonWalletWrappers(
//     client,
//     voteJettonWalletAddress,
//   )
//   const votingNftItemWrapper = new VotingNftItemWrappers(
//     client,
//     votingNftItemAddress,
//   )

//   return {
//     masterNftWrapper,
//     voteJettonMasterWrapper,
//     voteJettonWalletWrapper,
//     votingNftItemWrapper,
//   }
// }
