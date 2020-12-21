import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'

import logo from '../../assets/img/logo_supreme_finance.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import Farm from '../Farm'

import FarmCards from './components/FarmCards'
import { tokenName } from "../../constants/globalVariable";

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={logo} height="70" />}
                subtitle={`Earn ${tokenName} tokens by staking UniSwap V2 LP Tokens.`}
                title="Select Your Favorite Farms"
              />
              <FarmCards />
            </Route>
            <Route path={`${path}/:farmId`}>
              <Farm />
            </Route>
          </>
        ) : (
          /*<div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={onPresentWalletProviderModal}
              text="🔓 Unlock Wallet"
            />
          </div>*/
            <>
                <Route exact path={path}>
                    <PageHeader
                        icon={<img src={logo} height="70" />}
                        subtitle={`Earn ${tokenName} tokens by staking UniSwap V2 LP Tokens.`}
                        title="Select Your Favorite Farms"
                    />
                    <FarmCards />
                </Route>
                <Route path={`${path}/:farmId`}>
                    <Farm />
                </Route>
            </>
        )}
      </Page>
    </Switch>
  )
}

export default Farms
