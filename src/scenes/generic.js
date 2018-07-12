import React from "react";
import { MyContext } from "../App";

export default class Driver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkObj: this.props.checkObj,
      insideEvent: false
    };
  }

  onClickNext = (context, currentStepContext, currentStep) => {
    context.currentStepAdd(currentStepContext, currentStep);
    context.nextStep();
  };

  onClickPrev = context => {
    if (context.state.currentStep > 0) context.prevStep();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.checkObj !== prevState.checkObj && !prevState.insideEvent) {
      return { checkObj: nextProps.checkObj };
    }
    return prevState;
  }

  handleCheck = which => {
    this.setState({
      checkObj: {
        ...this.state.checkObj,
        [which]: !this.state.checkObj[which]
      },
      insideEvent: true
    });
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
    const { checkObj } = this.state;
    const currentStepContext = [];
    const { currentStep, title } = this.props;
    console.log(checkObj, currentStep, title);
    for (let i = 0; i < Object.keys(checkObj).length; i++) {
      currentStepContext.push({});
    }

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
              <div style={{ display: "flex", flexDirection: "row" }}>
                <label>
                  Unique {title.charAt(0).toUpperCase() + title.slice(1)}{" "}
                  Identifier :
                </label>

                {Object.keys(checkObj).map((key, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      value={title}
                      checked={checkObj[key]}
                      onChange={() => this.handleCheck(key)}
                    />
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                ))}

                {/* <input
                    type="checkbox"
                    value="name"
                    checked={checkObj.name}
                    onChange={() => {
                      this.handleCheck("name");
                    }}
                  />
                  Name
                </label>

                <label>
                  <input
                    type="checkbox"
                    value="phone"
                    checked={checkObj.phone}
                    onChange={() => {
                      this.handleCheck("phone");
                    }}
                  />
                  Phone No.
                </label>

                <label>
                  <input
                    type="checkbox"
                    value="license"
                    checked={checkObj.license}
                    onChange={() => {
                      this.handleCheck("license");
                    }}
                  />
                  License No. */}
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {Object.keys(checkObj).map((key, index) => {
                  if (checkObj[key]) {
                    return (
                      <div
                        style={{ display: "flex", flexDirection: "row" }}
                        key={index}
                      >
                        <p>Select Identifier : </p>
                        <select
                          value={
                            context.state.generic[currentStep] &&
                            context.state.generic[currentStep][index]
                              ? context.state.generic[currentStep][index].what
                              : null
                          }
                          onChange={e => {
                            currentStepContext[index].what = e.target.value;
                          }}
                        >
                          <option selected value="" disabled>
                            Select
                          </option>
                          {Object.keys(checkObj).map((key, index) => (
                            <option value={key}>{key}</option>
                          ))}

                          {/* <option value="name">Name</option>
                          <option value="phone">Phone No.</option>
                          <option value="license">License No.</option> */}
                        </select>

                        <p>Select type : </p>
                        <select
                          value={
                            context.state.generic[currentStep] &&
                            context.state.generic[currentStep][index]
                              ? context.state.generic[currentStep][index].type
                              : null
                          }
                          onChange={e => {
                            currentStepContext[index].type = e.target.value;
                          }}
                        >
                          <option selected value="" disabled>
                            Select
                          </option>
                          <option value="text">text</option>
                          <option value="number">number</option>
                        </select>

                        <p>Specify input name attribute : </p>
                        <select
                          value={
                            context.state.generic[currentStep] &&
                            context.state.generic[currentStep][index]
                              ? context.state.generic[currentStep][index].name
                              : null
                          }
                          onChange={e => {
                            currentStepContext[index].name = e.target.value;
                          }}
                        >
                          <option selected value="" disabled>
                            Select
                          </option>
                          {Object.keys(checkObj).map((key, index) => (
                            <option value={key}>{key}</option>
                          ))}

                          {/* <option value="name">Name</option>
                          <option value="phone">Phone No.</option>
                          <option value="license">License No.</option> */}
                        </select>

                        <p>Specify Pattern for Validation : </p>
                        <input
                          type="text"
                          value={
                            context.state.generic[currentStep] &&
                            context.state.generic[currentStep][index]
                              ? context.state.generic[currentStep][index]
                                  .pattern
                              : null
                          }
                          onChange={e => {
                            currentStepContext[index].pattern = e.target.value;
                          }}
                        />
                      </div>
                    );
                  }
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
                <button
                  type="button"
                  style={buttonStyle}
                  onClick={() =>
                    this.onClickNext(context, currentStepContext, currentStep)
                  }
                >
                  Next
                </button>
              </div>
            </React.Fragment>
          )}
        </MyContext.Consumer>
      </div>
    );
  }
}
