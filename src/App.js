import './App.css';
import { useEffect, useState } from 'react';
import  ColourNum  from './ColourInfo';
import ColourBox from "./ColourBox"


function App() {
  const [Color, setColor] = useState([])
  const [Prompt, setPrompt] = useState("")
  const [LightDark, setLightDark] = useState("")
  const [Hue, setHue] = useState(50)
  const [ContHeight, setContHeight] = useState(0)
  const [error, setError] = useState(null)

  async function fetchColor() { // API link https://github.com/cheatsnake/xColors-api
    try {
      const url = 'https://x-colors.yurace.pro/api/random/' + Math.floor((Hue/100) * 360) + "?number=" + Number(Prompt) + "&" + (LightDark != "" && ("type=" + LightDark));
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
    setContHeight(Math.ceil(Number(Prompt) / 4))
    setPrompt("")
  }

  // useEffect(function () {
  //   fetchColor(Prompt)
  // }, [])

  return (
    <div className="App">
      <div id="leftContainer">
        <div id="bigTitle">
          <h1 id="title">Colour Pallete Generator</h1>
        </div>
        <div id="fromContainer">
          <ColourNum Prompt={Prompt} setPrompt={setPrompt} setLightDark={setLightDark} Hue={Hue} setHue={setHue} submitHandler={submitHandler} />
        </div>
      </div>
      {Color.length != 0 && <div id="colorsContainer" style={{aspectRatio: "4/" + ContHeight}}>
        {Color.map(function(color,index) {
          return <ColourBox color={color} />
        })}
      </div>}
    </div>
  );
}


export default App;
