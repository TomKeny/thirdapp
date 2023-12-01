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

  async function fetchColor() { // API info link https://github.com/cheatsnake/xColors-api
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

  function SortDescValue() {
    let tempArr = [...Color[PaletteNum]]
    let sortArr = []
    let sortNum = []
    for (let i = 0; i < tempArr.length; i++) {
      sortArr.unshift(tempArr[i])
      sortNum.unshift(GetValue(tempArr[i].hsl))
      for (let x = 0; x < sortNum.length; x++) {
        if (sortNum[x] > sortNum[x + 1]) {
          let temp1 = sortNum[x]
          let temp2 = sortArr[x]
          sortNum[x] = sortNum[x + 1]
          sortArr[x] = sortArr[x + 1]
          sortNum[x + 1] = temp1
          sortArr[x + 1] = temp2
        }
      }
    }
     let arr = [...Color]
     arr[PaletteNum] = sortArr
     setColor(arr)
  }

  function SortAscValue() {
    let tempArr = [...Color[PaletteNum]]
    let sortArr = []
    let sortNum = []
    for (let i = 0; i < tempArr.length; i++) {
      sortArr.unshift(tempArr[i])
      sortNum.unshift(GetValue(tempArr[i].hsl))
      for (let x = 0; x < sortNum.length; x++) {
        if (sortNum[x] < sortNum[x + 1]) {
          let temp1 = sortNum[x]
          let temp2 = sortArr[x]
          sortNum[x] = sortNum[x + 1]
          sortArr[x] = sortArr[x + 1]
          sortNum[x + 1] = temp1
          sortArr[x + 1] = temp2
        }
      }
    }
     let arr = [...Color]
     arr[PaletteNum] = sortArr
     setColor(arr)
  }

  function GetValue(string) {
    let tempNum = []
    for (let i = 5; i > 2; i--) {
        if (!isNaN(Number(string[string.length-i]))) {
            tempNum.push(string[string.length-i])
        }
    }
    return Number(tempNum.join(""))
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
        <button onClick={() => SortDescValue()}>sort desc</button>
        <button onClick={() => SortAscValue()}>sort asc</button>
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
