import React from "react";
import { MyContext } from "../App";

export default class Substeps extends React.Component {
  state = {
    steps: this.props.steps
  };

  setAttribute = (index, value) => {
    const { steps } = this.state;
    steps[index].attributeString = value;
    steps[index].attributeArray = value.split(",");
    this.setState({ steps });
  };

  setTitle = (index, value) => {
    const { steps } = this.state;
    steps[index].title = value;
    this.setState({ steps });
  };

  handleSave = context => {
    const { steps } = this.state;
    const stepCount = context.state.stepCount;
    for (let i = 0; i < stepCount; i++) {
      for (let j = 0; j < steps[i].attributeArray.length; j++) {
        const attr = steps[i].attributeArray[j];
        steps[i].checkObj[attr] = false;
      }
    }
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
                  Enter attribute names (separated by commas):
                  <input
                    type="text"
                    value={this.state.steps[index].attributeString}
                    onChange={e => {
                      this.setAttribute(index, e.target.value);
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
