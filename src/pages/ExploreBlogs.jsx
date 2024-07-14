import { InputField } from "../common/input/Form"
import styles from "../styles/index.module.css"
import {blogs} from "../../data"
import BlogCards from "../components/blogCards/BlogCards"
import { useState } from "react"
  
const ExploreBlogs = () => {

  const [niche,setNiche] = useState("")
 
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
      <InputField type="text" name="niche" placeholder="Which niche interests you?" value={niche} handleInput={handleInput}/>
      </form>
      <h1>Category:<span className={styles.niche_name}>{niche}</span></h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est itaque sit soluta dolorem voluptatum dolorum nobis, dolores numquam quidem unde!</p>
      </div>
            <BlogCards filter={niche}/>
    </main>
  )
}

export default ExploreBlogs
