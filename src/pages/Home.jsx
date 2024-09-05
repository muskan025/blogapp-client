import BlogCards from "../components/blogCards/BlogCards"
import Carousel from "../components/carousel/Carousel"
import styles from "../styles/index.module.css"
import { useGetAllBlogsQuery } from "../reduxToolkit/slices/apiSlice"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAllBlogs } from "../reduxToolkit/slices/blogSlice"
 
const Home = () => {

  const {data:allBlogs, isLoading:blogLoading, error: blogError} = useGetAllBlogsQuery()
  const dispatch = useDispatch()

  console.log(allBlogs)
  useEffect(()=>{
    if (allBlogs) {
      dispatch(setAllBlogs(allBlogs));
   }
  },[allBlogs])

  if (blogLoading) {
    return <p>Loading...</p>;
  }

   if (blogError) {
    toast.error("Error fetching blogs");
  }

  const carouselData = allBlogs?.slice(0,5)
   return (
    <main className={styles.home}>
      <Carousel data={carouselData} />
      <BlogCards data={allBlogs} comp="home"/>
    </main>
  )
}

export default Home
