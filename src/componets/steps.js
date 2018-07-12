// @flow
import * as React from "react";
import Stepper from "react-stepper-horizontal";
// import Gps from "../scenes/gps";
// import Driver from "../scenes/driver";
// import Vehicle from "../scenes/vehicle";
// import Trip from "../scenes/trip";
import Generic from "../scenes/generic";
import { MyContext } from "../App";

type Props = {
  currentStep: number,
  steps: Array
};

class CurrStep extends React.Component<Props> {
  render() {
    const { currentStep, steps } = this.props;
    if (currentStep >= steps.length) return <h1>FINISH!</h1>;
    return (
      <Generic
        checkObj={steps[currentStep].checkObj}
        currentStep={currentStep}
        title={steps[currentStep].title}
      />
    );

    // if (currentStep === 0) {
    //   return <Gps />;
    // }
    // if (currentStep === 1) {
    //   return <Vehicle />;
    // }
    // if (currentStep === 2) {
    //   return <Driver />;
    // }
    // if (currentStep === 3) {
    //   return <Trip />;
    // }
    // return <h1>FINISH!</h1>;
  }
}

export default class Steps extends React.Component {
  state = {
    steps: this.props.steps
  };

  render() {
    const { steps } = this.state;
    return (
      <div style={{ flexDirection: "column" }}>
        <MyContext.Consumer>
          {context => {
            console.log(context);
            return (
              <React.Fragment>
                <Stepper steps={steps} activeStep={context.state.currentStep} />
                <CurrStep
                  currentStep={context.state.currentStep}
                  steps={steps}
                />
              </React.Fragment>
            );
          }}
        </MyContext.Consumer>
      </div>
    );
  }
}
