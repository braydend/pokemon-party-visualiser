import { useEffect, useState } from "react";
import { PokeAPIAllPokemon, PokemonListing } from "../api-types";

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

    const fetchAllPokemon = async (onComplete?: () => void) => {
        const endpoint = 'https://pokeapi.co/api/v2/pokemon?limit=2000';
        const response: PokeAPIAllPokemon = await (await fetch(endpoint)).json();
        if (onComplete) onComplete();
        return response.results;
    };

    useEffect(() => {
        setLoading(true);
        try{
            (async() => setData(await fetchAllPokemon(() => { setLoading(false) })))();
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