import { useState, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import Lottie from "lottie-react";
import { FileField, InputField } from "../../common/input/Form";
import  popup from "../../assets/popup.json";
import styles from "./styles/styles.module.css";

const BlogEditor = () => {
  const [image, setImage] = useState({ preview: null, name: '' });
  const [content, setContent] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const editorRef = useRef(null);

  function handleImg(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({
          preview: reader.result,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    } else {
      setImage({ preview: null, name: '' });
    }
  }

  function handleEditorChange(content, editor) {
    setContent(content);
  }

  function handlePublish(){
    setShowPopup(true)

    setTimeout(()=>{ setShowPopup(false)},3000)
  }

  return (
    <div  className={styles.editor_container}>
      <div className={styles.publish}>
      {showPopup && (
          <Lottie
            animationData={popup}
            loop={true}
            autoplay={true}
            // Adjust size as needed
            className={styles.popup}
          />
        )}
      <button onClick={handlePublish}>Publish</button>
      </div>
      <div className={styles.text_editor}>
       
      <form className={styles.header}>
        <div className={`${styles.thumbnail_container} ${image.name !== '' ? styles.no_underline : ''}`}> 
          <FileField name="thumbnail" placeholder="Add thumbnail here..." className={styles.create_blog_file} image={image} onChange={handleImg}/>
        </div>
        {image.preview && <img src={image.preview} alt="Thumbnail Image" />}

        <div className={`${styles.title_container} ${image.name !== '' ? styles.no_underline : ''}`}> 
          <InputField type="text" name="title" placeholder="Add title here..." className={styles.create_blog_file} />
        </div>

        <div className={`${styles.readtime_container} ${image.name !== '' ? styles.no_underline : ''}`}>
          <InputField type="text" name="readTime" placeholder="Add blog read time here..." />
        </div>
      </form>

      <div className={styles.content}>
        <Editor className={styles.tinyMCEEditor}
          onInit={(evt, editor) => editorRef.current = editor}
          apiKey='ynmpsk1bkjymwd7m13anncmo5e0rwimyy2k8nrwhkv30m9na'
          init={{
            height: 500,
            menubar: false,
            selector: 'textarea',
            ui_mode: 'split',
            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            content_style: `
            body {
              font-family: Helvetica, Arial, sans-serif;
              font-size: 14px;
              background-color: #1e1e1e;
              color: #e0e0e0;
            }
          `,
          }}
          value={content}
          onEditorChange={handleEditorChange}
        />
      </div>
    </div>
    </div>
  );
};

export default BlogEditor;



  {/* <textarea name="textBody" 
         value={content}
          onChange={handleContentChange}
          placeholder="Write your content here..."
          className={styles.content_textarea} autoFocus></textarea> */}  {/* <textarea name="textBody" 
         value={content}
          onChange={handleContentChange}
          placeholder="Write your content here..."
          className={styles.content_textarea} autoFocus></textarea> */}