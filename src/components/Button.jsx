import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import axios from "axios";
import { ShinyIcon } from "./Icon";

export const PokeButton = (props) => {
    const { type, onClick, disabled, currentId } = props;

    const [loading, setLoading] = useState(false);
    const [pokemon, setPokemon] = useState(null);
    const id = type == "next" ? currentId + 1 : currentId - 1;

    useEffect(() => {

        let abortController = new AbortController();
    
        const loadPokemon = async () => {
          try {
            setLoading(true);
    
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`, {
              signal: abortController.signal
            }).then(response => setPokemon(response.data));

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

    return (
        <button type="button" className='w-24 h-40 bg-neutral-600 flex flex-col items-center justify-center rounded-lg border-2 border-neutral-700' onClick={onClick} disabled={disabled}>
          <div className="w-[40px] h-[40px] overflow-visible flex items-center justify-center">
            {loading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-neutral-300"></div> : <img className='scale-[1.5]' src={pokemon?.sprites.front_default} alt="" />}
          </div>
          <div className='text-neutral-300 capitalize mt-1'>{pokemon?.name}</div>
          <div className='text-neutral-400 text-sm font-semibold'>#{pokemon?.id.toString().padStart(3, '0')}</div>
          <div className="text-neutral-300 text-2xl mt-1">{ type == "next" ? <ChevronRight /> : <ChevronLeft /> }</div>
        </button>
    );
}

PokeButton.propTypes = {
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    currentId: PropTypes.number.isRequired,
}

export const ShinyButton = (props) => {

  const { isShiny, onClick, className } = props;

  return (
    <button type="button" onClick= {onClick} className={`${className} w-10 h-10 flex justify-center items-center rounded-full transition-all hover:scale-110 active:scale-100 ${!isShiny ? "bg-neutral-200" : "bg-yellow-300"}`}>
      <ShinyIcon className={`${!isShiny ? "fill-neutral-400" : "fill-yellow-50"}`} />
    </button>
  );
}

ShinyButton.propTypes = {
  isShiny: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
}