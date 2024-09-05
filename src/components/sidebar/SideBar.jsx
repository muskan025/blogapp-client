/* eslint-disable react/prop-types */

import {useLocation } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useLikeBlogsMutation } from "../../reduxToolkit/slices/apiSlice"
import { BiCalendar, BiHeart, BiNote, BiShare } from "react-icons/bi"
import NoteCard from "../noteCard/NoteCard"
import Modal from "../modal/Modal"
import styles from "./styles/styles.module.css"
import Calendar from "../calendar/Calendar"
 
const SideBar = ({blog}) => {

  const [isOpen, setIsOpen] = useState(false)
  const [showCalendar,setShowCalendar] = useState(false)
  const {isAuth} = useSelector((state)=>state.userData)
  const location = useLocation()
  const {blogTitle,likesCount,notes,_id,userId} = blog
  const blogId = _id
  const username = userId.username
  const [likeBlogs, {isLikeLoading}] = useLikeBlogsMutation()


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

  async function handleLike(){
    try{
      await likeBlogs({blogId,username}).unwrap()
     }
   catch(error){
    toast.error("Something went wrong,please try again")
   }
}

  function checkLoginStatus(item){

    if(isAuth){
      item === "notes" ? setIsOpen(true) : handleLike()
    }
    else{
      toast.info(`Please login to add ${item}`)
    }
  }
  function onClose() {
    setIsOpen(false)
  }

  return (
    <>
      <aside className={styles.sidebar_container}>
       
         <div className={styles.heart_container} >
          <BiHeart className={styles.heart} title="Like blog" onClick={()=>checkLoginStatus('like')}/>
          <p>{likesCount}</p>
        </div>
        <BiShare className={styles.share} title="Share blog" onClick={handleShare} />

        <BiNote className={styles.icon} title="Note your takeaway" onClick={()=>checkLoginStatus('notes')}>
        </BiNote>
        
        <BiCalendar className={`${styles.icon} ${styles.calendar}`} title="Schedule review" onClick={()=>setShowCalendar(!showCalendar)} />
        {
        showCalendar && <Calendar isOpen={showCalendar}/>
        }
    
      </aside>
      <Modal isOpen={isOpen} onClose={onClose}>
        <NoteCard onClose={onClose} isOpen={isOpen} notes={notes} blogId={blogId}/>
      </Modal>
    </>
  )
}

export default SideBar
