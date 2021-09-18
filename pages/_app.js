import Layout from '../components/Layout/Layout';
import Head from 'next/head';
import '../styles/globals.css';
import { StyledEngineProvider } from '@mui/material/styles';

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
        </Head>
        <Component {...pageProps} />
      </Layout>
    </StyledEngineProvider>
  );
}

export default MyApp;