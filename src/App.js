import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/index'
import Navigation from './components/Navigation/navigation'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [language, setLanguage] = React.useState(
    localStorage.getItem('language')
  )

  useEffect(() => {
    // watch change from localStorage
    window.addEventListener('storage', () => {
      setLanguage(localStorage.getItem('language'))
    })
  }, [language])
  return (
    <>
      <Navigation language={language} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              language={language}
              subtitle={language === 'en' ? 'The World' : 'El Mundo'}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App
