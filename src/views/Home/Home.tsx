import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/img/logo_supreme_finance.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import { tokenName } from '../../constants/globalVariable';
import icon_factory from '../../assets/img/icon_factory.png';
import icon_tip from '../../assets/img/icon_tip.png';

const Home: React.FC = () => {
  return (
    <Page>
      <PageHeader
        icon={<img src={logo} height={70} />}
        title={``}
        subtitle=""
      />

      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      <StyledInfo>
          <img src={icon_tip} height={16} /><b>&nbsp;Tip</b>: {tokenName}-ETH LP token pool yields TWICE more token
        rewards per block.
      </StyledInfo>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button text="&nbsp;See the HYPE Farm" to="/farms" variant="secondary" icon={icon_factory} />
      </div>
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`

export default Home
