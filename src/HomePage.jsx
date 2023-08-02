import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { PokeFetchCard } from "./components/PokeCard"
import { PokePageButton } from "./components/Button"
import { useNavigate, useParams } from "react-router-dom"

const Homepage = () => {

    const { pokePage } = useParams();
    const navigate = useNavigate();

    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(parseInt(pokePage) || 1);

    const loadPokemons = useCallback(async () => {

        let abortController = new AbortController();

        try {
            setLoading(true);
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=21&offset=${(page - 1) * 21}`, {
                signal: abortController.signal
            });
            setPokemons(res.data.results);
        } catch (error) {
            if (!axios.isCancel(error)) {
                console.log("Something went wrong, ", error);
            }
        } finally {
            setLoading(false);
        }

        return () => { abortController.abort() }

    }, [page]);

    useEffect(() => {
        loadPokemons();
    }, [loadPokemons]);

    const handlePreviousClick = () => {
        setPage((prevPage) => prevPage - 1);
        navigate(`/${page - 1}`, {
            replace: true
        });
    }

    const handleNextClick = () => {
        setPage((prevPage) => prevPage + 1);
        navigate(`/${page + 1}`, {
            replace: true
        });
    }

    return (
        <div className="w-screen h-auto flex flex-col items-center">
            <div className="mb-5 flex flex-col items-center justify-center bg-red-700 w-full min-h-[10rem] rounded-b-2xl border-b-4 border-red-600">
                <div className="text-[4rem] text-neutral-200 font-semibold drop-shadow-text">Pokédex</div>
                <div className="text-[1rem] text-neutral-300 font-semibold">{"Latest data is up to Generation 8"}</div>
            </div>
            <div className="flex justify-between items-center w-full px-6">
                { page > 1 ? (<PokePageButton type="prev" onClick={handlePreviousClick} />) : (<div className="w-32"></div>) }
                { page < 44 ? (<PokePageButton type="next" onClick={handleNextClick} />) : (<div className="w-32"></div>) }
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
                { page > 1 ? (<PokePageButton type="prev" onClick={handlePreviousClick} />) : (<div className="w-32"></div>) }
                { page - 3 > 0 ? (
                    <>
                        <div className="text-neutral-400 font-semibold" onClick={() => {setPage(1); navigate(`/${1}`)}}>1</div>
                        <div className="text-neutral-400 font-semibold">...</div>
                    </>
                ) : null}
                <div className="text-neutral-400 font-semibold" onClick={() => {setPage(page - 2); navigate(`/${page - 2}`)}}>{page > 2 ? page - 2 : null}</div>
                <div className="text-neutral-400 font-semibold" onClick={() => {setPage(page - 1); navigate(`/${page - 1}`)}}>{page > 1 ? page - 1 : null}</div>
                <div className="text-neutral-300 font-bold">{page}</div>
                <div className="text-neutral-400 font-semibold" onClick={() => {setPage(page + 1); navigate(`/${page + 1}`)}}>{page < 44 ? page + 1 : null}</div>
                <div className="text-neutral-400 font-semibold" onClick={() => {setPage(page + 2); navigate(`/${page + 2}`)}}>{page < 43 ? page + 2 : null}</div>
            
                { 44 - page > 2 ? (
                    <>
                        <div className="text-neutral-400 font-semibold">...</div>
                        <div className="text-neutral-400 font-semibold" onClick={() => {setPage(44); navigate(`/${44}`)}}>44</div>
                    </>
                ) : null}
                { page < 44 ? (<PokePageButton type="next" onClick={handleNextClick} />) : (<div className="w-32"></div>) }
            </div>
            <div className="my-5">
                <div className="text-[1rem] text-neutral-300 font-semibold">{"Made by Shingetsu."}</div>
            </div>
        </div>
    )
}

export default Homepage;