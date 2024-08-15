import styled from "styled-components";

export const LoginContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #1c1c1c;
`;

export const LogoContainer = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 01); /* Borrão ao redor da borda */
`;

export const ContentContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;
