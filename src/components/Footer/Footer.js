import React from "react";
import styled from "styled-components";
import useWindowWidth from '../../hooks/useWindowWidthState';

import BackToTop from '../common/BackToTop';
import CopyRight from './CopyRight';
import CountriesLinks from './CountriesLinks';
import FooterContents from './FooterContents';
import FooterContentsSp from './FooterContentsSp';

const FooterStyles = styled.div`
    margin-top: 30px;
    width: 100%;
    color: #fff;
    background: #232f3e;
`;
const Divider = styled.div`
    border-top: 1px solid #444;
    margin-top: 40px;
`;


export default function Footer() {
    const isSp = useWindowWidth() < 579;
    return (
        <FooterStyles>
            <BackToTop />
            {isSp ? (
                <FooterContentsSp />
            ) : (
                <>
                <FooterContents />
                <Divider />
                <CountriesLinks />
                </>
            )}
            <CopyRight />
        </FooterStyles>
    )
}