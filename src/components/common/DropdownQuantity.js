import React from 'react';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useToggleState from '../../hooks/useToggleState';
import useQuantity from '../../hooks/useQuantity';

const Button = styled.div`
    position: relative;
    // display: inline-block;
`;
const ButtonTop = styled.div`
    color: #0f1111;
    background: #f0f2f2;
    border: solid 1px #d5d9d9;
    box-shadow: 0 2px 5px rgba(15,17,17,.15);
    border-radius: 5px;
    width: 80px;
    height: 30px;
    display: flex;
    align-items: center; 
    justify-content: flex-end;
    &:hover { 
        background: #e7e7e7;
    }
`;
const Text = styled.div`
    font-size: 13px;
    height: auto;
    line-height: 2.2;
`;
const Dropdown = styled.div`
    color: #0f1111;
    background: #fff;
    border: solid 1px #d5d9d9;
    box-shadow: 0 2px 5px rgba(15,17,17,.15);
    border-radius: 5px;
    width: 80px;
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    align-items: center; 
    justify-content: flex-end;
    position: absolute;
    top: 0;
    z-index: 10;
`;
const Menu = styled.ul`
    width: 100%;
    list-style: none; //reset
    padding: 0; //reset
    margin: 0; //reset
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding: 8px 0;
`;
const Item = styled.li`
    width: 100%;
    border: solid 1px #fff;
    border-radius: 2px;
    &:hover { 
        background: #e7e7e7;
        border: solid 1px #d5d9d9;
    }
    &:last-child {
        border-top: solid 1px #d5d9d9;
    }
`;
const SelectedItem = styled.li`
    width: 100%;
    background: #edfdff;
    border: solid 1px #d5d9d9;
    border-left: solid 1px var(--dark-green);
`;



function DropdownMenu({product}) {
    const [opened, toggleOpened] = useToggleState(false);
    const [quantity, setQuantity] = useQuantity(product);
    const option = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const chooseNum = (n) => {
        toggleOpened();
        setQuantity(n);
        product.quantity = n;
    }
  return (
    <Button>
        <ButtonTop onClick={toggleOpened}>
            <Text><span style={{paddingRight: "5px"}}>Qty:</span>{quantity}</Text>
            <ExpandMoreIcon style={{transform: "scale(0.9)", paddingRight: "5px"}}/>
        </ButtonTop>
        {opened ? (
            <Dropdown>
                <Menu>
                    {option.map((n,i) => {
                        if (n === parseInt(quantity)) {
                            return (
                                <SelectedItem key={i} onClick={() => chooseNum(n)}>{n}</SelectedItem>
                            )
                        } 
                        return (
                            <Item  key={i} onClick={() => chooseNum(n)}>{n}</Item>
                        )
                    })}
                </Menu>
            </Dropdown>
        ) : ("")}
    </Button>
  );
}

export default DropdownMenu;