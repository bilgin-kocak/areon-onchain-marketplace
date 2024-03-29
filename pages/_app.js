import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import Layout from '../components/layout';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useRouter } from 'next/router';
import { MetaMaskProvider } from 'metamask-react';
import Meta from '../components/Meta';
import UserContext from '../components/UserContext';
import { useRef } from 'react';
import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  embeddedWallet,
} from '@thirdweb-dev/react';

if (typeof window !== 'undefined') {
  require('bootstrap/dist/js/bootstrap');
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pid = router.asPath;
  console.log('router', router);
  const scrollRef = useRef({
    scrollPos: 0,
  });

  return (
    <>
      <Meta title="Home 1" />

      <Provider store={store}>
        <ThemeProvider enableSystem={true} attribute="class">
          <MetaMaskProvider>
            <ThirdwebProvider
              clientId="697a7a384ae2d203b5b7f321d1441087"
              // locale={en()}
              supportedWallets={[
                metamaskWallet({ recommended: true }),
                coinbaseWallet(),
                walletConnect(),
                embeddedWallet({
                  auth: {
                    options: ['email', 'google', 'apple', 'facebook'],
                  },
                }),
              ]}
            >
              {/* <ConnectWallet theme={'dark'} modalSize={'wide'} /> */}

              <UserContext.Provider value={{ scrollRef: scrollRef }}>
                {pid === '/login' ? (
                  <Component {...pageProps} />
                ) : (
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                )}
              </UserContext.Provider>
            </ThirdwebProvider>
          </MetaMaskProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
