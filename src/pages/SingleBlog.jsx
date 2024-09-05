import { useLocation } from "react-router-dom"
import BlogCard from "../components/blogCard/BlogCard"
import styles from "../components/blogCard/styles/styles.module.css"
import SideBar from "../components/sidebar/SideBar"
import ProfileCard from "../components/profileCard/ProfileCard"
import { useGetAllBlogsQuery } from "../reduxToolkit/slices/apiSlice"

const SingleBlog = () => {

  const { state } = useLocation()
   const { data: blog, isLoading, isError } = useGetAllBlogsQuery(undefined, {
    selectFromResult: (result) => ({
        data: result.data?.find(blog => blog._id === state?._id)
    })
  });
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading blog post</div>
  }

  const { _id, title, thumbnail, readTime, textBody, likesCount, userId } = blog
  const thumbnailImage = `http://localhost:8000/${thumbnail}`
  const profileImage = `http://localhost:8000/${userId.profileImg}`

  return (
    <main className={styles.single_blog}>
      <BlogCard image={false} blogHeader={true} excerpt={false} comp="singleBlog" profileImg={profileImage} titleFont="28px" blogId={_id} blogImage={thumbnailImage} niche={userId.niche} blogTitle={title} textBody={textBody} username={userId.username} date={state.date} likes={likesCount} readTime={readTime} user={userId} />

      <div className={styles.profile_card_sidebar}>
        <div className={styles.profile_card_container}>
          <ProfileCard articleCount={false} user={userId} />
        </div>
        <SideBar blogTitle={title} likes={likesCount} blog={blog} />
      </div>
    </main>
  )
}

export default SingleBlog
