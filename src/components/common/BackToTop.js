import React from 'react';
import styled from 'styled-components';
import backToTop from '../../utils/backToTop';
import useWindowWidthState from '../../hooks/useWindowWidthState';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const BackToTopStyle = styled.div`
    width: 100%;
    height: 50px;
    background: #37475a;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    &:hover {
        background: #47576a;
    }
`;
const Text = styled.div`
    font-size: 12px;
    color: #fff;
`;

export default function CustomizedCheckbox() {
    const windowWidth = useWindowWidthState();
    const isSp = windowWidth > 579;
  return (
      <>
        <BackToTopStyle onClick={backToTop}>
      { isSp ? (
            <Text>Back to top</Text>
      ) : (
        <>
            <ArrowDropUpIcon style={{fill: "#ddd"}} />
            <Text style={{transform: "translateY(-5px)"}}>TOP OF PAGE</Text>
        </>
      )}
        </BackToTopStyle>

    </>
  )
}