import { useState } from "react"

export default (initialState, onSubmit) => {

    const [inputs, setInputs] = useState(initialState)

    const subscribe = field => value => {
        setInputs({ ...inputs, [field]: value }) //creo copia de inputs, les paso el valor del campo en cuestion
        console.log(inputs) //{email: "wmigue", password: "0"} cambia a medida que escribo
    }
   
    const handleSubmit = () => {
        onSubmit(inputs) // ejecuto funcion onsubmit cuando presiono boton enviar.
    }

    return { subscribe, handleSubmit, inputs }
}