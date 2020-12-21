import {useCallback} from 'react'

import useSupreme from './useSupreme'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getSupremeContract,
  getXSupremeStakingContract
} from '../supreme/utils'

const useApproveStaking = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const supreme = useSupreme()
  const lpContract = getSupremeContract(supreme)
  const contract = getXSupremeStakingContract(supreme)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return {onApprove: handleApprove}
}

export default useApproveStaking
