import { useState } from "react"

export const useForm = (initialForm) => {
  

    const [formState, setFormState] = useState(initialForm);



    const onInputChange = ({target}) => {

        const {name, value} = target;

        setFormState({
            ...formState,
            [name]:value
        })


    }
    // console.log(Object.entries())
  


    const onResetForTable = () =>{
        setFormState({
            ...formState,
            s:"",
            ev:""
        })
    }
  
    return {
        ...formState,
        onInputChange,
        onResetForTable
    }
    
}
