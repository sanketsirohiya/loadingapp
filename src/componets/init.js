import React from "react";
import { MyContext } from "../App";

export default class Init extends React.Component {
  state = {
    stepCount: this.props.stepCount
  };

  setStepCount = (context, value) => {
    if (context.state.stepCount === value) {
      context.falseStepChanged();
    } else {
      context.trueStepChanged();
    }
    this.setState({ stepCount: value });
  };

  handleSetStep = context => {
    const { stepCount } = this.state;
    if (context.state.stepChanged) {
      const steps = [];
      for (let i = 0; i < stepCount; i++) {
        steps.push({
          title: "",
          attributeString: "",
          attributeArray: [],
          checkObj: {}
        });
      }
      console.log(steps);
      context.setSteps(steps);
    }
    context.setStepCount(stepCount);
    if (context.state.disableSubsteps === true) context.toggleDisableSubsteps();
  };

  render() {
    const buttonStyle = {
      background: "#E0E0E0",
      width: 200,
      padding: 16,
      textAlign: "center",
      margin: "0 auto",
      marginTop: 32
    };
    console.log("rerendered");
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <MyContext.Consumer>
          {context => (
            <React.Fragment>
              <React.Fragment>
                <label>
                  Enter the number of steps in your form:
                  <input
                    type="text"
                    value={this.state.stepCount}
                    onChange={e => {
                      this.setStepCount(context, e.target.value);
                    }}
                  />
                </label>
              </React.Fragment>
              <button
                type="button"
                style={buttonStyle}
                onClick={() => this.handleSetStep(context)}
              >
                Set Steps
              </button>
            </React.Fragment>
          )}
        </MyContext.Consumer>
      </div>
    );
  }
}
