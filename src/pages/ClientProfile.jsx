import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ClientProfile.css';

const ClientProfile = () => {
    const { id } = useParams();
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, we would fetch public client info here
        // For now, simulating a fetch or using a mock since the endpoint might not exist for public view
        const fetchClient = async () => {
            try {
                // Mocking data for now as specific public client endpoint wasn't provided in context
                // You would replace this with: await axios.get(`http://localhost:5000/api/users/${id}`);
                setClient({
                    id: id,
                    name: "Secure Client Identity",
                    joinDate: "2024-01-15"
                });
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchClient();
    }, [id]);

    if (loading) {
        return (
            <div className="client-profile-loading">
                <div className="client-loader"></div>
            </div>
        );
    }

    return (
        <div className="client-profile-container animate-fade-in">
            <div className="client-dossier glass-card">
                <header className="dossier-header">
                    <div className="dossier-icon">👤</div>
                    <div className="header-text">
                        <h1 className="dossier-title">Client Dossier</h1>
                        <p className="dossier-subtitle">Restricted Access View</p>
                    </div>
                </header>

                <div className="dossier-content animate-slide-up">
                    <div className="dossier-row">
                        <span className="dossier-label">Identity Hash</span>
                        <span className="dossier-value font-mono">{id}</span>
                    </div>

                    <div className="dossier-row">
                        <span className="dossier-label">Status</span>
                        <span className="status-badge">Verified Artisan Patron</span>
                    </div>

                    <div className="dossier-message">
                        <p>This profile belongs to a private client within the Vendar ecosystem. Detailed acquisition history and personal metrics are restricted to the account holder.</p>
                    </div>
                </div>

                <footer className="dossier-footer">
                    <p>Secured by Vendar Protocol v4.2</p>
                </footer>
            </div>
        </div>
    );
};

export default ClientProfile;
