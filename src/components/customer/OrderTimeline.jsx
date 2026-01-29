import React from 'react';
import './OrderTimeline.css';

const OrderTimeline = ({ status, createdAt, updatedAt }) => {
    const statuses = [
        { key: 'pending', label: 'Order Placed', icon: '📝' },
        { key: 'accepted', label: 'Confirmed', icon: '✅' },
        { key: 'in_progress', label: 'Processing', icon: '🔨' },
        { key: 'completed', label: 'Delivered', icon: '📦' }
    ];

    const getCurrentStatusIndex = () => {
        const index = statuses.findIndex(s => s.key === status);
        return index >= 0 ? index : 0;
    };

    const currentIndex = getCurrentStatusIndex();

    const getStatusClass = (index) => {
        if (index < currentIndex) return 'completed';
        if (index === currentIndex) return 'active';
        return 'pending';
    };

    return (
        <div className="order-timeline">
            <div className="timeline-track">
                {statuses.map((statusItem, index) => (
                    <React.Fragment key={statusItem.key}>
                        <div className={`timeline-node ${getStatusClass(index)}`}>
                            <div className="node-circle">
                                <span className="node-icon">{statusItem.icon}</span>
                            </div>
                            <div className="node-label">
                                <p className="node-title">{statusItem.label}</p>
                                {index === currentIndex && (
                                    <p className="node-date">
                                        {new Date(updatedAt || createdAt).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short'
                                        })}
                                    </p>
                                )}
                            </div>
                        </div>
                        {index < statuses.length - 1 && (
                            <div className={`timeline-connector ${index < currentIndex ? 'completed' : ''}`} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default OrderTimeline;
