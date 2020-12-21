import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../supreme/utils'
import useSupreme from './useSupreme'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const supreme = useSupreme()
  const masterChefContract = getMasterChefContract(supreme)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, supreme])

  useEffect(() => {
    if (account && supreme) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, supreme])

  return balance
}

export default useStakedBalance
