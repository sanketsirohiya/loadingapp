import React from "react";
import Mytext from "./mytext";
import Mynumber from "./mynumber";
import Autocomplete from "./autocomplete";
import Geocomplete from "./geocomplete";
import Date from "./date";
import Time from "./time";
import DateTime from "./datetime";
import { MyContext } from "../App";

export default class FinalGeneric extends React.Component {
  state = {
    finalCurrentStep: this.props.finalCurrentStep,
    stepGeneric: this.props.stepGeneric
  };

  onClickNext = (e, context) => {
    e.preventDefault();
    if (!context.state.finalStepError) {
      const { finalCurrentStep } = this.state;
      e.target.reset();
      if (finalCurrentStep + 1 < context.state.stepCount) {
        this.setState({
          finalCurrentStep: finalCurrentStep + 1,
          stepGeneric: context.state.generic[finalCurrentStep + 1]
        });
        context.finalNextStep();
      } else {
        this.setState({
          finalCurrentStep: finalCurrentStep + 1
        });
        context.finalNextStep();
      }
      context.finalCurrentStepAdd(finalCurrentStep);
      context.clearBuffer();
      context.resetFinalStepError();
    }
  };

  onClickPrev = context => {
    const { finalCurrentStep } = this.state;
    if (context.state.finalCurrentStep > 0) {
      this.setState({
        finalCurrentStep: finalCurrentStep - 1,
        stepGeneric: context.state.generic[finalCurrentStep - 1]
      });
      context.finalPrevStep();
      context.clearBuffer();
      context.resetFinalStepError();
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.finalCurrentStep !== prevState.finalCurrentStep) {
      return {
        stepGeneric: nextProps.stepGeneric,
        finalCurrentStep: nextProps.finalCurrentStep
      };
    }
    return prevState;
  }

  render() {
    const buttonStyle = {
      background: "#E0E0E0",
      width: 200,
      padding: 16,
      textAlign: "center",
      margin: "0 auto",
      marginTop: 32
    };
    const { finalCurrentStep, stepGeneric } = this.state;

    console.log(finalCurrentStep, stepGeneric);
    return (
      <MyContext.Consumer>
        {context => {
          console.log(context);
          if (finalCurrentStep >= context.state.stepCount) return <h1>Done</h1>;
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <form onSubmit={e => this.onClickNext(e, context)}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {stepGeneric.map((key, index) => {
                    if (stepGeneric[index].type === "text")
                      return <Mytext obj={stepGeneric[index]} />;
                    if (stepGeneric[index].type === "number")
                      return <Mynumber obj={stepGeneric[index]} />;
                    if (stepGeneric[index].type === "autocomplete")
                      return <Autocomplete obj={stepGeneric[index]} />;
                    if (stepGeneric[index].type === "geocomplete")
                      return <Geocomplete obj={stepGeneric[index]} />;
                    if (stepGeneric[index].type === "date")
                      return <Date obj={stepGeneric[index]} />;
                    if (stepGeneric[index].type === "time")
                      return <Time obj={stepGeneric[index]} />;
                    if (stepGeneric[index].type === "date_time")
                      return <DateTime obj={stepGeneric[index]} />;
                    return null;
                  })}
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <button
                    type="button"
                    style={buttonStyle}
                    onClick={() => this.onClickPrev(context)}
                  >
                    Previous
                  </button>
                  <button type="submit" style={buttonStyle}>
                    {finalCurrentStep + 1 < context.state.stepCount
                      ? "Next"
                      : "Finish"}
                  </button>
                </div>
              </form>
            </div>
          );
        }}
      </MyContext.Consumer>
    );
  }
}
