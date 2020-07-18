import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import './auto.css';
 
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '',};
  }
 
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    this.props.locationSuggestion(address)
    document.getElementsByClassName('location-search-input')[0].value = address;
    this.handleChange(address);
  };

  handleEnter = event => {
    this.props.handleSearch(event);
  }
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input 
              {...getInputProps({
                placeholder: 'Where are you located?',
                className: 'location-search-input',
                onKeyDown: this.handleEnter,
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                  >
                    <span className="autocomplete-suggetions">{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
export default LocationSearchInput;