function ColourBox ({ color }) {
    return (
    <div id="color" style={{backgroundColor: color.rgb}}>
            <p id="colorText">Hex: {color.hex}</p>
            <p id="colorText">{color.rgb}</p>
            <p id="colorText">{color.hsl}</p>
          </div>
          )
}

export default ColourBox