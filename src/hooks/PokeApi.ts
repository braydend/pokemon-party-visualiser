import { useCallback, useEffect, useState } from "react";
import { PokeAPIAllPokemon, PokeAPIPokemon, PokemonListing } from "../api-types";

type Maybe<T> = T | undefined;
type Error = {
    message: string;
};

export const useGetAllPokemon: () => { 
    data: Maybe<PokemonListing[]>, 
    error: Maybe<Error>, 
    loading: boolean, 
} = () => {
    const [data, setData] = useState<PokemonListing[]>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(true);

    const fetchAllPokemon = async () => {
        const endpoint = 'https://pokeapi.co/api/v2/pokemon?limit=2000';
        setLoading(true);
        const response: PokeAPIAllPokemon = await (await fetch(endpoint)).json();
        setLoading(false);
        return response.results;
    };

    useEffect(() => {
        try{
            (async() => setData(await fetchAllPokemon()))();
        } catch (e) {
            setError({ message: e.message });
        }
    }, []);

    return {
        loading,
        error,
        data,
    };
};

export const useGetPokemonData: () => [
    (query: string) => void, 
    {
        data: Maybe<PokeAPIPokemon>;
        loading: boolean;
        error: Maybe<Error>;
    },] = () => {
    const [data, setData] = useState<PokeAPIPokemon>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState<string>();
    
    const fetchPokemon = useCallback(async (search: string) => {
        setLoading(true);
        const endpoint = `https://pokeapi.co/api/v2/pokemon/${search}`;
        const response: PokeAPIPokemon = await (await fetch(endpoint)).json();
        setLoading(false);
        return response;
    }, []);

    useEffect(() => {
        try {
            (async () => query && setData(await fetchPokemon(query)))();
        } catch (e) {
            setError(e.message);
        }   
    }, [fetchPokemon, query]);

    return [
        (newQuery) => {setQuery(newQuery)}, 
        {
            data,
            error,
            loading,
        },
    ];
};