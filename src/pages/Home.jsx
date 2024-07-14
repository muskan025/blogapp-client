import BlogCards from "../components/blogCards/BlogCards"
import Carousel from "../components/carousel/Carousel"
import styles from "../styles/index.module.css"
 
const Home = () => {
  return (
    <main className={styles.home}>
      <Carousel/>
      <BlogCards/>
    </main>
  )
}

export default Home
