import { useEffect } from "react"

export function Movies ({toggle, changeToggle}) {
    // useEffect(() => {
    //     console.log("componentDidMount")
    // }, [])
    // useEffect(() => {
    //     console.log("componentDidUpdate")
    // })

    return (<>
        <button onClick={() => changeToggle()}>toggle</button>
        <h1>{toggle ? "True":"False"}</h1>
        </>
    )
  }