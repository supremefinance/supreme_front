import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Supreme } from '../../supreme'

export interface SupremeContext {
  supreme?: typeof Supreme
}

export const Context = createContext<SupremeContext>({
  supreme: undefined,
})

declare global {
  interface Window {
    supremesauce: any
  }
}

const SupremeProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [supreme, setSupreme] = useState<any>()

  // @ts-ignore
  window.supreme = supreme
  // @ts-ignore


  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const supremeLib = new Supreme(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setSupreme(supremeLib)
      window.supremesauce = supremeLib
    }
  }, [ethereum])

  return <Context.Provider value={{ supreme }}>{children}</Context.Provider>
}

export default SupremeProvider
