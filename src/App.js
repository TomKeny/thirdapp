import './App.css';
import { useEffect, useState } from 'react';
import ColourNum  from './ColourInfo';
import ColourBox from "./ColourBox"
import ColorSelect from './ColorSelect';


function App() {
  const [Color, setColor] = useState([])
  const [Colors,setColors] = useState([])
  const [PaletteNum,setPaletteNum] = useState(-1)
  const [Prompt, setPrompt] = useState(1)
  const [LightDark, setLightDark] = useState("")
  const [Hue, setHue] = useState(50)
  const [ContHeight, setContHeight] = useState([])
  const [error, setError] = useState(null)

  async function fetchColor() { // API link https://github.com/cheatsnake/xColors-api
    try {
      const url = 'https://x-colors.yurace.pro/api/random/' + Hue + "?number=" + Prompt + "&" + (LightDark != "" && ("type=" + LightDark));
      const response = await fetch(url, {mode: "cors"})
      console.log(response)
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json()
      let tempArr
      if (data.constructor === Array) {
        tempArr = [...Color,[...data]]
      }
      else {
        tempArr = [...Color,[data]]
      }
      setColor(tempArr)
      setPaletteNum(Color.length)
      setColors([...Colors, "hsl(" + Hue + " ,100% ,50%)"])
      
      
    } catch (err) {
      setError("could not fetch data")
      console.log(err.message)
    }
  }

  async function submitHandler (e) {
    e.preventDefault()
    await fetchColor()
    setContHeight([...ContHeight, Math.ceil(Number(Prompt) / 4)])
    setPrompt("")
  }

  // useEffect(function () {
  //   fetchColor(Prompt)
  // }, [])

  return (
    <div className="App">
      <div id="leftContainer">
        <div id="bigTitle">
          <h1 id="title">Colour Palette Generator</h1>
        </div>
        <div id="fromContainer">
          <ColourNum Prompt={Prompt} setPrompt={setPrompt} setLightDark={setLightDark} Hue={Hue} setHue={setHue} submitHandler={submitHandler} />
        </div>
      </div>
      {Color.length != 0 && <div id="colorsContainer" style={{aspectRatio: "4/" + ContHeight[PaletteNum]}}>
        {Colors.map(function(Colour,index) {
          return <ColorSelect Colour={Colour} setPaletteNum={setPaletteNum} index={index} length={Color.length}/>
        })}
        {Color[PaletteNum].map(function(color,index) {
          return <ColourBox color={color} />
        })}
      </div>}
    </div>
  );
}


export default App;
