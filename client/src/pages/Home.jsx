import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Cpu, Sigma, ChevronRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="container" style={{
            minHeight: 'calc(100vh - 70px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            paddingBottom: '4rem'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h1 style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    fontWeight: '800',
                    margin: 0,
                    marginBottom: '1rem',
                    background: 'linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6)', // Pink -> Purple -> Blue
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-2px',
                    textTransform: 'uppercase'
                }}>
                    MONASRI KUNDETI
                </h1>

                <h2 style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    marginBottom: '1rem'
                }}>
                    Welcome to My Portfolio
                </h2>

                <p style={{
                    fontSize: '1.2rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '3rem',
                    letterSpacing: '1px'
                }}>
                    Exploring AI, ML & Data Science
                </p>

                {/* Circular Icons */}
                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '4rem' }}>
                    {[
                        { icon: <Brain size={32} />, color: '#ec4899' }, // Pink
                        { icon: <Cpu size={32} />, color: '#8b5cf6' },   // Purple
                        { icon: <Sigma size={32} />, color: '#3b82f6' }  // Blue
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${item.color}66` }}
                            style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '50%',
                                border: `2px solid ${item.color}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: item.color,
                                background: 'rgba(255, 255, 255, 0.03)',
                                cursor: 'default'
                            }}
                        >
                            {item.icon}
                        </motion.div>
                    ))}
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>AI ML Student</p>
                    <p style={{ color: '#3b82f6', fontSize: '0.9rem' }}>
                        Building Intelligent Systems • Python • NLP • Deep Learning
                    </p>
                </div>

                <Link to="/projects" className="btn btn-outline" style={{ borderRadius: '50px', padding: '0.8rem 2rem', border: '1px solid var(--border-color)' }}>
                    View Work
                </Link>
            </motion.div>
        </div>
    );
};

export default Home;
