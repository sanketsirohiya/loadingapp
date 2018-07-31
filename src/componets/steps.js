import * as React from "react";
import Stepper from "react-stepper-horizontal";
import Generic from "../scenes/generic";
import { MyContext } from "../App";

export default class Steps extends React.Component {
  state = {
    steps: this.props.steps,
    currentStep: this.props.currentStep
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.currentStep !== prevState.currentStep) {
      return { steps: nextProps.steps, currentStep: nextProps.currentStep };
    }
    return prevState;
  }

  render() {
    const { steps, currentStep } = this.state;
    return (
      <div style={{ flexDirection: "column" }}>
        <MyContext.Consumer>
          {context => {
            console.log(context);
            return (
              <React.Fragment>
                <Stepper steps={steps} activeStep={currentStep} />
                <Generic
                  currentStep={currentStep}
                  attributeArray={steps[currentStep].attributeArray}
                />
              </React.Fragment>
            );
          }}
        </MyContext.Consumer>
      </div>
    );
  }
}
