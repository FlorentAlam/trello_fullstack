// import App from 'next/app'
import type { AppProps } from 'next/app';
import { FunctionComponent } from 'react';
import Header from '../components/Header';

import '../assets/style.scss';

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
    return (
      <>
        <Header/>
        <Component {...pageProps} />
      </>
    ) 
  }  
export default MyApp