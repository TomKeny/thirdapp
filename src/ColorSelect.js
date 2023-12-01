function ColorSelect ({Colour, setPaletteNum, index, length}) {

    return (
        <div id="colorSelector" style={{backgroundColor: Colour, width: 100/length + "%"}} onClick={() => setPaletteNum(index)}>
            <p id="selectorText">{index + 1}</p>
        </div>
    )
}

export default ColorSelect