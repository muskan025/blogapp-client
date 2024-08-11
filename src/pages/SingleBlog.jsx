import {useLocation} from "react-router-dom"
import BlogCard from "../components/blogCard/BlogCard"
import styles from "../components/blogCard/styles/styles.module.css"
import SideBar from "../components/sidebar/SideBar"
import ProfileCard from "../components/profileCard/ProfileCard"
 
const SingleBlog = () => {

  const  {state} = useLocation()
  const{_id,title,thumbnail,readTime,textBody,likesCount,userId,date} = state
  const profileImage = `http://localhost:8000/${userId.profileImg}`
 console.log(userId)
  return (
    <main className={styles.single_blog}>
      <BlogCard image={false} blogHeader={true} excerpt={false} comp="singleBlog" profileImg={profileImage} titleFont="28px" blogId={_id} blogImage={thumbnail} niche={"productivity"} blogTitle={title} textBody={textBody} username={userId.username} date={date} likes={likesCount} readTime={readTime}/>

      <div className={styles.profile_card_sidebar}>
        <div className={styles.profile_card_container}>
          <ProfileCard articleCount={false} user={userId} />
        </div>
        <SideBar blogTitle={title} likes={likesCount}/>
      </div>
    </main>
  )
}

export default SingleBlog

export const BlogExcerpt = () => {

  return (
    <div className={styles.blog_excerpt_container}>
      <p>
      behavior are contented. Do listening am eagerness oh objection collected. Together gay feelings continue juvenile had off Unknown may service subject her letters one bed. Child years noise ye in forty. Loud in this in both hold. My entrance me is disposal bachelor remember relation
      </p>
    </div>
  )
}