import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, loading, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('projects'); // projects, blogs, messages, profile
    const [projects, setProjects] = useState([]);
    const [messages, setMessages] = useState([]);

    // Fetch projects
    const fetchProjects = async () => {
        try {
            const { data } = await axios.get('/api/projects');
            setProjects(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (activeTab === 'projects') {
            fetchProjects();
        }
    }, [activeTab]);

    const handleDeleteProject = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`/api/projects/${id}`, config);
                setMessage('Project deleted successfully');
                fetchProjects();
            } catch (error) {
                setMessage('Error deleting project');
                console.error(error);
            }
        }
    };

    // Project Form State
    const [projectData, setProjectData] = useState({
        title: '', description: '', techStack: '', category: 'AI/ML', imageUrl: '', githubLink: '', liveLink: ''
    });
    const [editingProject, setEditingProject] = useState(null);

    // Blog Form State
    const [blogData, setBlogData] = useState({
        title: '', content: '', tags: '', published: true
    });

    // Profile Form State
    const [profileData, setProfileData] = useState({
        bio: '', resumeUrl: '', githubUrl: '', linkedinUrl: '', mediumUrl: '', publicEmail: '', location: ''
    });

    const [message, setMessage] = useState('');

    // Fetch messages when tab changes to 'messages'
    const fetchMessages = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('/api/contact/messages', config);
            setMessages(data);
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch profile when tab changes to 'profile'
    const fetchProfile = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('/api/profile', config);
            if (data) setProfileData(data);
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return null;
    if (!user || user.role !== 'ADMIN') {
        navigate('/login');
        return null;
    }

    const handleProjectChange = (e) => setProjectData({ ...projectData, [e.target.name]: e.target.value });
    const handleBlogChange = (e) => {
        const value = e.target.name === 'published' ? e.target.checked : e.target.value;
        setBlogData({ ...blogData, [e.target.name]: value });
    };
    const handleProfileChange = (e) => setProfileData({ ...profileData, [e.target.name]: e.target.value });


    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };

            if (editingProject) {
                await axios.put(`/api/projects/${editingProject.id}`, projectData, config);
                setMessage('Project updated successfully!');
            } else {
                await axios.post('/api/projects', projectData, config);
                setMessage('Project added successfully!');
            }

            resetProjectForm();
            fetchProjects();
        } catch (error) {
            setMessage(`Error ${editingProject ? 'updating' : 'adding'} project`);
            console.error(error);
        }
    };

    const handleEditClick = (project) => {
        setEditingProject(project);
        setProjectData({
            title: project.title,
            description: project.description,
            techStack: project.techStack,
            category: project.category,
            imageUrl: project.imageUrl,
            githubLink: project.githubLink,
            liveLink: project.liveLink
        });
        window.scrollTo(0, 0);
    };

    const resetProjectForm = () => {
        setEditingProject(null);
        setProjectData({ title: '', description: '', techStack: '', category: 'AI/ML', imageUrl: '', githubLink: '', liveLink: '' });
    };

    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('/api/blogs', blogData, config);
            setMessage('Blog post added successfully!');
            setBlogData({ title: '', content: '', tags: '', published: true });
        } catch (error) {
            setMessage('Error adding blog post');
            console.error(error);
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put('/api/profile', profileData, config);
            setMessage('Profile updated successfully!');
        } catch (error) {
            setMessage('Error updating profile');
            console.error(error);
        }
    };

    return (
        <div className="container" style={{ padding: '2rem 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                    <h2>Admin Dashboard</h2>
                    <p>Welcome back, {user.email}</p>
                </div>
                <button
                    onClick={() => { logout(); navigate('/'); }}
                    className="btn btn-outline"
                    style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                >
                    Logout
                </button>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <button onClick={() => { setActiveTab('projects'); fetchProjects(); }} className={`btn tab-btn ${activeTab === 'projects' ? 'btn-primary' : ''}`}>Projects</button>
                <button onClick={() => setActiveTab('blogs')} className={`btn tab-btn ${activeTab === 'blogs' ? 'btn-primary' : ''}`}>Blogs</button>
                <button onClick={() => { setActiveTab('messages'); fetchMessages(); }} className={`btn tab-btn ${activeTab === 'messages' ? 'btn-primary' : ''}`}>Messages</button>
                <button onClick={() => { setActiveTab('profile'); fetchProfile(); }} className={`btn tab-btn ${activeTab === 'profile' ? 'btn-primary' : ''}`}>Profile</button>
            </div>

            {message && <p style={{ color: message.includes('Error') ? 'red' : 'green', marginBottom: '1rem' }}>{message}</p>}

            {activeTab === 'projects' && (
                <div>
                    <div className="card" style={{ maxWidth: '800px', marginBottom: '2rem' }}>
                        <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                        <form onSubmit={handleProjectSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input name="title" value={projectData.title} onChange={handleProjectChange} required />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea name="description" value={projectData.description} onChange={handleProjectChange} required rows="4"></textarea>
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select name="category" value={projectData.category} onChange={handleProjectChange} style={{ width: '100%', padding: '10px' }}>
                                    <option value="AI/ML">AI/ML</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Research">Research</option>
                                    <option value="Design">Design</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Tech Stack</label>
                                <input name="techStack" value={projectData.techStack} onChange={handleProjectChange} placeholder="e.g. Python, TensorFlow" />
                            </div>
                            <div className="form-group">
                                <label>Image URL</label>
                                <input name="imageUrl" value={projectData.imageUrl} onChange={handleProjectChange} placeholder="https://..." />
                            </div>
                            <div className="form-group">
                                <label>GitHub Link</label>
                                <input name="githubLink" value={projectData.githubLink} onChange={handleProjectChange} />
                            </div>
                            <div className="form-group">
                                <label>Live Link</label>
                                <input name="liveLink" value={projectData.liveLink} onChange={handleProjectChange} />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="submit" className="btn btn-primary">{editingProject ? 'Update Project' : 'Add Project'}</button>
                                {editingProject && (
                                    <button type="button" onClick={resetProjectForm} className="btn btn-outline">Cancel</button>
                                )}
                            </div>
                        </form>
                    </div>

                    <h3>Manage Projects</h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {projects.map(project => (
                            <div key={project.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ margin: '0 0 0.5rem 0' }}>{project.title}</h4>
                                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{project.category}</p>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => handleEditClick(project)}
                                        className="btn btn-outline"
                                        style={{ padding: '0.5rem 1rem' }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProject(project.id)}
                                        className="btn"
                                        style={{ background: '#fee2e2', color: '#dc2626' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'blogs' && (
                <div className="card" style={{ maxWidth: '800px' }}>
                    <h3>Add New Blog Post</h3>
                    <form onSubmit={handleBlogSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input name="title" value={blogData.title} onChange={handleBlogChange} required />
                        </div>
                        <div className="form-group">
                            <label>Content (Markdown supported)</label>
                            <textarea name="content" value={blogData.content} onChange={handleBlogChange} required rows="10" placeholder="# Heading..."></textarea>
                        </div>
                        <div className="form-group">
                            <label>Tags</label>
                            <input name="tags" value={blogData.tags} onChange={handleBlogChange} placeholder="e.g. AI, Deep Learning" />
                        </div>
                        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input type="checkbox" name="published" checked={blogData.published} onChange={handleBlogChange} style={{ width: 'auto' }} />
                            <label style={{ margin: 0 }}>Published</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Publish Post</button>
                    </form>
                </div>
            )}

            {activeTab === 'messages' && (
                <div style={{ maxWidth: '800px' }}>
                    <h3>Inbox</h3>
                    {messages.length === 0 ? <p>No messages yet.</p> : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {messages.map(msg => (
                                <div key={msg.id} className="card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <strong>{msg.name}</strong>
                                        <span style={{ color: '#888', fontSize: '0.9rem' }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div style={{ color: 'var(--accent-color)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{msg.email}</div>
                                    <p style={{ color: '#555' }}>{msg.content}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'profile' && (
                <div className="card" style={{ maxWidth: '800px' }}>
                    <h3>Edit Profile</h3>
                    <form onSubmit={handleProfileSubmit}>
                        <div className="form-group">
                            <label>Bio (Markdown supported)</label>
                            <textarea name="bio" value={profileData.bio} onChange={handleProfileChange} rows="6"></textarea>
                        </div>
                        <div className="form-group">
                            <label>GitHub URL</label>
                            <input name="githubUrl" value={profileData.githubUrl} onChange={handleProfileChange} />
                        </div>
                        <div className="form-group">
                            <label>LinkedIn URL</label>
                            <input name="linkedinUrl" value={profileData.linkedinUrl} onChange={handleProfileChange} />
                        </div>
                        <div className="form-group">
                            <label>Resume URL (Link to PDF)</label>
                            <input name="resumeUrl" value={profileData.resumeUrl} onChange={handleProfileChange} />
                        </div>
                        <div className="form-group">
                            <label>Public Contact Email</label>
                            <input name="publicEmail" value={profileData.publicEmail || ''} onChange={handleProfileChange} placeholder="contact@example.com" />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input name="location" value={profileData.location || ''} onChange={handleProfileChange} placeholder="City, Country" />
                        </div>
                        <div className="form-group">
                            <label>Medium Blog URL</label>
                            <input name="mediumUrl" value={profileData.mediumUrl || ''} onChange={handleProfileChange} placeholder="https://medium.com/@username" />
                        </div>
                        <button type="submit" className="btn btn-primary">Update Profile</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;

