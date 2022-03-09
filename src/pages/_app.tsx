import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../context/AuthContext";
import UserContextProvider from "../context/UserContext";
import { theme } from "../styles/Theme";

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </UserContextProvider>
  );
}

export default MyApp;
