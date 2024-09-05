import { useMemo, useRef, useState} from "react";
import Lottie from "lottie-react";
import { FileField, InputField } from "../../common/input/Form";
import popup from "../../assets/popup.json";
import styles from "./styles/styles.module.css";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useCreateBlogMutation, useUpdateBlogMutation, useUploadImgMutation } from "../../reduxToolkit/slices/apiSlice";
import { useLocation } from "react-router-dom";
const BlogEditor = () => {

  const [showPopup, setShowPopup] = useState(false);
  const {state} = useLocation()
 
const [blogContent, setBlogContent] = useState({
  title: state?.title || "",
  readTime: state?.readTime || "",
});
const [editorContent, setEditorContent] = useState(state?.textBody || "");
  const [thumbnail, setThumbnail] = useState({
    file: null,
    preview: null
  })
 
  const [upDateBlog, { isUpdateLoading }] = useUpdateBlogMutation()
  const [createBlog, { isLoading }] = useCreateBlogMutation()
  const [uploadImg] = useUploadImgMutation()
  const editorRef = useRef(null);


  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);

      // Replace with your own upload logic
      const response = await uploadImg(formData).unwrap()
      const url = `http://localhost:8000/${response.url}` ;
 
      const range = editorRef.current.getEditor().getSelection();
      editorRef.current.getEditor().insertEmbed(range.index, 'image', url);
    };
  };

   const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
        
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }), []);

 
  function handleImg(e) {
    const file = e.target.files[0];
    if (file) {
 
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload a JPEG, PNG, or GIF image.");
        return;
      }

      setThumbnail({
        file: file,
        preview: URL.createObjectURL(file)
      });
    }
  }

  function handleBlogContent(e) {
    const { name, value } = e.target

    setBlogContent((prev) => ({ ...prev, [name]: value }))
  }

  async function handlePublish(e) {

    e.preventDefault()

    const formData = new FormData();
    
    const unchangedThumbnail = state?.thumbnail && !thumbnail.file
    const unchangedTitle = state?.thumbnail === blogContent.title
    const unchangedReadTime = state?.readTime === blogContent.readTime
    const unchangedContent = state?.textBody ===  editorContent

    if(!unchangedThumbnail){

      if (!thumbnail.file) {
        toast.error("Please upload a thumbnail image.");
        return;
      }
      formData.append('file', thumbnail.file,thumbnail.file.name);
  
     }
      
    try {
      const response = !unchangedThumbnail && await uploadImg(formData).unwrap()

      const blogFormData = new FormData();
      if(response?.status === 200 || state){
        blogFormData.append('title', unchangedTitle ? state?.title : blogContent.title);
        blogFormData.append('readTime',unchangedReadTime ? state?.readTime : blogContent.readTime);
        blogFormData.append('textBody',unchangedContent ? state?.textBody : editorContent);
        blogFormData.append('thumbnail',unchangedThumbnail ? state?.thumbnail : response.url);
 
        const blogResponse = state ? await upDateBlog({
          data:blogFormData,
          blogId:state._id
        }).unwrap() : 
        await createBlog(blogFormData).unwrap()

        if (blogResponse.status === 201 || blogResponse.status === 200) {
           setShowPopup(true)
          toast.success("Whoah! You made a mark 🤩")
          setTimeout(() => { setShowPopup(false) }, 3000)
        } else {
          toast.error(blogResponse?.message || "Error creating blog post")
        }
      } else {
        toast.error(response?.message || "Error uploading image")
      }

      }
    catch (error) {
       toast.error("Something went wrong, please try again later")
    }
  
  }
 
  return (
    <div className={styles.editor_container}>
      
      {showPopup && (
         <div className={styles.popup_overlay}>
          <Lottie
            animationData={popup}
            loop={true}
            autoplay={true}
            className={styles.popup}
          />
          </div>
        )}
      
      <div className={styles.publish}>
      <button onClick={handlePublish}>{isLoading || isUpdateLoading ? 'Loading...' :( state ? 'Update' :'Publish')}</button>
      </div>
       
      <div className={styles.text_editor}>
        <form className={styles.header} encType="multipart/form-data">
          <div className={`${styles.thumbnail_container} ${thumbnail?.name !== '' ? styles.no_underline : ''}`}>
            <FileField name="thumbnail" placeholder="Add thumbnail here..." className={styles.create_blog_file} image={thumbnail.file} onChange={handleImg} />
          </div>
          {thumbnail?.preview && <img src={thumbnail?.preview} alt="Thumbnail Image" />}

          <div className={`${styles.title_container} ${thumbnail?.name !== '' ? styles.no_underline : ''}`}>
            <InputField type="text" name="title" placeholder=" Add title here..." className={styles.create_blog_file} onChange={handleBlogContent} value={blogContent.title}/>
          </div>

          <div className={`${styles.readtime_container} ${thumbnail?.name !== '' ? styles.no_underline : ''}`}>
            <InputField type="text" name="readTime" placeholder="Add read time in mins here..." onChange={handleBlogContent} value={blogContent.readTime} />
          </div>
        </form>

        <div className={`${styles.content} ${styles.quill_wrapper}`}>
          <ReactQuill
          ref={editorRef}
           modules={modules}
            theme="snow"
            placeholder="Content goes here..."
            onChange={setEditorContent}
            value={editorContent}
            formats={['font', 'header', 'bold', 'italic', 'underline', 'strike', 'color', 'background',
                    'script', 'blockquote', 'code-block', 'list', 'bullet', 'indent', 'align',
                    'link', 'image', 'video']}
          />
        </div>

      </div>
    </div>
  );
};

export default BlogEditor;



