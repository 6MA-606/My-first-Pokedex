import { ArrowUp, ChevronLeft, ChevronRight, ShinyIcon } from "./Icon";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export const PokeButton = (props) => {
  const { type, onClick, loading, pokemon } = props;

  return (
    <button
      type="button"
      className="w-24 h-40 bg-neutral-600 flex flex-col items-center justify-center rounded-lg border-2 border-neutral-700"
      onClick={onClick}
      disabled={loading}
    >
      <div className="w-[40px] h-[40px] overflow-visible flex items-center justify-center">
        {loading ? (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-neutral-300"></div>
        ) : (
          <img
            className="scale-[1.5]"
            src={pokemon?.sprites.front_default}
            alt=""
          />
        )}
      </div>
      <div className="text-neutral-300 capitalize mt-1">{pokemon?.name}</div>
      <div className="text-neutral-400 text-sm font-semibold">{`#${pokemon?.id
        .toString()
        .padStart(3, "0")}`}</div>
      <div className="text-neutral-300 text-2xl mt-1">
        {type == "next" ? <ChevronRight /> : <ChevronLeft />}
      </div>
    </button>
  );
};

PokeButton.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  pokemon: PropTypes.object,
};

export const PokeButtonMini = (props) => {
  const { type, onClick, loading, pokemon } = props;

  return (
    <button
      type="button"
      className="px-2 h-12 bg-neutral-600 flex items-center justify-between rounded-lg border-2 border-neutral-700"
      onClick={onClick}
      disabled={loading}
    >
      <div className="text-neutral-300 text-2xl mx-1">
        {type == "previous" ? <ChevronLeft /> : null}
      </div>
      <div className="flex justify-center items-baseline gap-1">
        <div className="text-neutral-300 capitalize">{pokemon?.name}</div>
        <div className="text-neutral-400 text-sm font-semibold flex justify-center items-center">{`#${pokemon?.id
          .toString()
          .padStart(3, "0")}`}</div>
      </div>
      <div className="text-neutral-300 text-2xl mx-1">
        {type == "next" ? <ChevronRight /> : null}
      </div>
    </button>
  );
};

PokeButtonMini.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  pokemon: PropTypes.object,
};

export const ShinyButton = (props) => {
  const { isShiny, onClick, className } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} w-10 h-10 flex justify-center items-center rounded-lg border-2 transition-all hover:scale-110 active:scale-100 ${
        !isShiny
          ? "bg-neutral-200 border-neutral-500"
          : "bg-yellow-300 border-yellow-500"
      }`}
    >
      <ShinyIcon
        className={`${!isShiny ? "fill-neutral-400" : "fill-yellow-50"}`}
      />
    </button>
  );
};

ShinyButton.propTypes = {
  isShiny: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export const BackToTopButton = () => {
  const [show, setShow] = useState(false);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, []);

  return (
    <div
      className={`fixed bottom-10 right-10 bg-red-700 text-white text-2xl rounded-full p-5 cursor-pointer shadow ${
        show ? "block" : "hidden"
      }`}
      onClick={handleBackToTop}
    >
      <ArrowUp />
    </div>
  );
};

export const PokePageButton = (props) => {
  const { type, onClick, loading } = props;

  return (
    <button
      type="button"
      className="w-32 h-10 bg-neutral-600 flex items-center justify-between rounded-lg border-2 border-neutral-700 text-neutral-300"
      onClick={onClick}
      disabled={loading}
    >
      {type == "next" ? (
        <>
          <div className="font-semibold w-32">{"Next"}</div>
          <div className="text-2xl">
            <ChevronRight />
          </div>
        </>
      ) : (
        <>
          <div className="text-2xl">
            <ChevronLeft />
          </div>
          <div className="font-semibold w-32">{"Previous"}</div>
        </>
      )}
    </button>
  );
};

PokePageButton.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
