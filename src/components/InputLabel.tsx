import { useState } from "react";
import styled from '@emotion/styled';

const LabelContainer = styled.label`
    display: flex;
    flex-direction: row;
    flex-grow: 0;
    font-size: 1rem;
    font-weight: 400;
    color: #535c53;
    letter-spacing: .5px;
    justify-content: flex-start;
    align-items: stretch;

    flex-direction: column;
    text-align: center;
    align-items: center;
    padding: 0.25rem 0;
`;

const Label = styled.span`
    max-width: 13rem;
    line-height: 20px;  
    padding: 0.5rem;
`;

const Input = styled.input`
    flex-direction: row;
    flex-grow: 0;
    padding: 0.25rem;
    text-align: center;
    color: #535c53;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: .5px;
    border-radius: 0.15rem;
    border: none;
    border: 1px solid #d4cdc0;

    &:focus {
        outline: none;
        border: 1px solid #535c53;
    }
`;

interface IInputLabelProps {
    id: string;
    name: string;
    label: string;
    maxLenght?: number;
    searchFilter: (letter: string) => void;
    value?: string;
}

const InputLabel: React.FC<IInputLabelProps> = (props) => {
    const {id, name, searchFilter, maxLenght, label} = props;
    const [value, setValue] = useState('');
    
    return (
        <LabelContainer htmlFor={id}>
            <Label>{ label }</Label>
            <Input 
                id={id} 
                type="text" 
                name={name}
                value={value} 
                maxLength={maxLenght} 
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                    setValue(e.target.value || '');
                    searchFilter(e.target.value)
                }}
            />
        </LabelContainer>
    )
}

export default InputLabel;