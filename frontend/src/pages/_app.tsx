import { type AppType } from "next/dist/shared/lib/utils";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import "~/styles/globals.css";

import { ChakraProvider } from '@chakra-ui/react'

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
          <Component {...pageProps} />;
        </ChakraProvider>
    </QueryClientProvider> 
  )
 
};

export default MyApp;
