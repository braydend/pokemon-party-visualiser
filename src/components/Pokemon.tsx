import React from 'react';
import styled from 'styled-components';
import pokeballImage from '../assets/Pokeball-PNG.png';

export type PokemonType = {
    name: string;
    sprite: string;
};

const Container = styled.div`
    padding: 1rem;
    flex-grow: 1;
    background-color: #474e5c;
    border-radius: 6px;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

 type Props = {
     pokemon: PokemonType | null;
     onRelease: () => void;
 };

const Pokemon: React.FC<Props> = ({ pokemon, onRelease }) => {
    const image = pokemon?.sprite || pokeballImage;
    const text = pokemon?.name || 'Catch something!';
    const altText = pokemon?.name ? `Image for ${pokemon.name}` : 'Pokeball';

    return (
    <Container>
        <p>{text}</p>
        <img src={image} width={150} alt={altText} />
        <button onClick={onRelease}>Release!</button>
    </Container>
    );
};

export default Pokemon;