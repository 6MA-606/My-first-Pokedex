import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PokeType } from "./PokeInfo";

export const PokeFetchCard = (props) => {
  const { url, onClick } = props;

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadPokemon = useCallback(async () => {
    let abortController = new AbortController();

    try {
      setLoading(true);
      const res = await axios.get(url, {
        signal: abortController.signal,
      });
      setPokemon(res.data);
    } catch (error) {
      if (!axios.isCancel(error)) {
        throw error;
      }
    } finally {
      setLoading(false);
    }

    return () => {
      abortController.abort();
    };
  }, [url]);

  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]);

  return (
    <div
      className={`${
        onClick ? "cursor-pointer" : ""
      } w-[10rem] h-[12rem] md:w-[15rem] flex flex-col justify-center items-center bg-neutral-700 border-2 border-neutral-600 rounded-xl`}
      onClick={onClick}
    >
      {loading ? (
        <>
          <div className="flex my-1 gap-1 items-center">
            <div className="font-semibold w-[7rem] bg-neutral-600 rounded-md">
              &nbsp;
            </div>
          </div>
          <img
            className="bg-pokeball bg-center bg-no-repeat animate-spin"
            src={"/pokeball-bg.svg"}
            alt={"pokeball-bg"}
          />
          <div className="flex justify-center items-center gap-2 mb-1">
            <PokeType size={0.7} loading={loading} />
          </div>
        </>
      ) : (
        <>
          <div className="flex my-1 gap-1 items-center">
            <div className="capitalize font-semibold text-neutral-200">
              {pokemon?.name.split("-")[0]}
            </div>
            <div className="font-semibold text-neutral-400">
              {"#" + pokemon?.id.toString().padStart(3, "0")}
            </div>
          </div>
          <img
            className="bg-pokeball bg-center bg-no-repeat"
            src={pokemon?.sprites?.front_default}
            alt={pokemon?.name}
          />
          <div className="flex justify-center items-center gap-2 mb-1">
            {pokemon?.types?.map((type) => (
              <PokeType
                pokeType={type.type.name}
                key={type.type.name}
                size={0.7}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

PokeFetchCard.propTypes = {
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
