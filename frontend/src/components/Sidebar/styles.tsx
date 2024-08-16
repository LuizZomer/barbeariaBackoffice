import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100px;
  background-color: #1e1e1e;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
`;

export const LogoContainer = styled.div`
  padding: 20px 0;
`;

export const OptionsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const OneOptionContainer = styled.div<{ $isActive: boolean }>`
  opacity: 0.4;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ $isActive }) =>
    $isActive &&
    css`
      opacity: 1;
    `}

  &:hover {
    opacity: 1;
    transition: 0.5s;
    cursor: pointer;
  }
`;

export const Content = styled.div`
  margin: 0 10px 0 110px;
  width: 100%;
`;
