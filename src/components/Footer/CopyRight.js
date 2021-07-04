import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CopyRightStyle = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    margin: auto;
    width: 100%;
    background: #131a22;
    padding: 15px 0 30px;
`;
const CopyRightContent = styled.li`
margin: 0 10px;
a {
    color: #fff;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
}
`;
export default function CopyRight() {
    return (
        <CopyRightStyle>
            <CopyRightContent><Link to="/">Conditions of Use & Sale</Link></CopyRightContent>
            <CopyRightContent><Link to="/">Privacy Notice</Link></CopyRightContent>
            <CopyRightContent><Link to="/">Interest-Based Ads Notice</Link></CopyRightContent>
            <CopyRightContent><span>© 1996-2020, Amazon.com, Inc. or its affiliates</span></CopyRightContent>
        </CopyRightStyle>
    )
}