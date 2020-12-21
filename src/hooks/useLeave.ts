import {useCallback} from 'react'

import useSupreme from './useSupreme'
import {useWallet} from 'use-wallet'

import {leave, getXSupremeStakingContract} from '../supreme/utils'

const useLeave = () => {
  const {account} = useWallet()
  const supreme = useSupreme()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXSupremeStakingContract(supreme),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, supreme],
  )

  return {onLeave: handle}
}

export default useLeave
