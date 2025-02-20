import React from 'react';
import PropTypes from 'prop-types';
import '../style/pokecard.css';

const PkmnTypeColors = {
  "NORMAL": "#A8A878",
  "FEU": "#FD6C6C",
  "EAU": "#76BDFB",
  "PLANTE": "#78C850",
  "ÉLECTRIQUE": "#FED86E",
  "GLACE": "#98D8D8",
  "COMBAT": "#C03028",
  "POISON": "#A040A0",
  "SOL": "#E0C068",
  "VOL": "#A890F0",
  "PSY": "#F85888",
  "INSECTE": "#A8B820",
  "ROCHE": "#B8A038",
  "SPECTRE": "#705898",
  "DRAGON": "#7038F8",
  "TÉNÈBRES": "#705848",
  "ACIER": "#B8B8D0",
  "FÉE": "#EE99AC"
};

const TypeTranslation = {
  "normal": "NORMAL",
  "fire": "FEU",
  "water": "EAU",
  "grass": "PLANTE",
  "electric": "ÉLECTRIQUE",
  "ice": "GLACE",
  "fighting": "COMBAT",
  "poison": "POISON",
  "ground": "SOL",
  "flying": "VOL",
  "psychic": "PSY",
  "bug": "INSECTE",
  "rock": "ROCHE",
  "ghost": "SPECTRE",
  "dragon": "DRAGON",
  "dark": "TÉNÈBRES",
  "steel": "ACIER",
  "fairy": "FÉE"
};

function getColorByType(type) {
  const translatedType = TypeTranslation[type.toLowerCase()] || type.toUpperCase();
  return PkmnTypeColors[translatedType] || "#FFFFFF";
}

const PokemonCard = ({ name, type1, type2, imageUrl, secondImageUrl }) => {
  const color = getColorByType(type1);

  return (
    <div className="pokemon-card" style={{ backgroundColor: color }}>
      <h2 className="pokemon-name">{name}</h2>
      <div className="pokemon-content">
        <div className="left-section">
          <span className="pokemoncard-pokemon-type">{type1}</span>
          {type2 && <span className="pokemoncard-pokemon-type">{type2}</span>}
        </div>
        <div className="right-section">
          {secondImageUrl && (
            <img
              src={secondImageUrl}
              alt={`${name} second`}
              className="pokemon-image-second"
            />
          )}
          <img src={imageUrl} alt={`${name} main`} className="pokemon-image" />
        </div>
      </div>
    </div>
  );
};

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
  type1: PropTypes.string.isRequired,
  type2: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  secondImageUrl: PropTypes.string,
};

PokemonCard.defaultProps = {
  type2: '',
  secondImageUrl: '',
};

export default PokemonCard;
