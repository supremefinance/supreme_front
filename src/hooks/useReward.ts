import { useCallback } from 'react'

import useSupreme from './useSupreme'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../supreme/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const supreme = useSupreme()
  const masterChefContract = getMasterChefContract(supreme)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, supreme])

  return { onReward: handleReward }
}

export default useReward
