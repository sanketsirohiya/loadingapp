import React from "react";
import { MyContext } from "../App";

export default class Generic extends React.Component {
  state = {
    obj: this.props.obj,
    error: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.obj.name !== prevState.obj.name) {
      return { obj: nextProps.obj, error: false };
    }
    return prevState;
  }

  render() {
    const { obj, error } = this.state;
    const re = new RegExp(obj.pattern);
    return (
      <MyContext.Consumer>
        {context => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>{obj.what} Details</label>
            <input
              type="text"
              defaultValue={
                context.state.final[
                  context.state.steps[context.state.finalCurrentStep].title
                ]
                  ? context.state.final[
                      context.state.steps[context.state.finalCurrentStep].title
                    ][obj.what]
                  : context.state.buffer[obj.what] || ""
              }
              onChange={e => {
                if (re.test(e.target.value)) {
                  context.bufferAdd(obj.what, e.target.value);
                  if (error === true) context.decFinalStepError();
                  this.setState({ error: false });
                } else {
                  if (error === false) context.incFinalStepError();
                  this.setState({ error: true });
                }
              }}
            />
            {error && (
              <p style={{ color: "red" }}>
                Please enter in correct format ({obj.pattern})
              </p>
            )}
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
