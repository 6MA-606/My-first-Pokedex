import { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { PokeAbility, PokeDescription, PokeEggGroups, PokeEvoChain, PokePolygonStat, PokeRangeStat, PokeType } from './components/PokeInfo';
import { RevolvingDot } from 'react-loader-spinner';
import BackToTopButton, { PokeButton, PokeButtonMini, ShinyButton } from './components/Button';

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [nextPokemon, setNextPokemon] = useState(null);
  const [previousPokemon, setPreviousPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evoUrl, setEvoUrl] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shiny, setShiny] = useState(false);
  const [id, setId] = useState(1);
  const [description, setDescription] = useState('');

  const loadPokemon = useCallback(async () => {
    let abortController = new AbortController();

    const loadPokemon = async () => {
      try {
        setLoading(true);

        let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`, {
          signal: abortController.signal
        });
        setPokemon(res.data);

        res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`, {
          signal: abortController.signal
        });
        setSpecies(res.data);

        if (id < 905) {
          res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id + 1}`, {
            signal: abortController.signal
          });
          setNextPokemon(res.data);
        }

        if (id > 1) {
          res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id - 1}`, {
            signal: abortController.signal
          });
          setPreviousPokemon(res.data);
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
            console.error("Something went wrong, ", error);
        }
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();

    return () => abortController.abort();
  }, [id]);

  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]);

  useEffect(() => {
    if (species) {
      let url = species.evolution_chain.url;
      setEvoUrl(url);
    }
  }, [species]);

  useEffect(() => {
    if (evoUrl) {
      let abortController = new AbortController();

      const loadEvoChain = async () => {
        try {
          setLoading(true);
          let res = await axios.get(evoUrl, {
            signal: abortController.signal
          });
          setEvolutionChain(res.data);
        } catch (error) {
          if (!axios.isCancel(error)) {
              console.error("Something went wrong, ", error);
          }
        } finally {
          setLoading(false);
        }
      }

      loadEvoChain();

      return () => abortController.abort();
    }
  }, [evoUrl]);
  
  useEffect(() => {
    if (species) {
      let flavor = species.flavor_text_entries.filter(entry => entry.language.name === "en");
      setDescription(flavor[flavor.length - 1].flavor_text);
    }
  }, [species]);

  return (
    <div className='min-h-screen my-10 xl:my-0 flex flex-col xl:flex-row gap-6 justify-center items-center'>
      <div className="hidden xl:block">
        { id > 1 ? (
          <PokeButton type="previous" pokemon={previousPokemon} onClick={() => setId(id - 1)} loading={loading} />
        ) : (
          <div className="w-24"></div>
        )}
      </div>
      <div className='flex gap-5 items-center justify-center flex-col xl:flex-row'>
        <div className="flex gap-5 items-center">
          <div className="hidden sm:block xl:hidden">
            { id > 1 ? (
              <PokeButton type="previous" pokemon={previousPokemon} onClick={() => setId(id - 1)} loading={loading} />
            ) : (
              <div className="w-24"></div>
            )}
          </div>
          <div>
            <div className={`h-[30rem] w-[30rem] relative border-2 bg-neutral-700 border-neutral-600 rounded-xl`}>
              <div className='w-full h-full absolute flex items-center justify-center'>
                {loading ? (
                  <RevolvingDot
                  radius="70"
                  color="#ff0000"
                  secondaryColor=''
                  ariaLabel="revolving-dot-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  />
                  ) : (
                    <>
                      <img
                        className='w-[90%] h-[90%] z-10'
                        src={!shiny ? pokemon?.sprites.other.home.front_default : pokemon?.sprites.other.home.front_shiny}
                        alt={pokemon?.name}
                      />
                      <div className='absolute bottom-0 w-[80%] h-[20%] bg-gradient-radial opacity-40 rounded-[100%]'></div>
                    </>
                  )}
              </div>
              <ShinyButton isShiny={shiny} onClick={() => setShiny(!shiny)} className="absolute right-0 bottom-0" />
            </div>
            <div className='max-w-[30rem] h-auto pb-5 sm:pb-0 sm:h-[19rem] mt-[1rem] bg-neutral-700 border-2 border-neutral-600 rounded-xl'>
              <div className='flex flex-col px-5 h-full gap-5'>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline justify-center gap-2">
                      <div className='text-[3rem] text-neutral-50 font-semibold capitalize drop-shadow-lg'>{pokemon?.name}</div>
                      <div className='text-[2rem] font-semibold text-neutral-400 drop-shadow-lg'>#{pokemon?.id.toString().padStart(3, '0')}</div>
                    </div>
                    <div>
                      <div>
                        <span className='text-xs text-neutral-400 font-semibold'>Height: </span>
                        <span className='text-xs text-neutral-300'>{pokemon?.height / 10} m</span>
                      </div>
                      <div>
                        <span className='text-xs text-neutral-400 font-semibold'>Weight: </span>
                        <span className='text-xs text-neutral-300'>{pokemon?.weight / 10} kg</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex gap-2 items-center mt-1 mb-2'>
                    {pokemon?.types.map((type, index) => (
                      <PokeType key={index} poketype={type.type.name} />
                    ))}
                  </div>
                  <div className='bg-neutral-700 text-sm text-neutral-300 font-semibold ml-1 capitalize'>{species?.genera[7].genus}</div>
                </div>
                <PokeDescription description={description} />
                <div className="flex sm:hidden justify-between">
                  { id > 1 ? (
                    <PokeButtonMini type="previous" pokemon={previousPokemon} onClick={() => setId(id - 1)} loading={loading} />
                  ) : (
                    <div className="w-24"></div>
                  )}
                  { id < 905 ? (
                    <PokeButtonMini type="next" pokemon={nextPokemon} onClick={() => setId(id + 1)} loading={loading} />
                  ) : (
                    <div className="w-24"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block xl:hidden">
            { id < 905 ? (
              <PokeButton type="next" pokemon={nextPokemon} onClick={() => setId(id + 1)} loading={loading} />
            ) : (
              <div className="w-24"></div>
            )}
          </div>
        </div>
        <div className='h-auto xl:h-[50rem] w-[30rem] md:w-[60rem] flex flex-col border-2 bg-neutral-700 border-neutral-600 rounded-xl overflow-hidden'>
          <div className='px-3 py-1 bg-red-700 flex items-center gap-2'>
            <div className='text-[1.5rem] text-neutral-50 capitalize'>
              {pokemon?.name}
              <span className='text-sm font-semibold text-neutral-400'> #{pokemon?.id.toString().padStart(3, '0')}</span>
            </div>
          </div>
          <div className='p-3 flex flex-col gap-3 overflow-y-auto'>
            <div className='flex gap-6 flex-col md:flex-row'>
              <div className='flex-1'>
                <PokeAbility abilities={pokemon?.abilities} />
              </div>
              <div className='flex-1'>
                <PokeEggGroups eggGroups={species?.egg_groups} />
              </div>
            </div>
            <fieldset className='h-auto border-[1px] border-neutral-500 rounded-lg flex flex-col md:flex-row justify-evenly items-center'>
              <legend className='text-sm text-neutral-400 font-semibold px-1 ml-1'>Base Stats</legend>
              <div className='flex-1 flex items-center justify-center'>
                <PokePolygonStat
                  pokeType={pokemon?.types[0].type.name}
                  stat={{
                    hp: pokemon?.stats[0].base_stat,
                    atk: pokemon?.stats[1].base_stat,
                    def: pokemon?.stats[2].base_stat,
                    satk: pokemon?.stats[3].base_stat,
                    sdef: pokemon?.stats[4].base_stat,
                    spd: pokemon?.stats[5].base_stat,
                  }}
                />
              </div>
              <div className='flex-1 flex items-center justify-center mb-4'>
                <PokeRangeStat
                  pokeType={pokemon?.types[0].type.name}
                  stat={{
                    hp: pokemon?.stats[0].base_stat,
                    atk: pokemon?.stats[1].base_stat,
                    def: pokemon?.stats[2].base_stat,
                    satk: pokemon?.stats[3].base_stat,
                    sdef: pokemon?.stats[4].base_stat,
                    spd: pokemon?.stats[5].base_stat,
                  }}
                />
              </div>
            </fieldset>
            <PokeEvoChain evolutionChain={evolutionChain} loading={loading} />
          </div>
        </div>
      </div>
      <div className="hidden xl:block">
        { id < 905 ? (
          <PokeButton type="next" pokemon={nextPokemon} onClick={() => setId(id + 1)} loading={loading} />
        ) : (
          <div className="w-24"></div>
        )}
      </div>
      <BackToTopButton />
    </div>
  )
}

export default App
