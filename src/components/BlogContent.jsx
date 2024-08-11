import DOMPurify from 'dompurify';

export const BlogContent = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className="blog-content" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
  );
};

 
