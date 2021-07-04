import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { footerlinks } from './footerlinks';
const ContentsTable = styled.div`
    display: table;
    margin: auto;
    padding: 30px 0;
`;
const ContentsRow = styled.div`
    display: table-row;
`;
const ContentsCell = styled.ul`
    display: table-cell;
    list-style: none;
    padding: 0;
    margin: 0;
    margin-right: 30px;
`;
const SpacerCell = styled.li`
    display: table-cell;
    padding: 0 10px;
    width: 10%;
`;
const ContentTitle = styled.li`
    font-size: 16px;
    font-weight: 600;
    margin: 6px 0 14px;
`;
const ContentLine = styled.li`
    font-size: 14px;
    margin-bottom: 10px;
    a {
        text-decoration: none;
        color: #ddd;
        &:hover {
            text-decoration: underline;
        }
    }
`;

export default function FooterContents() {
    
    return (
        <ContentsTable>
            <ContentsRow>
                {footerlinks.map((footerContents, i) => (
                    <React.Fragment key={i}>
                        <ContentsCell>
                            <ContentTitle>{footerContents.title}</ContentTitle>
                            {footerContents.contents.map((footercontent, j) => (
                                <ContentLine key={j}>
                                    <Link to={footercontent.url}>{footercontent.content}</Link>
                                </ContentLine>
                            ))}
                        </ContentsCell>
                        {i === footerlinks.length - 1 ? "" : <SpacerCell />}
                    </React.Fragment>
                ))}
            </ContentsRow>
        </ContentsTable>
    )
}