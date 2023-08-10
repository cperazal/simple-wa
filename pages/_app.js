import '@/styles/globals.css'
import ReactGA from 'react-ga4';

ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);


export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
