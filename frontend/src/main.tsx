import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./router";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/Auth/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <AuthProvider >
        <AppRouter />
        <GlobalStyle />
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>
);
