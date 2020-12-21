import { useCallback } from 'react'

import useSupreme from './useSupreme'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../supreme/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const supreme = useSupreme()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(supreme),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, supreme],
  )

  return { onStake: handleStake }
}

export default useStake
