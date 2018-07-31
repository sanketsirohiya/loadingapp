import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { MyContext } from "../App";

export default class Geo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: this.props.obj
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.obj.name !== prevState.obj.name) {
      return { obj: nextProps.obj };
    }
    return prevState;
  }

  handleSelect = (address, context) => {
    const { obj } = this.state;
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => context.bufferAdd(obj.what, { address, latLng }))
      .catch(error => console.error("Error", error));
  };

  render() {
    const { obj } = this.state;
    return (
      <MyContext.Consumer>
        {context => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>{obj.what} Details</label>
            <PlacesAutocomplete
              value={
                context.state.final[
                  context.state.steps[context.state.finalCurrentStep].title
                ]
                  ? context.state.final[
                      context.state.steps[context.state.finalCurrentStep].title
                    ][obj.what].address
                  : context.state.buffer[obj.what].address || ""
              }
              onSelect={address => this.handleSelect(address, context)}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className: "location-search-input"
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
