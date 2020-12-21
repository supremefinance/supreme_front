import styled from 'styled-components'
import React from "react";
import armors from '../../../src/assets/img/armorslab.png';

const Audits: React.FC = () => {

    return (
        <StyledContainer>
          <StyledTitle>View & Download Audits</StyledTitle>
          <StyledBox onClick={() => { window.open('/HYPE_audit.pdf', '_blank') }}>
              <StyledImg src={armors}/>
          </StyledBox>
            <br />
            <StyledBox>
                <h4>Supreme is currently offering a bounty of 20 ETH to two firms that can provide us with full rigorous audits of the protocol and publish them.</h4>
            </StyledBox>
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
  text-align: center;  
`

const StyledTitle = styled.h3`
  text-align: center;
  color: #5B3926;
  margin-top: 100px;
`

const StyledBox = styled.div`
  text-align: center;
  max-width: 700px;
  margin: auto;
  margin-top: 50px;
  height: 110px;
  padding-left: 50px;
  padding-right: 50px;
  &:hover {
    cursor: pointer;
  }
`

const StyledImg = styled.img`
  width: 80%;
  border-radius: 12px;
`

export default Audits