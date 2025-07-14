import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { FormInput } from './components/FormInput'
import './index.css' 

function App() {

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card p-10">
        <FormInput
              label="Date Of Birth"
              placeHolder="mm/dd/yyyy"
              type="date"
              max={new Date().toISOString().split("T")[0]}
            />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
