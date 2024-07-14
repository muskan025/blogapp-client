/* eslint-disable react/prop-types */
import BlogCard from "../blogCard/BlogCard"
import styles from "./styles/styles.module.css"
import { blogs } from "../../../data"

const BlogCards = ({filter="food"}) => {

  // let filteredBlogs=[]
  // console.log("before if",filter)

  // if(filter){
  //   console.log("after if",filter)
  //     filteredBlogs = blogs.filter((blog)=> ( blog.niche === filter))
  // }
  // // else{
  // //   filteredBlogs = [...blogs]
  // // }

  // if(!filteredBlogs){
  //   console.log("no blogs")
  //   return <h1>No results found</h1>
  // }

  return (

    <section className={styles.card_grid}>

      {
        blogs.length > 0 && blogs.map((blog) => 
          {
            const {userId,blogId, blogImage, niche, blogTitle, textBody, username, date } = blog

       return <BlogCard key = {blogId} userId={userId} blogId={blogId} blogImage = { blogImage } niche = { niche } blogTitle = { blogTitle } textBody = { textBody } username = { username } date = { date } data={blog}/>
          })
      }

    </section>
  )
}

export default BlogCards
