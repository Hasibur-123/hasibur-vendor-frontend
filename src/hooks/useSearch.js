import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/**
 * Custom hook to manage product search, filtering, and pagination.
 */
const useSearch = (initialParams = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 1,
        total: 0,
        limit: 10
    });

    const [params, setParams] = useState({
        q: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        sort: 'newest',
        page: 1,
        limit: 10,
        ...initialParams
    });

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Clean up empty params
            const cleanParams = Object.fromEntries(
                Object.entries(params).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
            );

            const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products/search`, { params: cleanParams });

            setProducts(response.data?.products || []);
            setPagination({
                page: response.data?.page || 1,
                totalPages: response.data?.totalPages || 1,
                total: response.data?.total || 0,
                limit: response.data?.limit || 10
            });
        } catch (err) {
            console.error('Fetch products failed:', err);
            setError(err.response?.data?.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    }, [params]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const updateParams = (newParams) => {
        setParams(prev => ({ ...prev, ...newParams, page: newParams.page || 1 }));
    };

    const handlePageChange = (newPage) => {
        updateParams({ page: newPage });
    };

    return {
        products,
        loading,
        error,
        pagination,
        params,
        updateParams,
        handlePageChange,
        refetch: fetchProducts
    };
};

export default useSearch;
