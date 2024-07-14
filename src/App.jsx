
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './common/footer/Footer'
import Header from './common/header/Header'
import { useEffect } from 'react';

function App() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
