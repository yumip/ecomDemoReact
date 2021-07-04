import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../../assets/footer-logo-transparent.png";
import { countries, amazonServices } from './footerlinks';

const FooterLogo = styled.div`
width: 100%;
text-align: center;
padding: 15px 0;
img {
    width: 100px;
    height: auto;
}
`;
const CountriesStyle = styled.ul`
list-style: none;
padding: 10px 0;
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
font-size: 12px;
margin: auto;
`;
const Country = styled.li`
border-left: solid 1px #ddd;
padding: 0 7px;
display: inline-block;
a {
    text-decoration: none;
    color: #ddd;
    &:hover {
        text-decoration: underline;
    }
}
&:first-child {
    border-left: none;
}
`;

export default function CountiresLinks () {
    return (
        <>
            <FooterLogo>
                <img src={Logo} alt="amazon logo"/>
            </FooterLogo>
            <CountriesStyle>
                {countries.map((country,i) => (
                    <Country key={i}>
                        <Link to={country.url}>{country.name}</Link>
                    </Country>
                ))}
            </CountriesStyle>
            <CountriesStyle>
                <div>And don't forget:</div>
                {amazonServices.map((service,i) => (
                    <Country key={i} style={{borderLeft: i===0 ? "none" : ""}}>
                        <Link to={service.url}>{service.name}</Link>
                    </Country>
                ))}
            </CountriesStyle>
        </>
    )
}