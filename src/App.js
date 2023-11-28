import './App.css';
import { useEffect, useState } from 'react';
import { ColourNum } from './ColourInfo';


function App() {
  const [Color, setColor] = useState([{rgb: "rgb(0,0,0)"}])
  const [Prompt, setPrompt] = useState("")
  const [LightDark, setLightDark] = useState("")
  const [Hue, setHue] = useState(1)
  const [error, setError] = useState(null)

  async function fetchColor() { // API link https://github.com/cheatsnake/xColors-api
    try {
      const url = 'https://x-colors.yurace.pro/api/random/' + Hue + "?number=" + Number(Prompt) + "&" + (LightDark != "" && ("type=" + LightDark));
      const response = await fetch(url, {mode: "cors"})
      console.log(response)
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json()
      if (Number(Prompt) > 1) {
        setColor([...data])
      }
      else {
        setColor([data])
      }
      
    } catch (err) {
      setError("could not fetch data")
      console.log(err.message)
    }
  }

  async function submitHandler (e) {
    e.preventDefault()
    await fetchColor()
    setPrompt("")
  }

  useEffect(function () {
    fetchColor(Prompt)
  }, [])

  return (
    <div className="App">
      <ColourNum Prompt={Prompt} setPrompt={setPrompt} setLightDark={setLightDark} Hue={Hue} setHue={setHue} submitHandler={submitHandler} />
      {Color.map(function(color,index) {
        return <div id="color" style={{backgroundColor: color.rgb}}>
          <p id="colorText">Hex: {color.hex}</p>
          <p id="colorText">rgb: {color.rgb}</p>
          <p id="colorText">hsl: {color.hsl}</p>
        </div>
      })}
    </div>
  );
}


export default App;
