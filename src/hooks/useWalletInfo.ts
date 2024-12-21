// import { TonClient, Address, TupleItem } from 'ton'
// import { useTonConnect } from './useTonConnect'

// export function useWalletInfo(client: TonClient) {
//   const { wallet, network } = useTonConnect()

//   const getNFTs = async () => {
//     if (!wallet) return []
//     const address = Address.parse(wallet.toString())

//     try {
//       const { stack } = await client.runMethod(address, 'get_nfts')
//       // Parse stack items as required. Adjust parsing logic based on your contract.
//       const nfts = stack.readArray() // Example: Replace with actual contract response handling.
//       return nfts
//     } catch (error) {
//       console.error('Error fetching NFTs:', error)
//       return []
//     }
//   }

//   const getJettonBalance = async (jettonAddress: string) => {
//     if (!wallet) return null
//     const jettonAddr = Address.parse(jettonAddress)

//     try {
//       const { stack } = await client.runMethod(jettonAddr, 'get_balance', [
//         { type: 'slice', value: wallet }, // Correctly typed tuple item
//       ] as TupleItem[])
//       // Assume the balance is the first item in the stack.
//       const balance = stack.readBigNumber() // Adjust based on actual return type.
//       return balance
//     } catch (error) {
//       console.error('Error fetching Jetton balance:', error)
//       return null
//     }
//   }

//   return { getNFTs, getJettonBalance, network }
// }
