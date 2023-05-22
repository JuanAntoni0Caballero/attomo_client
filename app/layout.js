import 'bootstrap/dist/css/bootstrap.min.css';
import 'globals.css'
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/page';


import dynamic from 'next/dynamic';

const DynamicBootstrap = dynamic(
  () => require('bootstrap/dist/js/bootstrap.min.js'),
  { ssr: false }
);

const RootLayout = ({ children }) => {

  return (
    <html lang="en">
      <body >
        <header>
          <title>Game Score Hub</title>
        </header>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout