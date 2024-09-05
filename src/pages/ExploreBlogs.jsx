import { InputField } from "../common/input/Form"
import styles from "../styles/index.module.css"
import BlogCards from "../components/blogCards/BlogCards"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useGetAllBlogsQuery } from "../reduxToolkit/slices/apiSlice"
import { useLocation } from "react-router-dom"

const ExploreBlogs = () => {

  const {state} = useLocation()
  const passedNiche = state
  const [niche, setNiche] = useState("")
  const { data: allBlogs, isLoading: blogsLoading, error: blogError } = useGetAllBlogsQuery()
  const [filteredBlogs,setFilteredBlogs] = useState([])

  function handleInput(e) {
    setNiche(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()   
}

function filterBlogs(searchTerm) {
   
  const filtered = allBlogs.filter((blog) => {
  
    const blogNiche = blog.userId.niche.toLowerCase()
    const searchTermLower = searchTerm.toLowerCase()
    
    return blogNiche.includes(searchTermLower) || 
           searchTermLower.includes(blogNiche)
  })
  
  setFilteredBlogs(filtered)
}
 
useEffect(() => {
  if (allBlogs) {
    const query = passedNiche ? passedNiche : niche
     filterBlogs(query)
  }
}, [allBlogs, niche])

  if(blogError){
    return <p>Something went wrong,please refresh</p>
  }
  if (blogsLoading) {
    return <p>Loading...</p>
  }

  return (
    <main>
      <div className={styles.explore_blogs}>
        <form className={styles.searchbar} onSubmit={handleSubmit}>
          <InputField type="text" name="niche" placeholder="Which niche interests you?" value={niche} onChange={handleInput} />
        </form>
       <div className={styles.explore_content}>
       <h1>Category:<span className={styles.niche_name}>{filteredBlogs.length<=0 ? 'No niche found' : (passedNiche ? passedNiche :niche)}</span></h1><br></br>
        <p>Every story matters. Dive into our diverse community and let your creativity flourish.<br/> As you engage here, watch your influence grow—not just on our platform, but across your entire digital world.<br/>
        Join us and amplify your voice. From our community to the global stage, turn your passion into a thriving online presence.<br/> Your journey to digital influence starts here. <br/>
        <b>Check out these blogs to kickstart your creativity!</b></p>
       </div>
      </div>
      <BlogCards data={filteredBlogs} niche={niche} />
    </main>
  )
}

export default ExploreBlogs
