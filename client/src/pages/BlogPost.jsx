import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const BlogPost = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await axios.get(`/api/blogs/${id}`);
                setBlog(data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) return <div className="container" style={{ marginTop: '2rem' }}>Loading article...</div>;
    if (!blog) return <div className="container" style={{ marginTop: '2rem' }}>Article not found.</div>;

    return (
        <div className="container" style={{ padding: '2rem 20px', maxWidth: '800px' }}>
            <Link to="/blog" style={{ color: '#666', marginBottom: '1rem', display: 'inline-block' }}>← Back to Blog</Link>
            <h1 style={{ marginBottom: '0.5rem' }}>{blog.title}</h1>
            <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '2rem' }}>
                {new Date(blog.createdAt).toLocaleDateString()} | Tags: {blog.tags}
            </div>
            <div style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#333', whiteSpace: 'pre-wrap' }}>
                {blog.content}
            </div>
        </div>
    );
};

export default BlogPost;
