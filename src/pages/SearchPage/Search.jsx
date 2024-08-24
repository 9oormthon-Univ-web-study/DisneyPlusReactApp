import React, { useEffect } from 'react';
import axios from '../../api/axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Search = () => {
    const [searchResult, setSearchResult] = useState([]);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    let query = useQuery();
    const searchTerm = query.get('q');

    useEffect(() => {
        if (searchTerm) {
            fetchSearchMovie(searchTerm);
        }
    }, [searchTerm]);

    const fetchSearchMovie = async (searchTerm) => {
        try {
            const request = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
            setSearchResult(request.data.results);
            console.log(searchTerm);
            console.log(searchResult);
        } catch (error) {
            console.error(error);
        }
    };

    return <div>Search</div>;
};

export default Search;
