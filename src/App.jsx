import { useState, useEffect } from 'react'
import './App.css'
import Dashboard from './components/Dashboard';

function App() {
  const [count, setCount] = useState(10)

  const handleButtonClick = (event) => {
    console.log("INSIDE EVENT HANDLER", event);
    setCount(count + 1);
  }

  useEffect(() => {
    console.log("INSIDE USE-EFFECT OF APP");
  }, [])

  return (
    <>
      <div>
        <Dashboard title={"TITOLO DELLA DASHBOARD"} subtitle={"SOTTOTITOLO DELLA DASHBOARD"} />
        Il nuovo valore di count è {count}
        <br />
        <button onClick={(event) => handleButtonClick(event)}>Incrementa</button>
      </div>
    </>
  )
}

export default App
