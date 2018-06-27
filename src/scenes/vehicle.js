// @flow
import React from "react";
import { MyContext } from "../componets/steps";

export default class Vehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkObj: {
        registration: false,
        insurance: false
      }
    };
  }

  onClickNext = (context, vehicleContext) => {
    context.vehicleAdd(vehicleContext);
    context.nextStep();
  };

  onClickPrev = context => {
    context.prevStep();
  };

  handleCheck = which => {
    const { checkObj } = this.state;
    this.setState({ checkObj: { ...checkObj, [which]: !checkObj[which] } });
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
    const vehicleContext = [{}, {}];
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
                  Unique Vehicle Identifier :
                  <input
                    type="checkbox"
                    value="registration"
                    checked={checkObj.registration}
                    onChange={() => {
                      this.handleCheck("registration");
                    }}
                  />
                  Registration No.
                </label>

                <label>
                  <input
                    type="checkbox"
                    value="insurance"
                    checked={checkObj.insurance}
                    onChange={() => {
                      this.handleCheck("insurance");
                    }}
                  />
                  Insurance No.
                </label>
              </div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                {Object.keys(checkObj).map((key, index) => {
                  if (checkObj[key]) {
                    return (
                      <div
                        style={{ display: "flex", flexDirection: "column" }}
                        key={index}
                      >
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <p>Select Identifier : </p>
                          <select
                            value={
                              context.state.vehicle[index]
                                ? context.state.vehicle[index].what
                                : null
                            }
                            onChange={e => {
                              vehicleContext[index].what = e.target.value;
                            }}
                          >
                            <option selected value="" disabled>
                              Select
                            </option>
                            <option value="registration">
                              Registration No.
                            </option>
                            <option value="insurance">Insurance No.</option>
                          </select>
                        </div>

                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <p>Select type : </p>
                          <select
                            value={
                              context.state.vehicle[index]
                                ? context.state.vehicle[index].type
                                : null
                            }
                            onChange={e => {
                              vehicleContext[index].type = e.target.value;
                            }}
                          >
                            <option selected value="" disabled>
                              Select
                            </option>
                            <option value="text">text</option>
                            <option value="number">number</option>
                          </select>
                        </div>

                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <p>Specify input name attribute : </p>
                          <select
                            value={
                              context.state.vehicle[index]
                                ? context.state.vehicle[index].name
                                : null
                            }
                            onChange={e => {
                              vehicleContext[index].name = e.target.value;
                            }}
                          >
                            <option selected value="" disabled>
                              Select
                            </option>
                            <option value="registration">
                              Registration No.
                            </option>
                            <option value="insurance">Insurance No.</option>
                          </select>
                        </div>

                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <p>Specify Pattern for Validation : </p>
                          <input
                            type="text"
                            value={
                              context.state.vehicle[index]
                                ? context.state.vehicle[index].pattern
                                : null
                            }
                            onChange={e => {
                              vehicleContext[index].pattern = e.target.value;
                            }}
                          />
                        </div>
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
                  onClick={() => this.onClickNext(context, vehicleContext)}
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
