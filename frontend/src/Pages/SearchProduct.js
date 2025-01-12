import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../common';
import VerticalCard from '../components/VerticalCard';

const SearchProduct = () => {
    const { search } = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log("query", search);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            // Fetching product data
            const response = await fetch(`${SummaryApi.searchProduct.url}${search}`);
            const dataResponse = await response.json();
            setData(dataResponse.data);
            console.log("dataResponse", dataResponse);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (search) {
            fetchProduct();
        }
    }, [search]);

    return (
        <div className='container mx-auto mt-10 lg:mt-0 p-4'>
            {loading && (
                <p className='text-lg text-center'>Loading .....</p>
            )}
            <p className='text-lg font-semibold my-3'>Search Results: {data.length} products found</p>
            {data.length === 0 && !loading && (
                <p className='bg-white text-center p-4'>No Data Found.....</p>
            )}
            {data.length !== 0 && !loading && (
                <VerticalCard loading={loading} data={data} />
            )}
        </div>
    );
};

export default SearchProduct;
