import * as React from "react";
import Stepper from "react-stepper-horizontal";
import { MyContext } from "../App";
import FinalGeneric from "../scenes/finalgeneric";

export default class extends React.Component {
  state = {
    steps: this.props.steps,
    finalCurrentStep: this.props.finalCurrentStep,
    generic: this.props.generic
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.finalCurrentStep !== prevState.finalCurrentStep) {
      return {
        steps: nextProps.steps,
        finalCurrentStep: nextProps.finalCurrentStep,
        generic: nextProps.generic
      };
    }
    return prevState;
  }

  render() {
    const { steps, generic, finalCurrentStep } = this.state;
    return (
      <div style={{ flexDirection: "column" }}>
        <MyContext.Consumer>
          {context => (
            <React.Fragment>
              <Stepper steps={steps} activeStep={finalCurrentStep} />
              <FinalGeneric
                finalCurrentStep={finalCurrentStep}
                stepGeneric={generic[finalCurrentStep]}
              />
            </React.Fragment>
          )}
        </MyContext.Consumer>
      </div>
    );
  }
}
