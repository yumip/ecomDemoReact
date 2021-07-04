import React from 'react';
import styled from 'styled-components';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const Button = styled.div`
    width: auto;
    max-width: 180px;
    min-width: 120px;
    height: 33px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    border: solid 1px #aaa;
`;
const SideButton = styled.div`
    width: 30%;
    height: 100%;
    background-image: linear-gradient(to bottom, #fcfcfd 0%, #e7e9ec 100%);
    display: flex;
    justify-content: center;
    align-items: center;
`;
const InnerIcon = styled.div`
    width: 30%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(0.8);
`;
const ProductsNum = styled.div`
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function ProductQuantity({setQuantity, remove, quantity, id}) {
    const countAction = (clicked) => {
        if (clicked === "INCREASE") {
            setQuantity(id, quantity + 1);
        } else if (clicked === "REDUCE") {
            setQuantity(id, quantity - 1)
        } else if (clicked === "DELETE") {
            remove()
        }
    }
  return (
    <Button>
        <SideButton 
            onClick={() => {
                if (quantity === 1) {
                    countAction("DELETE");
                } else {
                    countAction("REDUCE");
                }
            }} 
            style={{borderRight: "solid 1px #aaa"}}
        >
            <InnerIcon>
                { quantity === 1 ? (
                    <DeleteOutlineIcon onClick={() => countAction('DELETE')}/>
                ) : (
                    <RemoveIcon />
                )}
            </InnerIcon>
        </SideButton>
        <ProductsNum>{quantity}</ProductsNum>
        <SideButton onClick={() => countAction("INCREASE")}  style={{borderLeft: "solid 1px #aaa"}}>
            <InnerIcon><AddIcon /></InnerIcon>
        </SideButton>
    </Button>
  );
}

export default ProductQuantity;