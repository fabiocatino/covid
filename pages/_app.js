import Layout from '../components/Layout/Layout';
import Head from 'next/head';
import '../styles/globals.css';
import { StyledEngineProvider } from '@mui/material/styles';
import StickyFooter from '../components/Layout/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <StyledEngineProvider>
      <Layout>
        <Head>
          <title>Covid19 Real Time Data</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
      <StickyFooter className="footer"></StickyFooter>
    </StyledEngineProvider>
  );
}

export default MyApp;
