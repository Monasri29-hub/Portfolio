import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [blogsRes, profileRes] = await Promise.all([
                    axios.get('/api/blogs'),
                    axios.get('/api/profile')
                ]);
                setBlogs(blogsRes.data.filter(b => b.published));
                setProfile(profileRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="container" style={{ marginTop: '2rem' }}>Loading articles...</div>;

    return (
        <div className="container" style={{ padding: '2rem 20px', maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2>Latest Articles</h2>
                {profile?.mediumUrl && (
                    <a
                        href={profile.mediumUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                        style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                        Read my Articles on Medium ↗
                    </a>
                )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {blogs.map((blog) => (
                    <motion.div
                        key={blog.id}
                        className="card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ padding: '2rem' }}
                    >
                        <h3 style={{ margin: '0 0 0.5rem' }}>
                            <Link to={`/blog/${blog.id}`} style={{ color: 'inherit' }}>{blog.title}</Link>
                        </h3>
                        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1rem' }}>
                            {new Date(blog.createdAt).toLocaleDateString()} | {blog.tags}
                        </div>
                        <p style={{ color: '#555', lineHeight: '1.6' }}>
                            {blog.content.substring(0, 150)}...
                        </p>
                        <Link to={`/blog/${blog.id}`} style={{ color: 'var(--accent-color)', fontWeight: '500', marginTop: '1rem', display: 'inline-block' }}>
                            Read More →
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
