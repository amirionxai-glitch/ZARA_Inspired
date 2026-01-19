import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import offersData from './offers.json';

const App = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [checkoutState, setCheckoutState] = useState({ id: null, status: 'idle' }); // idle, processing, success
    const [showToast, setShowToast] = useState(false);
    const [isEliteSuccess, setIsEliteSuccess] = useState(false);

    useEffect(() => {
        // Data is local, no need for artificial delay
        setOffers(offersData);
        setLoading(false);
    }, []);

    const handleCheckout = (offer) => {
        if (offer.tier === 'starter') {
            // Instant access for Starter
            setCheckoutState({ id: offer.id, status: 'processing' });
            setTimeout(() => {
                setCheckoutState({ id: null, status: 'idle' });
                setShowToast('Starter access unlocked.');
                setTimeout(() => setShowToast(false), 3000);
            }, 800);
            return;
        }

        // Whop Checkout for Pro and Elite
        setCheckoutState({ id: offer.id, status: 'processing' });

        // Lock scroll
        document.body.classList.add('scroll-lock');

        // Simulate Whop checkout flow
        // In a real app, you would use: window.Whop.openCheckout({ url: offer.whop_checkout_url })
        // and handle success callbacks.

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
            // Mock flow if script not loaded/testing
            setTimeout(() => {
                onCheckoutSuccess(offer);
            }, 2000);
        }
    };

    const onCheckoutSuccess = (offer) => {
        document.body.classList.remove('scroll-lock');
        if (offer.tier === 'elite') {
            setIsEliteSuccess(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setCheckoutState({ id: null, status: 'idle' });
            setShowToast('Pro access unlocked.');
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } // Faster duration
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.05 // Faster staggering
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
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

    if (error) {
        return (
            <div className="app-container" style={{ justifyContent: 'center', textAlign: 'center', minHeight: '100vh' }}>
                <p style={{ fontSize: '14px', letterSpacing: '0.05em' }}>
                    Systems are updating. Check back shortly.
                </p>
            </div>
        );
    }

    return (
        <div className="app-container">
            <div className="hero-header">
                <img src="/header_bg.png" alt="Editorial" />
            </div>
            <motion.header
                className="header"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="wordmark">ZARA Inspired</div>
                <div className="ai-badge" style={{ marginTop: '12px' }}>AI Curated Intelligence</div>
            </motion.header>

            <main>
                {/* Hero Section */}
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

                {/* Offer Feed */}
                <motion.section
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="skeleton-card skeleton" />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="content"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                            >
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
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.section>
            </main>

            <motion.footer
                style={{ marginTop: '120px', padding: '40px 0', textAlign: 'center', borderTop: '1px solid var(--border-color)' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '16px' }}>
                    <a href="#" className="label" style={{ margin: 0, textDecoration: 'none' }}>Privacy</a>
                    <a href="#" className="label" style={{ margin: 0, textDecoration: 'none' }}>Terms</a>
                </div>
                <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>© 2026 ZARA Inspired Storefront</p>
            </motion.footer>

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
