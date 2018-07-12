import React from "react";
import { MyContext } from "../App";

export default class Init extends React.Component {
  state = {
    stepCount: this.props.stepCount,
    stepChanged: false
  };

  setStepCount = (context, value) => {
    let stepChanged = false;
    if (context.state.stepCount !== value) stepChanged = true;
    this.setState({ stepCount: value, stepChanged });
  };

  handleSetStep = context => {
    const { stepCount, stepChanged } = this.state;
    if (stepChanged) {
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
      context.clearGeneric();
      context.setSteps(steps);
    }
    context.setStepCount(stepCount);
    if (context.state.disableSubsteps === true) context.toggleDisableSubsteps();
    this.setState({ stepChanged: false });
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
          {context => {
            console.log(context);
            return (
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
            );
          }}
        </MyContext.Consumer>
      </div>
    );
  }
}
