import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import offersData from './offers.json';

const App = () => {
    const [offers, setOffers] = useState(offersData);
    const [checkoutState, setCheckoutState] = useState({ id: null, status: 'idle' });
    const [showToast, setShowToast] = useState(false);
    const [isEliteSuccess, setIsEliteSuccess] = useState(false);

    const handleCheckout = (offer) => {
        if (offer.tier === 'starter') {
            setCheckoutState({ id: offer.id, status: 'processing' });
            setTimeout(() => {
                setCheckoutState({ id: null, status: 'idle' });
                setShowToast('Starter access unlocked.');
                setTimeout(() => setShowToast(false), 3000);
            }, 800);
            return;
        }

        setCheckoutState({ id: offer.id, status: 'processing' });
        document.body.classList.add('scroll-lock');

        if (window.Whop) {
            window.Whop.openCheckout({
                url: offer.whop_checkout_url,
                onSuccess: () => {
                    onCheckoutSuccess(offer);
                },
                onClose: () => {
                    document.body.classList.remove('scroll-lock');
                    setCheckoutState({ id: null, status: 'idle' });
                }
            });
        } else {
            setTimeout(() => {
                onCheckoutSuccess(offer);
            }, 2000);
        }
    };

    const onCheckoutSuccess = (offer) => {
        document.body.classList.remove('scroll-lock');
        if (offer.tier === 'elite') {
            setIsEliteSuccess(true);
            window.scrollTo({ top: 0, behavior: 'auto' });
        } else {
            setCheckoutState({ id: null, status: 'idle' });
            setShowToast('Pro access unlocked.');
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    if (isEliteSuccess) {
        return (
            <div className="app-container">
                <header className="header" style={{ opacity: 0.5 }}>
                    <div className="wordmark">ZARA Inspired</div>
                </header>
                <motion.div
                    className="thank-you-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1>You are no longer the bottleneck.</h1>
                    <p>Avatar Launch is now active.</p>
                    <button className="btn btn-solid" style={{ maxWidth: '240px' }}>
                        Access the Program
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <div className="hero-header">
                <img src="/header_bg.png" alt="Editorial" loading="eager" fetchpriority="high" />
            </div>

            <header className="header">
                <motion.div
                    className="wordmark"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    ZARA Inspired
                </motion.div>
                <motion.div
                    className="ai-badge"
                    style={{ marginTop: '14px' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    transition={{ delay: 0.2, duration: 1 }}
                >
                    AI Curated Intelligence
                </motion.div>
            </header>

            <main>
                <section className="hero-text-block">
                    <motion.div {...fadeInUp}>
                        <h1 style={{ marginBottom: '16px', maxWidth: '320px' }}>
                            Systems scale. Humans don't.
                        </h1>
                        <p style={{ fontSize: '15px', lineHeight: '1.4', maxWidth: '280px' }}>
                            Digital twins for consistent growth.
                        </p>
                    </motion.div>
                </section>

                <motion.section
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    <div key="content">
                        {offers.map((offer) => (
                            <motion.div
                                key={offer.id}
                                className={`card ${offer.is_featured ? 'card-elite' : ''}`}
                                variants={fadeInUp}
                                whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)' }}
                                onClick={() => handleCheckout(offer)}
                                style={{ cursor: 'pointer' }}
                            >
                                {offer.is_featured && <div className="micro-tag">Full System Access</div>}
                                <span className="label">{offer.tier}</span>
                                <h2 style={{ marginBottom: '8px', fontSize: offer.is_featured ? '22px' : '20px' }}>
                                    {offer.title}
                                </h2>
                                <p style={{ marginBottom: '24px' }}>{offer.access_summary}</p>

                                <div style={{ marginBottom: '20px' }}>
                                    <span style={{ fontSize: '24px', fontWeight: '600', color: 'var(--primary-text)' }}>
                                        {offer.price}
                                    </span>
                                    {offer.billing === 'monthly' && (
                                        <span style={{ fontSize: '12px', color: 'var(--secondary-text)', marginLeft: '4px' }}>
                                            / month
                                        </span>
                                    )}
                                </div>

                                <button
                                    className={`btn ${offer.tier === 'starter' ? 'btn-outline' : 'btn-solid'}`}
                                    disabled={checkoutState.id === offer.id}
                                >
                                    {checkoutState.id === offer.id
                                        ? (offer.tier === 'elite' ? "You're joining the system..." : "Processing...")
                                        : offer.cta_label}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </main>

            <footer style={{ marginTop: '120px', padding: '40px 0', textAlign: 'center', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '16px' }}>
                    <a href="#" className="label" style={{ margin: 0, textDecoration: 'none' }}>Privacy</a>
                    <a href="#" className="label" style={{ margin: 0, textDecoration: 'none' }}>Terms</a>
                </div>
                <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>© 2026 ZARA Inspired Storefront</p>
            </footer>

            <AnimatePresence>
                {showToast && (
                    <motion.div
                        className="toast"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        {showToast}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;
