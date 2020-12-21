import {useCallback} from 'react'

import useSupreme from './useSupreme'
import {useWallet} from 'use-wallet'

import {enter, getXSupremeStakingContract} from '../supreme/utils'

const useEnter = () => {
  const {account} = useWallet()
  const supreme = useSupreme()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getXSupremeStakingContract(supreme),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, supreme],
  )

  return {onEnter: handle}
}

export default useEnter
