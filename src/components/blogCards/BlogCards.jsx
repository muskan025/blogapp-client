/* eslint-disable react/prop-types */
import BlogCard from "../blogCard/BlogCard"
import styles from "./styles/styles.module.css"
  
const BlogCards = ({filter="food", data,comp}) => {
 
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
        data?.length>0 && data?.map((blog) => 
          {
            const{_id,title,thumbnail,readTime,textBody,likesCount,userId,createdAt} = blog

            const createdAtDate = new Date(createdAt);
            const dateNum = createdAtDate.getDate();
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const month = monthNames[createdAtDate.getMonth()];
            const year = createdAtDate.getFullYear();
            const date = `${dateNum} ${month}, ${year}`
            const image = `http://localhost:8000/${thumbnail}`
            const profileImage = `http://localhost:8000/${userId.profileImg}`
            const blogData = {...blog, date,thumbnail:image}
 
       return <BlogCard key = {_id} user={userId} userId={userId._id} profileImg={profileImage} blogId={_id} blogImage = {image} niche ="productivity" blogTitle = { title } textBody = { textBody } username = { userId.username } date = {date} readTime={readTime} likes={likesCount} data={blogData} comp={comp}/>
          })
      }
 
    </section>
  )
}

export default BlogCards
