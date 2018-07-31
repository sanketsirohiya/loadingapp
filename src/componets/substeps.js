import React from "react";
import { MyContext } from "../App";

export default class Substeps extends React.Component {
  state = {
    steps: this.props.steps
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.steps !== prevState.steps) {
      return { steps: nextProps.steps };
    }
    return prevState;
  }

  setAttribute = (index, value) => {
    const { steps } = this.state;
    steps[index].attributeString = value;
    steps[index].attributeArray = value.split(",");
    this.setState({ steps });
  };

  setLabel = (index, value) => {
    const { steps } = this.state;
    steps[index].labelString = value;
    steps[index].labelArray = value.split(",");
    this.setState({ steps });
  };

  setTitle = (index, value) => {
    const { steps } = this.state;
    steps[index].title = value;
    this.setState({ steps });
  };

  handleSave = context => {
    const { steps } = this.state;
    context.setSteps(steps);
    if (context.state.disableApply === true) context.toggleDisableApply();
  };

  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            {context.state.steps.map((key, index) => (
              <React.Fragment key={index}>
                <label>
                  Title(Step {index + 1}):
                  <input
                    type="text"
                    value={this.state.steps[index].title}
                    onChange={e => {
                      this.setTitle(index, e.target.value);
                    }}
                  />
                  Enter attribute names (separated by comma):
                  <input
                    type="text"
                    value={this.state.steps[index].attributeString}
                    onChange={e => {
                      this.setAttribute(index, e.target.value);
                    }}
                  />
                  Enter attribute labels (separated by comma):
                  <input
                    type="text"
                    value={this.state.steps[index].labelString}
                    onChange={e => {
                      this.setLabel(index, e.target.value);
                    }}
                  />
                </label>
              </React.Fragment>
            ))}
            <button type="button" onClick={() => this.handleSave(context)}>
              Save
            </button>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
