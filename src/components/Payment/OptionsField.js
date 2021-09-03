import { useState } from "react";
import styled from "styled-components";

export default function Options({ 
  title,
  textOptionOne, 
  textOptionTwo, 
  valueOptionOne, 
  valueOptionTwo, 
  onClick,
  value
}) {
  const [optionOne, setOptionOne] = useState(false);
  const [optionTwo, setOptionTwo] = useState(false);
  
  function handleSelection(event) {
    if(event.currentTarget.id === "1") {
      optionTwo && setOptionTwo(false);
      setOptionOne(!optionOne);
      updateOption(textOptionOne);
    } else {
      optionOne && setOptionOne(false);
      setOptionTwo(!optionTwo);
      updateOption(textOptionTwo);
    }
  }

  function updateOption(newValue) {
    value && value === newValue ? onClick(null) : onClick(newValue);
  }

  return (
    <Container>
      <Title>{title}</Title>
      <OptionsWrapper>
        <Option id="1" isSelected={optionOne} onClick={handleSelection}>
          <OptionText>{textOptionOne}</OptionText>
          <OptionValue>{valueOptionOne.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</OptionValue>
        </Option>
        <Option id="2" isSelected={optionTwo} onClick={handleSelection}>
          <OptionText>{textOptionTwo}</OptionText>
          <OptionValue>{valueOptionTwo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</OptionValue>
        </Option>
      </OptionsWrapper>
    </Container>
  );
}

const Title = styled.h3`
  font-size: 20px;
  color: #8E8E8E;
`;

const Option = styled.button`
  background: ${props => props.isSelected ? "#FFEED2" : "none"};
  width: 145px;
  height: 145px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;
  border: ${props => props.isSelected ? "none" : "1px solid #CECECE"};
  outline: none;
  cursor: pointer;
  

  &:hover {
    box-shadow: 0 0 7px -5px #454545;
  }
`;

const OptionsWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const OptionText = styled.span`
  font-size: 16px;
  color: #454545;
`;

const OptionValue = styled.span`
  font-size: 14px;
  color: #898989;
`;

const Container = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  gap: 10px;
`;
