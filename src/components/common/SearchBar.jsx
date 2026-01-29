import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, initialValue = '', placeholder = 'Search products...', delay = 500 }) => {
    const [searchTerm, setSearchTerm] = useState(initialValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            onSearch(searchTerm);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, delay, onSearch]);

    return (
        <div className="search-bar-container" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={placeholder}
                    style={{
                        width: '100%',
                        padding: '12px 20px',
                        paddingLeft: '45px',
                        borderRadius: '30px',
                        border: '1px solid #ddd',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border-color 0.3s',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#007bff'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
                <span style={{
                    position: 'absolute',
                    left: '15px',
                    color: '#888',
                    fontSize: '20px'
                }}>
                    🔍
                </span>
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm('')}
                        style={{
                            position: 'absolute',
                            right: '15px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#888',
                            fontSize: '18px'
                        }}
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
