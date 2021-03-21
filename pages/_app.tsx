// import App from 'next/app'
import type { AppProps } from 'next/app';
import { createContext, FunctionComponent, useState } from 'react';
import Header from '../components/Header';

import '../assets/style.scss';
import Flash from '../components/Flash';

export const MainContext = createContext(null);

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
    const [ ctx, updateCtx ] = useState({
      user: {
        isLogged: false,
        id: null
      },
      flash: {
        isError: false,
        message: ''
      }
    })

    const toggleContext = ( data ) => {
      updateCtx({ ...data });
      setTimeout(() => {
        updateCtx({...data, flash: { isError: false, message: ''}});
      }, 5500);
    }

    return (
      <MainContext.Provider value={{ ctx, toggleContext, updateCtx }}>

        <>
          <Flash/>
          <Header/>
          <Component {...pageProps} />
        </>
      </MainContext.Provider>
    ) 
  }  
export default MyApp