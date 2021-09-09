import { useState } from "react";
import styled from "styled-components";

export default function Options({ 
  title,
  options,
  setState
}) {
  function handleSelection(option, index) {
    if (option.isSelected) option.isSelected = false;
    else {
      const optionTrue = options.find(option => option.isSelected);
      if(optionTrue) optionTrue.isSelected = false;
      option.isSelected = true;
    }
    setState([ ...options ]);
  }

  return (
    <Container>
      <Title>{title}</Title>
      <OptionsWrapper>
        {
          options.map((option, index) => {
            return (
              <Option key={index+option.price} isSelected={option.isSelected} onClick={() => handleSelection(option, index)}>
                <OptionText>{option.modality}</OptionText>
                <OptionValue>
                  {option.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </OptionValue>
              </Option>
            );
          })
        }
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
