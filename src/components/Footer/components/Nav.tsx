import React from 'react'
import styled from 'styled-components'
import { contractAddress } from "../../../constants/globalVariable";
import { NavLink } from 'react-router-dom'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink
        target="_blank"
        href={`https://etherscan.io/address/0x4ff7c227e1e7bD59351de8635381C379750A8040#code`}
      >
        Contract
      </StyledLink>
      {/*<StyledLink
        target="_blank"
        href="https://uniswap.info/pair/0xce84867c3c02b05dc570d0135103d3fb9cc19433"
      >
        SupremeSwap SUPREME-ETH
      </StyledLink> */}
      <StyledLink target="_blank" href="https://t.me/supreme_finance">
        Telegram
      </StyledLink>
      <StyledLink target="_blank" href="https://t.me/SupremeFinanceVN">
        Telegram(Vietnam)
      </StyledLink>
      <StyledLink target="_blank" href="https://discord.com/channels/786892885949022268/786892959790006333">
        Discord
      </StyledLink>
      <StyledLink target="_blank" href="https://github.com/supremefinance">
        Github
      </StyledLink>
      <StyledLink target="_blank" href="https://twitter.com/SupremeFinance2">
        Twitter
      </StyledLink>
      <StyledLink2 exact activeClassName="active" to="/audits">
        Audits
      </StyledLink2>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  
  @media (max-width: 600px) {
      padding-left: 8px;
      padding-right: 8px;
  }
`

const StyledLink2 = styled(NavLink)`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  
  @media (max-width: 600px) {
      padding-left: 8px;
      padding-right: 8px;
  }
`

export default Nav
