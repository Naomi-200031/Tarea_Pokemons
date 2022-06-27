import React, { useEffect, useState } from 'react'
import PokemonThumb from './PokemonThumb'


const App = () => {

   const[allPokemons, setAllPokemons] = useState([])
   const [next, setNext] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const getAllPokemons = async () => {
    const res = await fetch(next)
    const data = await res.json()
    

    setNext(data.next)

    function createPokemonObject(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()
        setAllPokemons( currentList => [...currentList, data])
        await allPokemons.sort((a, b) => a.id - b.id)
      })
    }
    createPokemonObject(data.results)
  }
// eslint-disable-next-line
 useEffect(() => {
  // eslint-disable-next-line
  getAllPokemons()
  // eslint-disable-next-line
 }, [])

  return (
    <div className="app-contaner">
      <h1>Pokemon Evolution</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map( (pokemonStats, index) => 
            <PokemonThumb
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />)}
          
        </div>
          <button className="next" onClick={() => getAllPokemons()}>Next</button>
      </div>
    </div>
  );
}

export default App;