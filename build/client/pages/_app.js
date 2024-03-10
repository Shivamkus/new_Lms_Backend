"use strict";
// import type { AppProps } from 'next/app'
// import { QueryClient, QueryClientProvider } from 'react-query';
// const queryClient = new QueryClient();
Object.defineProperty(exports, "__esModule", { value: true });
// export default function MyApp({ Component, pageProps }: AppProps) {
//   // return <Component {...pageProps} />
//       return <QueryClientProvider client={queryClient}>
//       <Component {...pageProps} />
//     </QueryClientProvider>
// }
// _app.tsx
const react_query_1 = require("react-query");
const devtools_1 = require("react-query/devtools");
const hydration_1 = require("react-query/hydration");
const queryClient = new react_query_1.QueryClient();
function MyApp({ Component, pageProps }) {
    return (<react_query_1.QueryClientProvider client={queryClient}>
      <hydration_1.Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps}/>
      </hydration_1.Hydrate>
      <devtools_1.ReactQueryDevtools />
    </react_query_1.QueryClientProvider>);
}
exports.default = MyApp;
