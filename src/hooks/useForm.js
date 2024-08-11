import { useState } from "react"

export const useForm = (initialState) => {
    const [formData, setFormData] = useState(initialState)
    const [errors, setErrors] = useState(initialState)
    const [image, setImage] = useState(null)   


    function handleChange(e) {

        console.log("inside change hook");
        
        setErrors(initialState)
        const { name, value, files, type } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }))
        
    }

    function handleImage(e) {
        console.log("inside image hook");
        const file = e.target.files[0];

          setImage({
            file: file,
            preview: URL.createObjectURL(file)
          });
        
      }

    function resetForm() {
        setFormData(initialState)
        setImage(null) 
    }

    return { formData,handleChange, resetForm, errors, setErrors, image, handleImage }  
}