import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'
import { useWallet } from 'use-wallet'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardDoubleIcon from '../../../components/CardDoubleIcon'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import { Farm } from '../../../contexts/Farms'
import useAllStakedValue, {
  StakedValue,
} from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useSupreme from '../../../hooks/useSupreme'
import { getEarned, getMasterChefContract } from '../../../supreme/utils'
import { bnToDec } from '../../../utils'
import { tokenName } from "../../../constants/globalVariable";
import logo from '../../../assets/img/icon_sfi.png';
import eth from '../../../assets/img/icon_eth.png';
import yfi from '../../../assets/img/icon_yfi.png';
import usdc from '../../../assets/img/icon_usdc.png';
import dai from '../../../assets/img/icon_dai.png';
import usdt from '../../../assets/img/icon_usdt.png';
import link from '../../../assets/img/icon_link.png';
import snx from '../../../assets/img/icon_snx.png';
import comp from '../../../assets/img/icon_comp.png';

interface FarmWithStakedValue extends Farm, StakedValue {
  apy: BigNumber
}

const FarmCards: React.FC = () => {
  const [farms] = useFarms()
  const { account } = useWallet()
  const stakedValue = useAllStakedValue()

  const supremeIndex = farms.findIndex(
    ({ tokenSymbol }) => tokenSymbol === tokenName,
  )

  const supremePrice =
    supremeIndex >= 0 && stakedValue[supremeIndex]
      ? stakedValue[supremeIndex].tokenPriceInWeth
      : new BigNumber(0)

  const BLOCKS_PER_YEAR = new BigNumber(2336000)
  const SUPREME_PER_BLOCK = new BigNumber(100)

  let rows = farms.reduce<FarmWithStakedValue[][]>(
    (farmRows, farm, i) => {
      const farmWithStakedValue = {
        ...farm,
        ...stakedValue[i],
        apy: stakedValue[i]
          ? supremePrice
              .times(SUPREME_PER_BLOCK)
              .times(BLOCKS_PER_YEAR)
              .times(stakedValue[i].poolWeight)
              .div(stakedValue[i].totalWethValue)
          : null,
      }
      const newFarmRows = [...farmRows]
      if (newFarmRows[newFarmRows.length - 1].length === 3) {
        newFarmRows.push([farmWithStakedValue])
      } else {
        newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue)
      }
      return newFarmRows
    },
    [[]],
  )

  return (
    <StyledCards>
      {!!rows[0].length ? (
        rows.map((farmRow, i) => (
          <StyledRow key={i}>
            {farmRow.map((farm, j) => (
              <React.Fragment key={j}>
                <FarmCard farm={farm} />
                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      ) : (
        /*<StyledLoadingWrapper>
          <Loader text="Cooking the rice ..." />
        </StyledLoadingWrapper>*/
        <>
          <StyledRow key={0}>
              <React.Fragment key={0}>

                  <StyledCardWrapper>
                      <Card>
                          <CardContent>
                              <StyledContent>
                                  <CardDoubleIcon>
                                      <img src={logo} />
                                      &nbsp;&nbsp;
                                      <img src={eth} />
                                  </CardDoubleIcon>
                                  <StyledTitle>{'HYPE Play!'}</StyledTitle>
                                  <StyledDetails>
                                      <StyledDetail>{'Deposit HYPE-ETH UNI-V2 LP'}</StyledDetail>
                                      <StyledDetail>{'Earn HYPE'}</StyledDetail>
                                  </StyledDetails>
                                  <Spacer />
                                  <Button
                                      disabled={true}
                                      text={undefined}
                                      to={`/farms/`}
                                      variant='colorButton'
                                  >HYPE Farm will be ready
                                  </Button>
                                  <StyledInsight>
                                      <span>APY</span>
                                      <span>
                {'Loading ...'}
              </span>
                                  </StyledInsight>
                              </StyledContent>
                          </CardContent>
                      </Card>
                  </StyledCardWrapper>

                  <StyledSpacer />
              </React.Fragment>
              <React.Fragment key={1}>

                  <StyledCardWrapper>
                      <Card>
                          <CardContent>
                              <StyledContent>
                                  <CardDoubleIcon>
                                      <img src={yfi} />
                                      &nbsp;&nbsp;
                                      <img src={eth} />
                                  </CardDoubleIcon>
                                  <StyledTitle>{'YFI Play!'}</StyledTitle>
                                  <StyledDetails>
                                      <StyledDetail>{'Deposit YFI-ETH UNI-V2 LP'}</StyledDetail>
                                      <StyledDetail>{'Earn HYPE'}</StyledDetail>
                                  </StyledDetails>
                                  <Spacer />
                                  <Button
                                      disabled={true}
                                      text={undefined}
                                      to={`/farms/`}
                                      variant='colorButton'
                                  >HYPE Farm will be ready
                                  </Button>
                                  <StyledInsight>
                                      <span>APY</span>
                                      <span>
                {'Loading ...'}
              </span>
                                  </StyledInsight>
                              </StyledContent>
                          </CardContent>
                      </Card>
                  </StyledCardWrapper>

                  <StyledSpacer />
              </React.Fragment>
              <React.Fragment key={2}>

                  <StyledCardWrapper>
                      <Card>
                          <CardContent>
                              <StyledContent>
                                  <CardDoubleIcon>
                                      <img src={usdc} />
                                      &nbsp;&nbsp;
                                      <img src={eth} />
                                  </CardDoubleIcon>
                                  <StyledTitle>{'USDC Play!'}</StyledTitle>
                                  <StyledDetails>
                                      <StyledDetail>{'Deposit USDC-ETH UNI-V2 LP'}</StyledDetail>
                                      <StyledDetail>{'Earn HYPE'}</StyledDetail>
                                  </StyledDetails>
                                  <Spacer />
                                  <Button
                                      disabled={true}
                                      text={undefined}
                                      to={`/farms/`}
                                      variant='colorButton'
                                  >HYPE Farm will be ready
                                  </Button>
                                  <StyledInsight>
                                      <span>APY</span>
                                      <span>
                {'Loading ...'}
              </span>
                                  </StyledInsight>
                              </StyledContent>
                          </CardContent>
                      </Card>
                  </StyledCardWrapper>

                  <StyledSpacer />
              </React.Fragment>
          </StyledRow>

          <StyledRow key={1}>
                <React.Fragment key={0}>

                    <StyledCardWrapper>
                        <Card>
                            <CardContent>
                                <StyledContent>
                                    <CardDoubleIcon>
                                        <img src={dai} />
                                        &nbsp;&nbsp;
                                        <img src={eth} />
                                    </CardDoubleIcon>
                                    <StyledTitle>{'DAI Play!'}</StyledTitle>
                                    <StyledDetails>
                                        <StyledDetail>{'Deposit DAI-ETH UNI-V2 LP'}</StyledDetail>
                                        <StyledDetail>{'Earn HYPE'}</StyledDetail>
                                    </StyledDetails>
                                    <Spacer />
                                    <Button
                                        disabled={true}
                                        text={undefined}
                                        to={`/farms/`}
                                        variant='colorButton'
                                    >HYPE Farm will be ready
                                    </Button>
                                    <StyledInsight>
                                        <span>APY</span>
                                        <span>
                {'Loading ...'}
              </span>
                                    </StyledInsight>
                                </StyledContent>
                            </CardContent>
                        </Card>
                    </StyledCardWrapper>

                    <StyledSpacer />
                </React.Fragment>
                <React.Fragment key={1}>

                    <StyledCardWrapper>
                        <Card>
                            <CardContent>
                                <StyledContent>
                                    <CardDoubleIcon>
                                        <img src={usdt} />
                                        &nbsp;&nbsp;
                                        <img src={eth} />
                                    </CardDoubleIcon>
                                    <StyledTitle>{'USDT Play!'}</StyledTitle>
                                    <StyledDetails>
                                        <StyledDetail>{'Deposit USDT-ETH UNI-V2 LP'}</StyledDetail>
                                        <StyledDetail>{'Earn HYPE'}</StyledDetail>
                                    </StyledDetails>
                                    <Spacer />
                                    <Button
                                        disabled={true}
                                        text={undefined}
                                        to={`/farms/`}
                                        variant='colorButton'
                                    >HYPE Farm will be ready
                                    </Button>
                                    <StyledInsight>
                                        <span>APY</span>
                                        <span>
                {'Loading ...'}
              </span>
                                    </StyledInsight>
                                </StyledContent>
                            </CardContent>
                        </Card>
                    </StyledCardWrapper>

                    <StyledSpacer />
                </React.Fragment>
                <React.Fragment key={2}>

                    <StyledCardWrapper>
                        <Card>
                            <CardContent>
                                <StyledContent>
                                    <CardDoubleIcon>
                                        <img src={link} width={64}/>
                                        &nbsp;&nbsp;
                                        <img src={eth} />
                                    </CardDoubleIcon>
                                    <StyledTitle>{'LINK Play!'}</StyledTitle>
                                    <StyledDetails>
                                        <StyledDetail>{'Deposit LINK-ETH UNI-V2 LP'}</StyledDetail>
                                        <StyledDetail>{'Earn HYPE'}</StyledDetail>
                                    </StyledDetails>
                                    <Spacer />
                                    <Button
                                        disabled={true}
                                        text={undefined}
                                        to={`/farms/`}
                                        variant='colorButton'
                                    >HYPE Farm will be ready
                                    </Button>
                                    <StyledInsight>
                                        <span>APY</span>
                                        <span>
                {'Loading ...'}
              </span>
                                    </StyledInsight>
                                </StyledContent>
                            </CardContent>
                        </Card>
                    </StyledCardWrapper>

                    <StyledSpacer />
                </React.Fragment>
            </StyledRow>

            <StyledRow key={2}>
                <React.Fragment key={0}>

                    <StyledCardWrapper>
                        <Card>
                            <CardContent>
                                <StyledContent>
                                    <CardDoubleIcon>
                                        <img src={snx} width={64} />
                                        &nbsp;&nbsp;
                                        <img src={eth} />
                                    </CardDoubleIcon>
                                    <StyledTitle>{'SNX Play!'}</StyledTitle>
                                    <StyledDetails>
                                        <StyledDetail>{'Deposit SNX-ETH UNI-V2 LP'}</StyledDetail>
                                        <StyledDetail>{'Earn HYPE'}</StyledDetail>
                                    </StyledDetails>
                                    <Spacer />
                                    <Button
                                        disabled={true}
                                        text={undefined}
                                        to={`/farms/`}
                                        variant='colorButton'
                                    >HYPE Farm will be ready
                                    </Button>
                                    <StyledInsight>
                                        <span>APY</span>
                                        <span>
                {'Loading ...'}
              </span>
                                    </StyledInsight>
                                </StyledContent>
                            </CardContent>
                        </Card>
                    </StyledCardWrapper>

                    <StyledSpacer />
                </React.Fragment>
                <React.Fragment key={1}>

                    <StyledCardWrapper>
                        <Card>
                            <CardContent>
                                <StyledContent>
                                    <CardDoubleIcon>
                                        <img src={comp} width={64} />
                                        &nbsp;&nbsp;
                                        <img src={eth} />
                                    </CardDoubleIcon>
                                    <StyledTitle>{'COMP Play!'}</StyledTitle>
                                    <StyledDetails>
                                        <StyledDetail>{'Deposit COMP-ETH UNI-V2 LP'}</StyledDetail>
                                        <StyledDetail>{'Earn HYPE'}</StyledDetail>
                                    </StyledDetails>
                                    <Spacer />
                                    <Button
                                        disabled={true}
                                        text={undefined}
                                        to={`/farms/`}
                                        variant='colorButton'
                                    >HYPE Farm will be ready
                                    </Button>
                                    <StyledInsight>
                                        <span>APY</span>
                                        <span>
                {'Loading ...'}
              </span>
                                    </StyledInsight>
                                </StyledContent>
                            </CardContent>
                        </Card>
                    </StyledCardWrapper>

                    <StyledSpacer />
                </React.Fragment>
                <React.Fragment key={2}>

                    <StyledCardWrapper>
                        <Card>
                            <CardContent>
                                <StyledContent>
                                    <CardDoubleIcon>
                                        <img src={logo} />
                                        &nbsp;&nbsp;
                                        <img src={eth} />
                                    </CardDoubleIcon>
                                    <StyledTitle>{'HYPE Play!'}</StyledTitle>
                                    <StyledDetails>
                                        <StyledDetail>{'Deposit HYPE-ETH UNI-V2 LP'}</StyledDetail>
                                        <StyledDetail>{'Earn HYPE'}</StyledDetail>
                                    </StyledDetails>
                                    <Spacer />
                                    <Button
                                        disabled={true}
                                        text={undefined}
                                        to={`/farms/`}
                                        variant='colorButton'
                                    >HYPE Farm will be ready
                                    </Button>
                                    <StyledInsight>
                                        <span>APY</span>
                                        <span>
                {'Loading ...'}
              </span>
                                    </StyledInsight>
                                </StyledContent>
                            </CardContent>
                        </Card>
                    </StyledCardWrapper>

                    <StyledSpacer />
                </React.Fragment>
            </StyledRow>

</>
      )}
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: FarmWithStakedValue
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  const [startTime, setStartTime] = useState(0)
  const [harvestable, setHarvestable] = useState(0)

  const { account } = useWallet()
  const { lpTokenAddress } = farm
  const supreme = useSupreme()

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>
        {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  useEffect(() => {
    async function fetchEarned() {
      if (supreme) return
      const earned = await getEarned(
        getMasterChefContract(supreme),
        lpTokenAddress,
        account,
      )
      setHarvestable(bnToDec(earned))
    }
    if (supreme && account) {
      fetchEarned()
    }
  }, [supreme, lpTokenAddress, account, setHarvestable])

  const poolActive = true // startTime * 1000 - Date.now() <= 0

  return (
    <StyledCardWrapper>
      {farm.tokenSymbol === tokenName && <StyledCardAccent />}
      <Card>
        <CardContent>
          <StyledContent>
            <CardDoubleIcon>
                {/*{farm.icon}*/}
                <img src={logo} />
                &nbsp;&nbsp;
                <img src={`/${farm.icon}`} />
            </CardDoubleIcon>
            <StyledTitle>{farm.name}</StyledTitle>
            <StyledDetails>
              <StyledDetail>Deposit {farm.lpToken.toUpperCase()}</StyledDetail>
              <StyledDetail>Earn {farm.earnToken.toUpperCase()}</StyledDetail>
            </StyledDetails>
            <Spacer />
            <Button
              disabled={!poolActive}
              text={poolActive ? 'Select' : undefined}
              to={`/farms/${farm.id}`}
              variant='colorButton'
            >
              {!poolActive && (
                <Countdown
                  date={new Date(startTime * 1000)}
                  renderer={renderer}
                />
              )}
            </Button>
            <StyledInsight>
              <span>APY</span>
              <span>
                {farm.apy
                  ? `${farm.apy
                      .times(new BigNumber(100))
                      .toNumber()
                      .toLocaleString('en-US')
                      .slice(0, -1)}%`
                  : 'Loading ...'}
              </span>
              {/* <span>
                {farm.tokenAmount
                  ? (farm.tokenAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                {farm.tokenSymbol}
              </span>
              <span>
                {farm.wethAmount
                  ? (farm.wethAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                ETH
              </span> */}
            </StyledInsight>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const RainbowLight = keyframes`
  
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.grey[500]};
`

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fffdfa;
  color: #aa9584;
  width: 100%;
  margin-top: 12px;
  line-height: 32px;
  font-size: 13px;
  border: 1px solid #C6D3D3;
  text-align: center;
  padding: 0 12px;
`

export default FarmCards
