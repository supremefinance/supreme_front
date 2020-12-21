import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract } from '../supreme/utils'
import useSupreme from './useSupreme'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const supreme = useSupreme()
  const masterChefContract = getMasterChefContract(supreme)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, supreme])

  useEffect(() => {
    if (account && masterChefContract && supreme) {
      fetchBalance()
    }
  }, [account, block, masterChefContract, setBalance, supreme])

  return balance
}

export default useEarnings
