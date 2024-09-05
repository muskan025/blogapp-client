/* eslint-disable react/prop-types */
import styles from "./styles/styles.module.css";
import BannerImage from "../BannerImage";
import aboutUs from '../../assets/about_us.jpg'
import { BiHeart, BiShare, BiDotsHorizontalRounded} from "react-icons/bi";
import { Link } from "react-router-dom";
import { AboutExcerpt } from "../../pages/AboutUs";
import { useState } from "react";
import { BsPen, BsTrash } from "react-icons/bs";
import { BlogContent } from "../BlogContent";
import { useDeleteBlogMutation, useLikeBlogsMutation } from "../../reduxToolkit/slices/apiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const BlogCard = ({ image = true, blogHeader = true, comp,user, titleFont,profileImg, blogId, blogImage, niche, blogTitle, textBody, username, date,likes, readTime,data }) => {

  const [showMore,setShowMore] = useState(false)
  const [likeBlogs] = useLikeBlogsMutation() 
  const [deleteBlog] = useDeleteBlogMutation() 
  const {author,isAuth} = useSelector((state)=>state.userData)
  const isOwnProfile = isAuth && author?.username === username;

  async function handleLike(){
      try{
      await likeBlogs({blogId,username}).unwrap()
      }
     catch(error){
      toast.error("Something went wrong,please try again")
     }
  }

  async function handleShare() {
    const shareData = {
      title: blogTitle,
      text: `Check out this blog post: ${blogTitle}`,
      url: window.location.origin + location.pathname
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      }
      catch (error) {
        console.log("Error sharing", error)
      }
    }
    else {
      navigator.clipboard.writeText(shareData.url).then(() => {
        alert("Link copied to clipboard")
      }, (err) => {
        alert("Link couldn't be copied", err)
      })
    }

  }

  async function handleDelete(){
    try {
      const response = await deleteBlog(blogId).unwrap()
       if(response.status !== 200) toast.error(response.message)
         
    } catch (error) {
      toast.error("Something went wrong,please try again")
    }
  }
    return (
    <div className={styles.masonry_item}>
      {
        image ? (<div className={styles.blog_img_container}>
          <Link to={`/blog/${blogId}`} state={data}>
            <img src={blogImage} alt="Blog Image" className={styles.blog_img} />
          </Link>
        </div>) : (comp === "singleBlog" ? <BannerImage image={blogImage} blogId={blogId} /> : (<BannerImage image={aboutUs} />))
      }
      {
        blogHeader && <div className={styles.blog}>
          <div className={styles.niche__interactive_container}>
          <Link to={`/explore-blogs`} state={niche}><p className={styles.niche}>{niche}</p></Link>
            {
             ( comp === "home" || comp === "profile") && <ul className={styles.interactive_container}>
                { comp === "profile" && isOwnProfile && <li onClick={()=> setShowMore(!showMore)} className={styles.showmore_container}>
                  <BiDotsHorizontalRounded /> 
                    {showMore && <ul>
                    <li>
                      <BsPen /> 
                       <Link to={`/create-blog/${username}`} state={data}>Edit</Link> 
                      </li>
                    <li className={styles.delete}>
                       <BsTrash /> 
                      <span onClick={handleDelete}>Delete</span>
                      </li>
                  </ul>
                    }
                  
                </li>
                }
                <li>
                  <BiHeart className={styles.heart} onClick={handleLike} />
                  <span>{likes}</span>
                </li>
                <li>
                  <BiShare className={styles.share} onClick={handleShare}/>
                </li>

              </ul>
            }
          </div>
          {comp !== 'singleBlog' ? <Link to={`/blog/${blogId}`} state={data} className={styles.title_container}>
            <h1 className={styles.title} style={`${titleFont}` && { "fontSize": `${titleFont}` }}>
              {blogTitle}
            </h1>
          </Link>:
           <h1 className={styles.title} style={`${titleFont}` && { "fontSize": `${titleFont}` }}>
           {blogTitle}
         </h1>
         }
          {comp !== "singleBlog" && 
          <p className={styles.info}>
            <BlogContent content={textBody}/>
          </p>
          }

            <UserDetails  username={username} profileImg={profileImg} date={date} comp={comp} readTime={readTime} user={user}/>
          
        </div>
      }
      {
        comp === "singleBlog" ? <BlogContent content={textBody} /> : comp === "about" && <AboutExcerpt />
      }
    </div>
  );
};


export const UserDetails = ({username, profileImg,date, comp,readTime,user }) => {

  return (
    <div className={styles.blogger_details}>
    <div className={styles.profile_img}>
    <Link to={`/profile/${username}`} state={user}>
      <img src={profileImg} alt="Profile Image" />
      <span className={styles.blogger_name}>{username}</span>
    </Link>
  </div>
            <div>
              <span className={styles.dot_one}></span>
              <span className={styles.date}>{date}</span>
              {(comp === "singleBlog" || comp === "carousel") &&
                <>
                  <span className={styles.dot}></span>
                  <span className={styles.read_time}>{readTime}</span>
                </>
              }
            </div>
            </div>

  )
}
export default BlogCard;
