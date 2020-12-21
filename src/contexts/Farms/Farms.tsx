import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useSupreme from '../../hooks/useSupreme'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../supreme/utils'
import { getFarms } from '../../supreme/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const supreme = useSupreme()
  const { account } = useWallet()

  const farms = getFarms(supreme)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
