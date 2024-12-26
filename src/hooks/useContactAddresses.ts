import { CHAIN } from '@tonconnect/ui-react'
import { useTonConnect } from './useTonConnect'

export const useContactAddresses = ():
  | {
      masterContractAddress: string
      masterJettonContractAddress: string
      masterNftCollectionAddress: string
    }
  | undefined => {
  const { network } = useTonConnect()

  if (!network) {
    return
  }

  if (network === CHAIN.TESTNET) {
    if (
      !process.env.TESTNET_MASTER_CONTRACT_ADDRESS ||
      !process.env.TESTNET_MASTER_JETTON_CONTRACT_ADDRESS ||
      !process.env.TESTNET_MASTER_NFT_COLLECTION_ADDRESS
    ) {
      throw new Error('Missing testnet contract address')
    }

    return {
      masterContractAddress: process.env.TESTNET_MASTER_CONTRACT_ADDRESS,
      masterJettonContractAddress:
        process.env.TESTNET_MASTER_JETTON_CONTRACT_ADDRESS,
      masterNftCollectionAddress:
        process.env.TESTNET_MASTER_NFT_COLLECTION_ADDRESS,
    }
  }

  if (
    !process.env.MAINNET_MASTER_CONTRACT_ADDRESS ||
    !process.env.MAINNET_MASTER_JETTON_CONTRACT_ADDRESS ||
    !process.env.MAINNET_MASTER_NFT_COLLECTION_ADDRESS
  ) {
    throw new Error('Missing mainnet contract address')
  }

  return {
    masterContractAddress: process.env.MAINNET_MASTER_CONTRACT_ADDRESS!,
    masterJettonContractAddress:
      process.env.MAINNET_MASTER_JETTON_CONTRACT_ADDRESS!,
    masterNftCollectionAddress:
      process.env.MAINNET_MASTER_NFT_COLLECTION_ADDRESS!,
  }
}
