import { useLocation, useParams } from "react-router-dom"
import BlogCard from "../components/blogCard/BlogCard"
import styles from "../components/blogCard/styles/styles.module.css"
import SideBar from "../components/sidebar/SideBar"
import { blogs } from "../../data"
import ProfileCard from "../components/profileCard/ProfileCard"
import { useEffect, useState } from "react"

const SingleBlog = () => {

  const { blogId } = useParams()
  const location = useLocation()
  const [blog,setBlog] = useState(() => {
    return location.state || blogs.find(b => b.blogId === blogId) || {}
  })
  
 
  useEffect(()=>{
    if(Object.keys(blog).length === 0){
      //fetch blog with id
      const foundBlog = blogs.find(b => b.blogId === blogId);
      if (foundBlog) {
        setBlog(foundBlog); 
      } 
     }
  },[blogId])

  const { userId, blogImage, niche, blogTitle, textBody, username, date } = blog


  return (
    <main className={styles.single_blog}>
      <BlogCard image={false} blogHeader={true} excerpt={false} comp="single_blog" titleFont="28px" blogId={blogId} blogImage={blogImage} niche={niche} blogTitle={blogTitle} textBody={textBody} username={username} date={date} />


      <div className={styles.profile_card_sidebar}>
        <div className={styles.profile_card_container}>
          <ProfileCard articleCount={false} userId={userId} />
        </div>
        <SideBar blogTitle={blogTitle}/>
      </div>
    </main>
  )
}

export default SingleBlog

export const BlogExcerpt = () => {

  return (
    <div className={styles.blog_excerpt_container}>
       <p>
        Its sometimes her behavior are contented. Do listening am eagerness oh objection collected. Together gay feelings continue juvenile had off Unknown may service subject her letters one bed. Child years noise ye in forty. Loud in this in both hold. My entrance me is disposal bachelor remember relation
      </p>
      <p>
        Its sometimes her behavior are contented. Do listening am eagerness oh objection collected. Together gay feelings continue juvenile had off Unknown may service subject her letters one bed. Child years noise ye in forty. Loud in this in both hold. My entrance me is disposal bachelor remember relation
      </p>
      <p>
        Its sometimes her behavior are contented. Do listening am eagerness oh objection collected. Together gay feelings continue juvenile had off Unknown may service subject her letters one bed. Child years noise ye in forty. Loud in this in both hold. My entrance me is disposal bachelor remember relation
      </p>
      <p>
        Its sometimes her behavior are contented. Do listening am eagerness oh objection collected. Together gay feelings continue juvenile had off Unknown may service subject her letters one bed. Child years noise ye in forty. Loud in this in both hold. My entrance me is disposal bachelor remember relation
      </p>
      <p>
        Its sometimes her behavior are contented. Do listening am eagerness oh objection collected. Together gay feelings continue juvenile had off Unknown may service subject her letters one bed. Child years noise ye in forty. Loud in this in both hold. My entrance me is disposal bachelor remember relation
      </p>
      <p>
        Its sometimes her behavior are contented. Do listening am eagerness oh objection collected. Together gay feelings continue juvenile had off Unknown may service subject her letters one bed. Child years noise ye in forty. Loud in this in both hold. My entrance me is disposal bachelor remember relation
      </p>
      <p>
        Its sometimes her behavior are contented. Do listening am eagerness oh objection collected. Together gay feelings continue juvenile had off Unknown may service subject her letters one bed. Child years noise ye in forty. Loud in this in both hold. My entrance me is disposal bachelor remember relation
      </p>
    </div>
  )
}