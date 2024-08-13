import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./router";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <AppRouter />
      <GlobalStyle />
    </ChakraProvider>
  </StrictMode>
);
