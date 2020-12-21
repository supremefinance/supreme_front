import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract, getFarms } from '../supreme/utils'
import useSupreme from './useSupreme'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const supreme = useSupreme()
  const farms = getFarms(supreme)
  const masterChefContract = getMasterChefContract(supreme)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, supreme])

  useEffect(() => {
    if (account && masterChefContract && supreme) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setBalance, supreme])

  return balances
}

export default useAllEarnings
