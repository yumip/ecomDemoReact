import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { footerlinkssp } from './footerlinkssp';
const ContentsFlex = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: auto;
    padding: 3% 0;
`;
const ContentTitle = styled.div`
    width: 45%;
    font-size: 16px;
    font-weight: 600;
    margin: 6px 0 14px;
    a {
        text-decoration: none;
        color: #fff;
    }
`;

export default function FooterContentsSp() {
    
    return (
        <ContentsFlex>
                {footerlinkssp.map((footercontent, j) => (
                    <ContentTitle key={j}>
                        <Link to={footercontent.url}>{footercontent.content}</Link>
                    </ContentTitle>
                ))}
        </ContentsFlex>
    )
}