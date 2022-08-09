import styled from "styled-components";

export const Top = styled.div`
  margin: 5rem 0 1rem 0;
  .content {
    display: flex;
    width: 70vw;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    .title {
      display: flex;
      flex-direction: column;
      .main {
        font-size: 2rem;
        font-weight: bold;
      }
    }
    .priceBtn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      transition: background-color 0.1s ease-in;
      &:hover {
        cursor: pointer;
        background-color: $bg-gray-200;
      }
      &:active {
        background-color: $bg-gray-300;
      }
      .price {
        font-size: 2rem;
        font-weight: bold;
      }
      .triangle {
        margin: 0.5rem 0 0 1rem;
      }
    }
    @media only screen and (max-width: 740px) {
      flex-direction: column;
      align-items: flex-start;
      .priceBtn {
        padding: 0;
        margin-top: 1rem;
      }
    }
  }
`;

export const Preview = styled.div`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  position: relative;
  height: 40vh;
  width: 100%;
`;

export const Bottom = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem 0;
  .content {
    width: 70vw;
    margin: 0 auto;

    .top-description {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 3rem;
      margin-bottom: 1rem;
      .call-to-action {
        a {
          display: flex;
          align-items: center;
          padding: 1rem 3rem;
          background-color: ${({ theme }) => theme.palette.common.black};
          border-radius: 1rem;
          text-decoration: none;
          span {
            color: white;
            font-weight: bold;
            font-size: 1.7rem;
            margin-right: 2rem;
          }
        }
      }
      .details {
        display: flex;
        flex-wrap: wrap;
        margin: 1rem auto;
        .detail {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 1rem 1rem;
          background-color: ${({ theme }) => theme.palette.primary.main};
          width: 8rem;
          height: 8rem;
          border-radius: 1rem;
        }
      }
    }
  }
`;

export const CloseImmersiveBtn = styled.button`
  position: absolute;
  z-index: 1;
  right: 2rem;

  @media only screen and (max-height: 750px) {
    top: 2rem;
  }
`;

export const ActionCard = styled.div`
  margin: 2rem 3rem;
  .separator {
    width: 100%;
    border-top: solid 1px black;
    margin: 2rem 0;
  }
  table {
    width: 100%;
    .tdRight {
      float: right;
    }
    .tdTotal {
      float: right;
      font-size: 2rem;
      font-weight: bold;
    }
  }
`;
