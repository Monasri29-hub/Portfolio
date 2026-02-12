import { useState, useEffect } from 'react';
import axios from 'axios';
import { Github, Linkedin, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get('/api/profile');
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const ensureHttp = (url) => {
        if (!url) return url;
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        return `https://${url}`;
    };

    if (loading) return <div className="container" style={{ marginTop: '2rem' }}>Loading profile...</div>;

    return (
        <div className="container" style={{ padding: '4rem 20px', maxWidth: '800px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>About Me</h2>

                <div className="card" style={{ padding: '3rem' }}>
                    <div style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem', whiteSpace: 'pre-wrap' }}>
                        {profile?.bio || "Welcome! I'm an AI student passionate about building intelligent systems. (Bio not yet updated)"}
                    </div>

                    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '3rem', flexWrap: 'wrap' }}>
                        {profile?.githubUrl && (
                            <a href={ensureHttp(profile.githubUrl)} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                                <Github /> GitHub
                            </a>
                        )}
                        {profile?.linkedinUrl && (
                            <a href={ensureHttp(profile.linkedinUrl)} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', color: '#0077b5' }}>
                                <Linkedin /> LinkedIn
                            </a>
                        )}
                        {profile?.resumeUrl && (
                            <a href={ensureHttp(profile.resumeUrl)} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', color: '#c0392b' }}>
                                <FileText /> Resume
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default About;
