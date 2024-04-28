import styled from "styled-components";

const DisplayWrapper = styled.div`
  height: inherit;
  width: auto;
  background: #fff;
  padding: 30px;
  padding-left: 50px;
  padding-left: 50px;
`;

const HeaderWrapper = styled.div`
  background: #eaf6ff;
  width: auto;
  padding: 20px;
  border-radius: 6px;
`;

const FilterText = styled.span`
  display: flex;
  align-items: center;
  color: #3e2f4e;
  font-weight: 550;

  svg {
    padding-right: 4px;
    cursor: pointer;
  }
`;

const GridWrapper = styled.div`
  height: inherit;
  width: auto;
  background: red;
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const Filter = () => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z"
        fill="#000000"
      />
    </svg>
  );
};

function DisplayAnimals({ animals }) {
  return (
    <DisplayWrapper>
      <HeaderWrapper>
        <FilterText>
          <Filter />
          Filter
        </FilterText>
      </HeaderWrapper>
      <GridWrapper></GridWrapper>
    </DisplayWrapper>
  );
}

export default DisplayAnimals;
