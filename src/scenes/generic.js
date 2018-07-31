import React from "react";
import { MyContext } from "../App";
import MySelect from "../componets/myselect";

export default class Generic extends React.Component {
  state = {
    currentStep: this.props.currentStep,
    attributeArray: this.props.attributeArray
  };

  onClickNext = (e, context, currentStep) => {
    e.preventDefault();
    e.target.reset();
    context.currentStepAdd(currentStep);
    context.nextStep();
    context.clearGenericBuffer();
  };

  onClickPrev = context => {
    if (context.state.currentStep > 0) {
      context.prevStep();
      context.clearGenericBuffer();
    }
  };

  onClickFinish = (context, currentStep) => {
    context.currentStepAdd(currentStep);
    context.toggleDisableFinal();
    context.setCurrentStep(0);
    context.clearGenericBuffer();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.currentStep !== prevState.currentStep) {
      return {
        currentStep: nextProps.currentStep,
        attributeArray: nextProps.attributeArray
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

    const { currentStep, attributeArray } = this.state;
    console.log("generic rerendered");
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
            if (context.state.genInit) {
              if (!context.state.generic[currentStep]) {
                for (let i = 0; i < attributeArray.length; i++) {
                  context.genericBufferInit();
                }
              } else {
                context.genericBufferInitSame();
              }
              context.falseGenInit();
            }
            console.log(attributeArray, context.state.genericbuffer);

            return (
              <form onSubmit={e => this.onClickNext(e, context, currentStep)}>
                <React.Fragment>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {attributeArray.map((key, index) => (
                      <div
                        style={{ display: "flex", flexDirection: "row" }}
                        key={index}
                      >
                        <p>Select Identifier : </p>
                        <MySelect
                          val={
                            context.state.generic[currentStep]
                              ? context.state.generic[currentStep][index]
                                  .what || ""
                              : context.state.genericbuffer[index].what || ""
                          }
                          onChange={e =>
                            context.genericBufferAdd(
                              index,
                              "what",
                              e.target.value
                            )
                          }
                          attributeArray={attributeArray}
                          index={index}
                        />

                        <p>Select type : </p>
                        <MySelect
                          val={
                            context.state.generic[currentStep]
                              ? context.state.generic[currentStep][index]
                                  .type || ""
                              : context.state.genericbuffer[index].type || ""
                          }
                          onChange={e =>
                            context.genericBufferAdd(
                              index,
                              "type",
                              e.target.value
                            )
                          }
                          attributeArray={[
                            "text",
                            "number",
                            "date",
                            "time",
                            "date_time",
                            "autocomplete",
                            "geocomplete"
                          ]}
                          index={index}
                        />

                        <p>Specify input name attribute : </p>
                        <MySelect
                          val={
                            context.state.generic[currentStep]
                              ? context.state.generic[currentStep][index]
                                  .name || ""
                              : context.state.genericbuffer[index].name || ""
                          }
                          onChange={e =>
                            context.genericBufferAdd(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          attributeArray={attributeArray}
                          index={index}
                        />

                        <p>Specify Pattern/api (optional) : </p>
                        <input
                          type="text"
                          defaultValue={
                            context.state.generic[currentStep]
                              ? context.state.generic[currentStep][index]
                                  .pattern || ""
                              : context.state.genericbuffer[index].pattern || ""
                          }
                          onChange={e =>
                            context.genericBufferAdd(
                              index,
                              "pattern",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <button
                      type="button"
                      style={buttonStyle}
                      onClick={() => this.onClickPrev(context)}
                    >
                      Previous
                    </button>
                    {currentStep + 1 < context.state.stepCount ? (
                      <button
                        type="submit"
                        style={buttonStyle}
                        // onClick={() =>
                        //   this.onClickNext(
                        //     context,
                        //     currentStepContext,
                        //     currentStep
                        //   )
                        // }
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="button"
                        style={buttonStyle}
                        onClick={() => this.onClickFinish(context, currentStep)}
                      >
                        Finish
                      </button>
                    )}
                  </div>
                </React.Fragment>
              </form>
            );
          }}
        </MyContext.Consumer>
      </div>
    );
  }
}
