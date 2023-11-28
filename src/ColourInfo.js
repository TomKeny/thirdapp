export function ColourNum ({Prompt, setPrompt, setLightDark, Hue, setHue, submitHandler}) {
    
    
    return (

        <form onSubmit={submitHandler}>
            <label id="Color">
                        <p>Enter a number of colours to generate</p>
                        <input 
                        type="text" 
                        value={Prompt}
                        onChange={(e) => setPrompt(e.target.value)} 
                        id="textBox"/>
                        <p>Light or Dark or Both</p>
                        <div onChange={(e) => setLightDark(e.target.value)}>
                            <input type="radio" id="light" name="LightDark" value="light"></input>
                            <label htmlFor="light">Light</label>
                            <input type="radio" id="dark" name="LightDark" value="dark"></input>
                            <label htmlFor="dark">Dark</label>
                            <input type="radio" id="both" name="LightDark" value=""></input>
                            <label htmlFor="both">Both</label>
                        </div>
                        <h3 style={{color: "hsl(" + Hue + " ,100% ,50%)"}}>Hue</h3>
                        <input className="colourSlider" type="range" min="0" max="100" title="Hue" onChange={(e) => setHue(Math.floor((e.target.value/100) * 360))} 
                        style={{backgroundColor: "hsl(" + Hue + " ,100% ,50%)"}}></input> <br></br>
                        <input type="submit" id="Submit"/>
                    </label>
        </form>
    )
}