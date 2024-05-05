import styled from "styled-components";

export const Input = styled.input`
  border-radius: 6px;
  border: 1px solid #dddddd;
  color: rgba(26, 7, 16, 0.79);
  width: 100%;
  height: 40px;
  margin-top: 16px;
  margin-bottom: 10px;
  transition: 1s linear all;

  &:focus {
    border: 2px solid #ef498f;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 56px;
  background-color: #ef498f;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;

  transition: 0.3s linear all;

  &:active {
    transform: scale(0.95);
  }

  &:hover {
    cursor: pointer;
  }
`;

export const Label = styled.p`
  font-size: 14px;
  color: #483c58;
`;