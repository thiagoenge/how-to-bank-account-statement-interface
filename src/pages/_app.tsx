import type { AppProps } from "next/app";
import 'normalize.css/normalize.css';
import "src/styles/tokens.css";
import "src/styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
