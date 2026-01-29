import React from 'react';
import { Link } from 'react-router-dom';
import './SellerSuccessStories.css';

const SellerSuccessStories = () => {
    const stories = [
        {
            img: "/story-1.png",
            title: "From a Small Workshop to Global Exporter",
            author: "Ramesh Kumar",
            business: "Handicraft Treasures",
            excerpt: "Ramesh started with 2 artisans in Jaipur. Today, his wooden artifacts are sold in 15 countries thanks to Vendar's global logistics."
        },
        {
            img: "/story-2.png",
            title: "Empowering Rural Women Weavers",
            author: "Anita Desai",
            business: "Saree Sutra",
            excerpt: "Anita's collective has given financial independence to over 50 women. Online sales account for 80% of their annual revenue."
        },
        {
            img: "/story-3.png",
            title: "Reviving the Lost Art of Madhubani",
            author: "Prakash Jha",
            business: "Mithila Arts",
            excerpt: "Vendar provided the platform Prakash needed to reach art lovers who appreciate authentic, hand-painted Madhubani art."
        }
    ];

    return (
        <div className="stories-container">
            {/* Hero */}
            <section className="stories-hero">
                <div className="stories-hero-content">
                    <h1 className="stories-title">Their Success, Our Pride</h1>
                    <p className="stories-subtitle">
                        Discover how artisans and entrepreneurs across India are transforming their businesses and lives by selling on Vendar.
                    </p>
                </div>
            </section>

            {/* Featured Story */}
            <section className="featured-story-section">
                <div className="featured-story-card">
                    <div className="featured-img-col">
                        <img src="/story-featured.png" alt="Featured Seller" />
                    </div>
                    <div className="featured-text-col">
                        <div className="quote-mark">“</div>
                        <blockquote className="featured-quote">
                            We never imagined our small pottery studio would get orders from London to Tokyo. Vendar didn’t just give us a marketplace; they gave us a future.
                        </blockquote>
                        <div className="featured-author">Meera & Rahul</div>
                        <div className="featured-business">Founders, Earth & Clay Studio</div>
                    </div>
                </div>
            </section>

            {/* Stories Grid */}
            <section className="stories-grid-section">
                <h2 className="section-heading">More Inspiring Journeys</h2>
                <div className="stories-grid">
                    {stories.map((story, index) => (
                        <div key={index} className="story-card">
                            <img src={story.img} alt={story.title} className="story-thumbnail" />
                            <div className="story-content">
                                <h3 className="story-title">{story.title}</h3>
                                <p className="story-excerpt">{story.excerpt}</p>
                                <div className="featured-author" style={{ fontSize: '0.9rem' }}>{story.author}</div>
                                <div className="featured-business" style={{ fontSize: '0.8rem' }}>{story.business}</div>
                                <div style={{ marginTop: '1rem' }}>
                                    <Link to="#" className="read-more-link">Read full story &rarr;</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="stories-cta-section">
                <h2 className="stories-cta-title">Write Your Own Success Story</h2>
                <p style={{ opacity: 0.9 }}>Join lakhs of sellers who are growing their business on Vendar.</p>
                <Link to="/register?role=vendor" className="stories-cta-btn">Start Selling Today</Link>
            </section>
        </div>
    );
};

export default SellerSuccessStories;
