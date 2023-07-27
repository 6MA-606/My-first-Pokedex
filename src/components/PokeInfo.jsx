import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { RevolvingDot } from "react-loader-spinner";

const dataColors = (type) => {
  switch (type) {
    case "normal":
      return "#A8A77A";
    case "fire":
      return "#EE8130";
    case "water":
      return "#6390F0";
    case "electric":
      return "#F7D02C";
    case "grass":
      return "#7AC74C";
    case "ice":
      return "#96D9D6";
    case "fighting":
      return "#C22E28";
    case "poison":
      return "#A33EA1";
    case "ground":
      return "#E2BF65";
    case "flying":
      return "#A98FF3";
    case "psychic":
      return "#F95587";
    case "bug":
      return "#A6B91A";
    case "rock":
      return "#B6A136";
    case "ghost":
      return "#735797";
    case "dragon":
      return "#6F35FC";
    case "dark":
      return "#705746";
    case "steel":
      return "#B7B7CE";
    case "fairy":
      return "#D685AD";
    default:
      return "#A8A77A";
  }
};

export const PokeType = (props) => {
  const { poketype, size } = props;

  return (
    <div style={{ fontSize: (size || "1rem")}}>
      <div
        className={`bg-type-${poketype} rounded w-[6em] h-[1.75em] uppercase font-semibold text-[0.875em] text-white flex items-center justify-center`}
      >
        <div className="relative">
          <div className="translate-x-[0.09rem] translate-y-[0.09rem] text-black opacity-25">
            {poketype}
          </div>
          <div className="absolute -translate-y-5 text-white">{poketype}</div>
        </div>
      </div>
    </div>
  );
};

PokeType.propTypes = {
  poketype: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export const PokePolygonStat = (props) => {
  const { stat, pokeType } = props;

  const [data, setData] = useState([]);

  const typeColor = dataColors(pokeType);

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    markers: {
      size: 2,
      hover: {
        size: 4,
      },
    },
    yaxis: {
      show: false,
      min: 0,
      max: 255,
      tickAmount: 3,
    },
    xaxis: {
      categories: ["HP", "ATK", "DEF", "S.ATK", "S.DEF", "SPD"],
      labels: {
        show: true,
        style: {
          colors: "#000",
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
        offsetX: 0,
        offsetY: 3,
        rotate: 0,
      },
    },
  };

  useEffect(() => {
    if (stat?.hp === undefined) return;
    setData([
      {
        name: "Stat",
        data: [stat?.hp, stat?.atk, stat?.def, stat?.satk, stat?.sdef, stat?.spd],
        color: typeColor,
      },
    ]);
  }, [stat, typeColor]);

  return (
    <ReactApexChart
      options={options}
      series={data}
      type="radar"
      height={250}
      width={250}
    />
  );
};

PokePolygonStat.propTypes = {
  stat: PropTypes.object.isRequired,
  pokeType: PropTypes.string,
};

export const PokeRangeStat = (props) => {
  const { stat, pokeType } = props;

  return (
    <div className="bg-neutral-600 h-48 w-[20rem] rounded-lg">
      <div className="text-sm text-neutral-300 font-semibold text-right mr-4 mt-2">Total {stat?.hp + stat?.atk + stat?.def + stat?.satk + stat?.sdef + stat?.spd}</div>
      <div className="flex justify-center gap-2">
        <StatBar
          label="HP"
          value={stat?.hp}
          max={255}
          color={dataColors(pokeType)}
        />
        <StatBar
          label="ATK"
          value={stat?.atk}
          max={255}
          color={dataColors(pokeType)}
        />
        <StatBar
          label="DEF"
          value={stat?.def}
          max={255}
          color={dataColors(pokeType)}
        />
        <StatBar
          label="S.ATK"
          value={stat?.satk}
          max={255}
          color={dataColors(pokeType)}
        />
        <StatBar
          label="S.DEF"
          value={stat?.sdef}
          max={255}
          color={dataColors(pokeType)}
        />
        <StatBar
          label="SPD"
          value={stat?.spd}
          max={255}
          color={dataColors(pokeType)}
        />
      </div>
    </div>
  );
};

PokeRangeStat.propTypes = {
  stat: PropTypes.object.isRequired,
  pokeType: PropTypes.string,
};

export const StatBar = (props) => {
  const { label, value, max, color } = props;

  return (
    <div className="w-10">
      <div className="h-32 flex flex-col justify-end items-center">
        <div className="text-xs leading-none py-1 text-center text-white w-full transition-all duration-[1s] rounded-sm">
          {value}
        </div>
        <div
          className="text-xs leading-none py-1 text-center text-white w-full transition-all rounded-sm"
          style={{ background: `${color}`, height: `${(value / max) * 100}%` }}
        ></div>
      </div>
      <div className="text-xs font-semibold mt-1.5 leading-none text-center text-white">
        {label}
      </div>
    </div>
  );
};

StatBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  max: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export const PokeAbility = (props) => {
  const { abilities } = props;

  return (
    <div className="">
      <span className="text-sm text-neutral-400 font-semibold">Abilities</span>
      <div className="capitalize flex gap-2">
        {abilities?.map((ability, index) => (
          <div
            key={index}
            className="bg-neutral-800 w-32 h-11 flex flex-col justify-center items-center rounded-lg"
          >
            <div className="text-sm text-neutral-300">
              {ability.ability.name}
            </div>
            {ability.is_hidden ? (
              <div className="text-[0.6rem] text-neutral-400 capitalize">
                Hidden
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

PokeAbility.propTypes = {
  abilities: PropTypes.array,
};

export const PokeEggGroups = (props) => {

  const { eggGroups } = props;

  return (
    <div className="">
      <span className="text-sm text-neutral-400 font-semibold">Egg Groups</span>
      <div className="capitalize flex gap-2 my-2">
        {eggGroups?.map((eggGroup, index) => (
          <div key={index} className={`bg-egg-${eggGroup.name} rounded w-20 font-semibold text-sm text-white flex items-center justify-center`}>
            <div className="relative">
              <div className="translate-x-[0.09rem] translate-y-[0.09rem] text-black opacity-25">
                {eggGroup.name}
              </div>
              <div className="absolute -translate-y-5 text-white">{eggGroup.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

PokeEggGroups.propTypes = {
  eggGroups: PropTypes.array,
};

export const PokeEvoChain = (props) => {

  const { species } = props;

  const [loading, setLoading] = useState(false);
  const [evolutionChain, setEvolutionChain] = useState(null);
  
  useEffect(() => {
    
    let abortController = new AbortController();

    const fetchEvoChain = async () => {
      setLoading(true);
      try {
        await axios.get(species?.evolution_chain?.url , {
          signal: abortController.signal
        }).then((res) => {
          setEvolutionChain(res.data)
          console.log(res.data)
        });
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Something went wrong, ", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvoChain();

    return () => {
      abortController.abort();
    };
  }, [species]);

  return (
    <div className="">
      {evolutionChain?.chain?.evolves_to[0] === undefined ? null : (
        <>
          <span className="text-sm text-neutral-400 font-semibold">Evolution Chain</span>
          <div className="flex justify-center gap-2 my-2">
            {loading ? (
              <div className="text-sm text-neutral-300 font-semibold">Loading...</div>
            ) : (
              <div className="text-sm text-neutral-300 font-semibold flex gap-2">
                <PokeEvoDiagram species={species} evoChain={evolutionChain} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

PokeEvoChain.propTypes = {
  species: PropTypes.object,
};

const PokeEvoDiagram = (props) => {

  const { species, evoChain } = props;

  const evoTrigger = (evoDetail, name) => {

    let triggers = [];

    if (evoDetail?.trigger?.name === "level-up") {
      if (evoDetail?.min_happiness !== null) {
        triggers.push(`High friendship`);
      }
      if (evoDetail?.min_level !== null) {
        triggers.push(`Level ${evoDetail?.min_level}`);
      }
      if (evoDetail?.min_beauty !== null) {
        triggers.push(`High beauty`);
      }
      if (evoDetail?.min_affection !== null) {
        triggers.push(`High affection`);
      }
    }

    if (evoDetail?.trigger?.name === "use-item") {
      triggers.push(`Use ${evoDetail?.item?.name}`);

      let gender = evoDetail?.gender;
      if (gender !== null) {
        triggers.push(`Gender ${gender === 1 ? "Female" : "Male"}`);
      }
    }

    if (evoDetail?.trigger?.name === "trade") {
      triggers.push(`Trade`);
    }

    if (evoDetail?.trigger?.name === "shed") {
      triggers.push(`Shed`);
    }

    if (evoDetail?.trigger?.name === "other") {
      triggers.push(`Other`);
    }

    switch (evoDetail?.time_of_day) {
      case "day":
        triggers.push(` in day time`);
        break;
      case "night":
        triggers.push(` in night time`);
        break;
      default:
        break;
    }

    if (name === "leafeon" || name === "glaceon") {
      triggers.push(`Use ${name === "leafeon" ? "Leaf\u00A0stone" : "Ice\u00A0stone"}`);
      triggers.push(`or level up near an ${name === "leafeon" ? "Moss\u00A0Rock" : "Ice\u00A0Rock"}`);
    }

    if (name === "sylveon") {
      triggers = [];
      triggers.push(`Level up with high friendship`);
      triggers.push(`and know a Fairy-type move`);
    }

    return (
      <div className="text-[0.6rem] text-neutral-400 text-center leading-4">
        {triggers.map((trigger, index) => (
          <div key={index}>{trigger}</div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center gap-5">
        {evoChain?.chain?.species?.name === "eevee" ? (
          evoChain?.chain?.evolves_to?.map((evo, index) => (
            <PokeCardMini key={index} pokeId={(evoChain?.chain?.species?.url)?.split("/")[6]} pokeName={evoChain?.chain?.species?.name} />
          ))
        ) : (
          <PokeCardMini pokeId={(evoChain?.chain?.species?.url)?.split("/")[6]} pokeName={evoChain?.chain?.species?.name} />
        )}
      </div>

      <div className="flex flex-col gap-5">
        {evoChain?.chain?.evolves_to?.length > 0 ? (
          evoChain?.chain?.evolves_to?.map((evo, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center">
                <div className="flex">
                  <div className="w-[7rem] h-20 flex flex-col justify-center items-center">
                    <div>{evoTrigger(evo?.evolution_details[0], evo?.species?.name)}</div>
                    <ArrowRight className="text-neutral-400 text-xl" />
                  </div>
                  <PokeCardMini pokeId={evo?.species?.url.split("/")[6]} pokeName={evo?.species?.name} />
                </div>
                <div className="flex flex-col gap-5">
                  {evo?.evolves_to?.length > 0 ? (
                    evo?.evolves_to?.map((evo, index) => (
                      <div key={index} className="flex">
                        <div className="w-[7rem] h-20 flex flex-col justify-center items-center">
                          <div>{evoTrigger(evo?.evolution_details[0])}</div>
                          <ArrowRight className="text-neutral-400 text-xl" />
                        </div>
                        <PokeCardMini pokeId={evo?.species?.url.split("/")[6]} pokeName={evo?.species?.name} />
                      </div>
                    ))
                  ) : null}
                </div>
              </div>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};

PokeEvoDiagram.propTypes = {
  species: PropTypes.object,
  evoChain: PropTypes.object,
};

export const PokeCardMini = (props) => {

  const { pokeId, pokeName } = props;

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
 
    let abortController = new AbortController();

    const fetchPokeType = async () => {
      try {
        setLoading(true);
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`, {
          signal: abortController.signal
        }).then((res) => {
          setPokemon(res.data);
        });
      } catch (error) {
        if (!axios.isCancel(error)) console.error("Something went wrong, ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokeType();

    return () => {
      abortController.abort();
    }

  }, [pokeId]);

  return (
    <div className="flex flex-col items-center gap-1 w-20">
      <div className="bg-neutral-800 w-20 h-20 flex flex-col justify-center items-center rounded-lg">
        {!pokemon?.sprites?.front_default ? (
          <div className="w-20 h-20 flex justify-center items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-neutral-300"></div>
          </div>
        ) : (
          <img
            className="w-20 h-20"
            src={pokemon?.sprites?.front_default}
            alt={pokeName}
          />
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <div className="text-sm text-neutral-300 font-semibold capitalize whitespace-nowrap">{pokeName}</div>
        <div className="text-xs text-neutral-400">#{pokeId?.toString().padStart(3, '0')}</div>
      </div>
      <div className="flex gap-1 h-4">
        {pokemon?.types?.map((type, index) => (
          <PokeType key={index} poketype={type.type.name} size={"0.6rem"} />
        ))}
      </div>
    </div>
  );
};

PokeCardMini.propTypes = {
  pokeId: PropTypes.string,
  pokeName: PropTypes.string,
};