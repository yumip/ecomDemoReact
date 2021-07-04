import React from 'react';
import styled from 'styled-components';

const CheckoutButtonDisabled = styled.button`
    text-decoration: none;
    background-image: linear-gradient(to bottom, #d1c29f 0%, #c8991a 100%);
    width: 100%;
    height: 35px;
    border-radius: 3px;
    border: solid 1px #aaa;
`;
const CheckoutButton = styled(CheckoutButtonDisabled)`
    background-image: linear-gradient(to bottom, #faebc8 0%, #f0c14d 100%);
    &:hover {
        cursor: pointer;
        background-image: linear-gradient(to bottom, #f1e2bf 0%, #e8b93a 100%);
    }
`;
const Text = styled.div`
    width: 100%;
    height: 100%;
    color: #111;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: auto;
`;

function YellowButton({disabledCondition, text, type}) {
  return (
        disabledCondition ? (
            <CheckoutButtonDisabled disabled={disabledCondition} type={type}>
                <Text>{text}</Text>
            </CheckoutButtonDisabled>
        ) : (
            <CheckoutButton type={type}>
                <Text>{text}</Text>
            </CheckoutButton>
        )
  );
}
  
export default YellowButton;