import React from 'react';
import useToggleState from '../../hooks/useToggleState';
import styled from 'styled-components';
import CheckIcon from '@material-ui/icons/Check';

const Checkbox = styled.div`
    width: 15px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;
    border: solid 1px #aaa;
`;
export default function CustomizedCheckbox() {
    const [checked, toggleChecked] = useToggleState(false);
  return (
    <Checkbox style={{ background: checked ? "#007185" : "#fff"}} onClick={toggleChecked}>
        <CheckIcon style={{ fill: "#fff", transform: "scale(0.5)"}} />
    </Checkbox>
  );
}
