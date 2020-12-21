import { useCallback } from 'react'

import useSupreme from './useSupreme'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../supreme/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const supreme = useSupreme()
  const masterChefContract = getMasterChefContract(supreme)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, supreme],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
