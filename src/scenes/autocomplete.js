import React from "react";
import "react-select/dist/react-select.css";
import { Async } from "react-select";
import { MyContext } from "../App";

export default class Auto extends React.Component {
  state = {
    obj: this.props.obj
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.obj.name !== prevState.obj.name) {
      return { obj: nextProps.obj };
    }
    return prevState;
  }

  handleChange = (selectedOption, context) => {
    const { obj } = this.state;
    context.bufferAdd(obj.what, selectedOption);
  };

  render() {
    const { obj } = this.state;
    const getOptions = input =>
      fetch(obj.pattern)
        .then(response => response.json())
        .then(json => {
          const demo = json.map(user => ({ value: user.id, label: user.id }));
          console.log(demo);
          return { options: demo };
        });
    return (
      <MyContext.Consumer>
        {context => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>{obj.what} Details</label>
            <Async
              name="form-field-name"
              value={
                context.state.final[
                  context.state.steps[context.state.finalCurrentStep].title
                ]
                  ? context.state.final[
                      context.state.steps[context.state.finalCurrentStep].title
                    ][obj.what]
                  : context.state.buffer[obj.what] || ""
              }
              loadOptions={getOptions}
              onChange={selectedOption =>
                this.handleChange(selectedOption, context)
              }
            />
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
