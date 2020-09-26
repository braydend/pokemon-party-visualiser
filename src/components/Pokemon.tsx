import React from 'react';
import styled from 'styled-components';
import pokeballImage from '../assets/Pokeball-PNG.png';

export type PokemonType = {
    name: string;
    sprite: string;
};

const Container = styled.div`
    /* border-radius: 50%; */
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Placeholder = styled.img`
    width: 100%;
    height: auto;
`;

const PokemonImage = styled.img`
    width: 200%;
    height: auto;
`;

 type Props = {
     pokemon: PokemonType | null;
     onRelease: () => void;
 };

const Pokemon: React.FC<Props> = ({ pokemon, onRelease }) => {
    const isPokemon = pokemon !== null;

    if (!isPokemon) return (
        <Container>
            <p>Catch something!</p>
            <Placeholder src={pokeballImage} alt="pokeball" />
        </Container>
    );

    const { name, sprite } = pokemon as PokemonType;

    return (
    <Container>
        <p>{name}</p>
        <PokemonImage src={sprite} alt={`Image for ${name}`} />
        <button onClick={onRelease}>Release!</button>
    </Container>
    );
};

export default Pokemon;