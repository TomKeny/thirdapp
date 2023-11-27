import { useEffect } from "react"

export function Unmount () {
    
    useEffect(() => {
        console.log("mounted")
    },[])

    useEffect(() => {
        console.log("updated")
    })

    useEffect(() => {
        return function cleanup() {
            console.log("unmounted")
        }
    })

    return <h1>unmount example</h1>
}