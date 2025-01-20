import { CHAIN } from '@tonconnect/ui-react'
import { useTonConnect } from './useTonConnect'

export const useContactAddresses = () => {
  const { network } = useTonConnect()

  if (!network) {
    return {
      nftItemContractAddress: '',
      jettonContractAddress: '',
      nftCollectionContractAddress: '',
    }
  }

  if (network === CHAIN.TESTNET) {
    if (
      !process.env.TESTNET_NFT_ITEM_CONTRACT_ADDRESS ||
      !process.env.TESTNET_JETTON_CONTRACT_ADDRESS ||
      !process.env.TESTNET_NFT_COLLECTION_CONTRACT_ADDRESS
    ) {
      throw new Error('Missing testnet contract address')
    }

    return {
      nftItemContractAddress: process.env.TESTNET_NFT_ITEM_CONTRACT_ADDRESS,
      jettonContractAddress: process.env.TESTNET_JETTON_CONTRACT_ADDRESS,
      nftCollectionContractAddress:
        process.env.TESTNET_NFT_COLLECTION_CONTRACT_ADDRESS,
    }
  }

  if (
    !process.env.MAINNET_NFT_ITEM_CONTRACT_ADDRESS ||
    !process.env.MAINNET_JETTON_CONTRACT_ADDRESS ||
    !process.env.MAINNET_NFT_COLLECTION_ADDRESS
  ) {
    throw new Error('Missing mainnet contract address')
  }

  return {
    nftItemContractAddress: process.env.MAINNET_NFT_ITEM_CONTRACT_ADDRESS!,
    jettonContractAddress: process.env.MAINNET_JETTON_CONTRACT_ADDRESS!,
    nftCollectionContractAddress: process.env.MAINNET_NFT_COLLECTION_ADDRESS!,
  }
}
