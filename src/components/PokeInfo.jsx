import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

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
  const { poketype } = props;

  return (
    <div
      className={`bg-type-${poketype} py-0.5 rounded w-20 uppercase font-semibold text-sm text-white flex items-center justify-center`}
    >
      <div>
        <div className="translate-x-[0.09rem] translate-y-[0.09rem] text-black opacity-25">
          {poketype}
        </div>
        <div className="absolute -translate-y-5 text-white">{poketype}</div>
      </div>
    </div>
  );
};

PokeType.propTypes = {
  poketype: PropTypes.string.isRequired,
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
    <div className="my-2">
      <span className="text-sm text-neutral-400 font-semibold">Abilities:</span>
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
