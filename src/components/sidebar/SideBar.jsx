/* eslint-disable react/prop-types */

import {useLocation } from "react-router-dom"
import styles from "./styles/styles.module.css"
import { BiCalendar, BiHeart, BiNote, BiShare } from "react-icons/bi"
import NoteCard from "../noteCard/NoteCard"
import Modal from "../modal/Modal"
import { useState } from "react"
 
const SideBar = ({ blogTitle,likes }) => {

  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  async function handleShare() {

    const shareData = {
      title: blogTitle,
      text: `Check out this blog post: ${blogTitle}`,
      url: window.location.origin + location.pathname

    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      }
      catch (error) {
        console.log("Error sharing", error)
      }
    }
    else {
      navigator.clipboard.writeText(shareData.url).then(() => {
        alert("Link copied to clipboard")
      }, (err) => {
        alert("Link couldn't be copied", err)
      })
    }

  }

  function onClose() {
    setIsOpen(false)
  }

  return (
    <>
      <aside className={styles.sidebar_container} >

        {/* { user &&  <Link to={`/create-blog/${username}`}>
          <BiPlusCircle className={styles.icon} title="Create blog" />
        </Link>} */}
        <div className={styles.heart_container} >
          <BiHeart className={styles.heart} title="Like blog" />
          <p>{likes}</p>
        </div>
        <BiShare className={styles.share} title="Share blog" onClick={handleShare} />

        <BiNote className={styles.icon} title="Note your takeaway " onClick={() => setIsOpen(true)}>
        </BiNote>
        <BiCalendar className={styles.icon} title="Schedule review" />
      </aside>
      <Modal isOpen={isOpen} onClose={onClose}>
        <NoteCard onClose={onClose} isOpen={isOpen} />
      </Modal>
    </>
  )
}

export default SideBar
