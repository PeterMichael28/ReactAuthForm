import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Register from './components/Register';
import Pages from './components/pages';

function App() {
  const [count, setCount] = useState(0)

  return (

    <main className="App">
      <Pages />
    </main>
  )
}

export default App
