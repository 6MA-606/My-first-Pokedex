import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { PokeFetchCard } from "./components/PokeCard"
import { PokePageButton } from "./components/Button"
import { useParams } from "react-router-dom"

const Pokedex = () => {

    const { pokePage } = useParams();

    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(parseInt(pokePage) || 1)

    const loadPokemons = useCallback(async () => {

        let abortController = new AbortController()

        try {
            setLoading(true);
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=21&offset=${(page - 1) * 21}`, {
                signal: abortController.signal
            });
            setPokemons(res.data.results);
        } catch (error) {
            if (!axios.isCancel(error)) {
                throw error
            }
        } finally {
            setLoading(false);
        }

        return () => { abortController.abort() }

    }, [page]);

    useEffect(() => {
        loadPokemons();
    }, [loadPokemons]);

    return (
        <div className="w-screen h-auto flex flex-col items-center">
            <div className="flex flex-col items-center justify-center bg-red-700 w-full min-h-[10rem] rounded-b-2xl border-b-4 border-red-600">
                <div className="text-[4rem] text-neutral-200 font-semibold drop-shadow-text">Pokédex</div>
                <div className="text-[1rem] text-neutral-300 font-semibold">{"Latest data is up to Generation 8"}</div>
            </div>
            <div className="py-6">
                {loading ? (
                    <div className="font-semibold text-neutral-300">Loading...</div>
                ) : (
                    <div className="grid grid-cols-3 gap-5">
                        {pokemons?.map((pokemon) => (
                            parseInt(((pokemon.url).split("/"))[6]) > 905 ? null :
                            <PokeFetchCard url={pokemon.url} key={pokemon.name} onClick={() => window.location.href = `/info/${parseInt(((pokemon.url).split("/"))[6])}`} />
                        ))}
                    </div>
                )}
            </div>
            <div className="flex justify-between items-center w-full px-6">
                { page > 1 ?  (<PokePageButton type="prev" onClick={() => { setPage(page - 1) }} />) : (<div className="w-32"></div>) }
                { page < 44 ? (<PokePageButton type="next" onClick={() => { setPage(page + 1) }} />) : (<div className="w-32"></div>) }
            </div>
            <div className="my-5">
                <div className="text-[1rem] text-neutral-300 font-semibold">{"Made by Shingetsu."}</div>
            </div>
        </div>
    )
}

export default Pokedex