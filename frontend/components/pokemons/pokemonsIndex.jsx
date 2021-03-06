var React = require('react');
var PokemonStore = require('../../stores/pokemon.js');
var ApiUtil = require('../../util/apiUtil.js');
var PokemonIndexItem = require('./pokemonIndexItem.jsx');

var PokemonsIndex = React.createClass({

  getInitialState: function() {
    return {
      pokemons: PokemonStore.all()
    };
  },

  _updateState: function() {
    this.setState({
      pokemons: PokemonStore.all()
    });
  },

  componentWillUnmount: function() {
    this.pokemonToken.remove();
  },

  componentDidMount: function() {
    this.pokemonToken = PokemonStore.addListener(this._updateState);
    ApiUtil.fetchAllPokemons();
  },

  render: function() {
    var pokemonsLi = this.state.pokemons.map(function(pokemon) {
      return (
          <PokemonIndexItem key={pokemon.id} pokemon={pokemon}  />
      )
    });
    return (
      <ul>
        {pokemonsLi}
      </ul>
    );
  }

});

module.exports = PokemonsIndex;
