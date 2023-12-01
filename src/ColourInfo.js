function ColourNum ({Prompt, setPrompt, setLightDark, Hue, setHue, submitHandler}) {
    
    
    return (

        <form onSubmit={submitHandler}>
            <label id="Color">
                <div id="textFormContainer">
                    <div id="Pallete">
                        <p className="formTextTitle" id="palleteTitle">Pallete size</p>
                        <input 
                        type="number" 
                        value={Prompt}
                        onChange={(e) => setPrompt(e.target.value)} 
                        min={1}
                        id="textBox"/>
                    </div>
                    <div id="Value">
                        <p className="formTextTitle" id="radioTitle">Value</p>
                        <div onChange={(e) => setLightDark(e.target.value)} id="radioButtons"> 
                            <br></br>
                            <label htmlFor="light" className="formText" id="radioValue">High Value</label>
                            <input type="radio" id="light" name="LightDark" value="light" className="radioButton"></input>
                            <br></br>
                            <label htmlFor="dark" className="formText" id="radioValue">Low Value</label>
                            <input type="radio" id="dark" name="LightDark" value="dark" className="radioButton"></input>
                            <br></br>
                            <label htmlFor="both" className="formText" id="radioValue">Any Value</label>
                            <input type="radio" id="both" name="LightDark" value="" className="radioButton"></input>
                        </div>
                        <p id="explainer">higher value is closer to white</p>
                    </div>
                </div>
                <h3 style={{color: "hsl(" + Hue + " ,100% ,50%)"}} id="hueTitle">Hue</h3>
                <input className="colourSlider" type="range" min="1" max="360" value={Hue} title="Hue" onChange={(e) => setHue(e.target.value)} 
                style={{backgroundColor: "hsl(" + Hue + " ,100% ,50%)"}}></input> <br></br>
                <input type="submit" id="Submit"/>
            </label>
        </form>
    )
}

export default ColourNum