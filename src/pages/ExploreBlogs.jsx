import { InputField } from "../common/input/Form"
import styles from "../styles/index.module.css"
import BlogCards from "../components/blogCards/BlogCards"
import { useState } from "react"
import {useSelector} from "react-redux"

const ExploreBlogs = () => {

  const [niche,setNiche] = useState("")
  const allBlogs = useSelector((state)=>state.blogData.allBlogs)
  console.log(allBlogs)
 
  function handleInput(e) {
    setNiche(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    setNiche(e.target.value)
  }

  return (
    <main>
      <div className={styles.explore_blogs}>
      <form action="" className={styles.searchbar} onSubmit={handleSubmit}>
      <InputField type="text" name="niche" placeholder="Which niche interests you?" value={niche} onChange={handleInput}/>
      </form>
      <h1>Category:<span className={styles.niche_name}>{niche}</span></h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est itaque sit soluta dolorem voluptatum dolorum nobis, dolores numquam quidem unde!</p>
      </div>
            <BlogCards data={allBlogs}/>
    </main>
  )
}

export default ExploreBlogs
