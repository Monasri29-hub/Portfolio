import { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        content: ''
    });
    const [status, setStatus] = useState(''); // '', 'loading', 'success', 'error'
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get('/api/profile');
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await axios.post('/api/contact', formData);
            setStatus('success');
            setFormData({ name: '', email: '', content: '' });
            setTimeout(() => setStatus(''), 5000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 20px', maxWidth: '1000px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Get In Touch</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }} className="contact-grid">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 style={{ marginBottom: '1.5rem' }}>Let's Talk</h3>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>
                        I'm currently open to new opportunities, collaborations, or just a friendly chat about AI and technology.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ background: '#eef2ff', padding: '10px', borderRadius: '50%', color: 'var(--accent-color)' }}>
                                <Mail size={20} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.9rem', color: '#888' }}>Email</div>
                                <div>{profile?.publicEmail || 'email@example.com'}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ background: '#eef2ff', padding: '10px', borderRadius: '50%', color: 'var(--accent-color)' }}>
                                <MapPin size={20} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.9rem', color: '#888' }}>Location</div>
                                <div>{profile?.location || 'Location not set'}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="card"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="your@email.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                                rows="5"
                                placeholder="How can I help you?"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Sending...' : <>Send Message <Send size={18} /></>}
                        </button>

                        {status === 'success' && (
                            <p style={{ color: 'green', marginTop: '1rem', textAlign: 'center' }}>Message sent successfully!</p>
                        )}
                        {status === 'error' && (
                            <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>Failed to send message. Please try again.</p>
                        )}
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
