//import index.css
import './index.css';
import React, { useState, useEffect } from 'react';
import PokemonThumbnail from './PokemonThumbnail';

function App() {

  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon/?limit=20')


  const getAllPokemons = async () =>{
    const res = await fetch (loadMore)
    const data = await res.json()
    setLoadMore(data.next)

    function createPokemonObject(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()
        setAllPokemons( currentList => [...currentList, data])
      })
    }
    createPokemonObject(data.results)
  }

  useEffect(()=>{
    getAllPokemons()
  }, )


  return (
    <div className="app-container">
      <h1>
        Pokemon Evolution
      </h1>
      <div className = "pokemon-container">
        <div className = "all-container">
          {allPokemons.map((pokemon, index) =>{
            return <PokemonThumbnail 
            key = {index} 
            id = {pokemon.id} 
            name = {pokemon.name} 
            image = {pokemon.sprites.front_default} 
            type = {pokemon.types[0].type.name} />
          })}
        </div>
        <button className = "load-more" onClick = {()=> getAllPokemons()}> Load more</button>
      </div>
    </div>
  );
}

export default App;
