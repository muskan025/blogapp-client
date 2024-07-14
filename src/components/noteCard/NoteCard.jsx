/* eslint-disable react/prop-types */
import { useState} from "react"
import { BsPen,BsX } from "react-icons/bs"
import styles from "./styles/styles.module.css"

const NoteCard = ({isOpen,onClose}) => {
    const [note, setNote] = useState("")
 
    const handleNoteChange =  (e) => {
        setNote(e.target.value)
    }  

    return (
             <div className={`${styles.notepad_container} ${!isOpen ? styles.close_notepad:''}`}>
            <div className={styles.header}>
                <h3>Notes</h3>
                <div className={styles.icons}>
                <span className={styles.edit} onClick={onClose}><BsPen title="Edit" /></span>
                <span className={styles.close} onClick={onClose}><BsX title="Close"/></span>
                </div>
            </div>
            <textarea 
                className={styles.notepad} 
                name="note" 
                value={note} 
                onChange={handleNoteChange}
                placeholder="Capture insights for a rewarding read!"
            ></textarea>
        </div>
       
    )
}

export default NoteCard