/* eslint-disable react/prop-types */
import { BiImageAdd } from "react-icons/bi"
import styles from "./styles/styles.module.css"
 
export const FormName = ({name})=>{
  return (
    <>
    <h2 className={styles.name}>{name}</h2>
    </>
  )
}

export const InputField = ({type,name,placeholder,value,handleInput,className}) => {
 
  return (
    <input className={`${styles.input} ${className ? styles.create_blog_file : ''}`} type={type} name={name} value={value} placeholder={placeholder} onChange={handleInput} />
  )
}

export const FileField = ({name,placeholder,className,onChange,image}) => {

  return (
    <div className={`${styles.file_input_container} ${styles.input} ${className ? styles.create_blog_file : ''}`}>
    <input type="file" name={name} className={styles.file_input} placeholder={placeholder} onChange={onChange} accept="image/*"/>

    <label htmlFor="profileImage" className={`${styles.file_input_label}`}><BiImageAdd className={styles.image_icon}/>{image?.name  ? 'Change Image' : placeholder}</label>
    
  </div>
  
  )
}

export const Button = ({name,width})=>{
  return (
    <button className={styles.name} style={{"width":`${width}`}}>{name}</button>
  )
}
