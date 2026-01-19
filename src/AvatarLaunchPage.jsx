import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AvatarLaunchPage = () => {
    const navigate = useNavigate();

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    };

    return (
        <div className="elite-page">
            {/* Back Button */}
            <nav className="elite-nav">
                <button onClick={() => navigate('/')} className="back-btn">
                    ← Back
                </button>
            </nav>

            {/* Hero Section */}
            <section className="elite-hero">
                <div className="elite-hero-img">
                    <img src="/elite_pod.png" alt="Podcast Studio" />
                    <div className="img-overlay"></div>
                </div>
                <div className="elite-container">
                    <motion.div {...fadeInUp} className="hero-content">
                        <span className="label">THE BOTTLENECK</span>
                        <h1>Systems scale. Humans don't.</h1>
                        <p>
                            Building a brand today without an AI system is like trying to win a Formula 1 race by running on foot.
                            You are working against a machine that never sleeps, never gets tired, and never has a "bad hair day."
                            <span className="plus-marker">+1</span>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Architecture Section */}
            <section className="editorial-section">
                <div className="elite-container">
                    <div className="editorial-grid">
                        <motion.div {...fadeInUp} className="editorial-text">
                            <span className="label">THE ARCHITECTURE OF OMNIPRESENCE</span>
                            <h2>Stop Digging Foundations. Start Being the Architect.</h2>
                            <p>
                                Most creators are stuck in the "Manual Laborer" cycle. You are digging the foundation of your brand with a hand shovel—handling every retake, every edit, and every lighting adjustment yourself.
                                <span className="plus-marker">+4</span>
                            </p>
                            <p>
                                The result? You’re exhausted, your posting is inconsistent, and your growth is tied directly to your physical energy.
                                <span className="plus-marker">+2</span>
                            </p>
                        </motion.div>
                        <motion.div {...fadeInUp} className="editorial-img">
                            <img src="/elite_biz.png" alt="Business Architecture" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* The Protocol Section */}
            <section className="protocol-section">
                <div className="elite-container">
                    <motion.div {...fadeInUp} className="centered-content">
                        <p className="highlight-text">
                            The Digital Twin Protocol™ transforms you from the worker into the Strategic Director.
                            You don't need to post more; you need a system that posts for you.
                            <span className="plus-marker">+1</span>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Pain Points Section */}
            <section className="editorial-section alternate">
                <div className="elite-container">
                    <div className="editorial-grid reverse">
                        <motion.div {...fadeInUp} className="editorial-text">
                            <span className="label">THE PAIN OF BEING HUMAN</span>
                            <h2>If your business dies when you stop filming, it's a job, not a business.</h2>
                            <p style={{ marginBottom: '40px' }}>This offer fixes the deep-seated friction points that keep you invisible: <span className="plus-marker">+1</span></p>
                            <div className="friction-points">
                                <div className="point">
                                    <h3>Camera Shyness & Privacy <span className="plus-marker">+1</span></h3>
                                    <p>Scale without the spotlight or compromising your personal space.</p>
                                </div>
                                <div className="point">
                                    <h3>The "Everything Niche" Trap <span className="plus-marker">+1</span></h3>
                                    <p>Escape being generic. Dominate with a clear, persistent face.</p>
                                </div>
                                <div className="point">
                                    <h3>Blank Page Syndrome <span className="plus-marker">+1</span></h3>
                                    <p>Delete the friction of "finding inspiration." Systems dominate luck.</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div {...fadeInUp} className="editorial-img">
                            <img src="/elite_home.png" alt="Lifestyle Integration" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Intelligent Artistry Callout */}
            <section className="artistry-callout">
                <div className="elite-container">
                    <motion.div {...fadeInUp}>
                        <h2>No more "Plastic" AI.</h2>
                        <p>
                            Most AI looks fake. Our system uses "Intelligent Artistry" to ensure your twin has real texture—pores, imperfections, and soul.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Factory Table */}
            <section className="factory-section">
                <div className="elite-container">
                    <motion.div {...fadeInUp}>
                        <span className="label">YOUR SYSTEMIZED EMPIRE</span>
                        <h2 style={{ marginBottom: '48px' }}>The Content Factory</h2>
                        <div className="factory-table">
                            <div className="table-row header">
                                <div>COMPONENT</div>
                                <div>THE TRANSFORMATION</div>
                            </div>
                            <div className="table-row">
                                <div className="component-title">Avatar DNA Generator</div>
                                <div>We lock in your twin's personality, beliefs, and voice so it sounds like you, every single time. <span className="plus-marker">+1</span></div>
                            </div>
                            <div className="table-row">
                                <div className="component-title">Batch Creation Warfare</div>
                                <div>Produce a week's worth of hyper-real video content in a single 2-hour session. <span className="plus-marker">+2</span></div>
                            </div>
                            <div className="table-row">
                                <div className="component-title">The Specificity Ladder</div>
                                <div>Stop being "general." We help you find the "small pond" you can dominate in 30 days. <span className="plus-marker">+2</span></div>
                            </div>
                            <div className="table-row">
                                <div className="component-title">Hyper-Real Texture Suite</div>
                                <div>No more plastic skin. Your digital twin with micro-details that command human trust. <span className="plus-marker">+1</span></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Systems Over Inspiration */}
            <section className="closing-section">
                <div className="elite-hero-img">
                    <img src="/elite_gym.png" alt="Performance Systems" />
                    <div className="img-overlay bottom"></div>
                </div>
                <div className="elite-container">
                    <motion.div {...fadeInUp} className="closing-content">
                        <span className="label">SYSTEMS OVER INSPIRATION</span>
                        <h2>Growth is a mathematical equation.</h2>
                        <p>
                            While other creators wait for "the right vibe" to film, your Digital Twin is already out there,
                            building authority and securing revenue while you sleep.
                            <span className="plus-marker">+3</span>
                        </p>
                        <p className="final-hook">
                            You don’t need more coffee. You don't need a better camera. You need to delete the human bottleneck.
                        </p>

                        <div className="final-cta-box">
                            <p>Replace yourself with a system. The interactive AI program is $49</p>
                            <button className="btn btn-solid" style={{ minWidth: '280px', marginTop: '24px' }}>
                                Join Avatar Launch
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>© 2026 ZARA Inspired Storefront</p>
            </footer>
        </div>
    );
};

export default AvatarLaunchPage;
