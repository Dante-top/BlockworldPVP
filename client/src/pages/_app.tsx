import '../scss/root.scss'
import { useMemo } from "react";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

let WALLETS: any = {
  getPhantomWallet: () => ({ name: 'Phantom' }),
};

const App = ({ Component, pageProps }: any) => {

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined
      }}
    >
      <Component  {...pageProps} />
    </GoogleReCaptchaProvider>

  );
};


export default App