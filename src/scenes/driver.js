// @flow
import React from "react";
import { MyContext } from "../App";

export default class Driver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkObj: {
        name: false,
        phone: false,
        license: false
      }
    };
  }

  onClickNext = (context, driverContext) => {
    context.driverAdd(driverContext);
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
    const driverContext = [{}, {}, {}];
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
                  Unique Driver Identifier :
                  <input
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
                  License No.
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
                              context.state.driver[index]
                                ? context.state.driver[index].what
                                : null
                            }
                            onChange={e => {
                              driverContext[index].what = e.target.value;
                            }}
                          >
                            <option selected value="" disabled>
                              Select
                            </option>
                            <option value="name">Name</option>
                            <option value="phone">Phone No.</option>
                            <option value="license">License No.</option>
                          </select>
                        </div>

                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <p>Select type : </p>
                          <select
                            value={
                              context.state.driver[index]
                                ? context.state.driver[index].type
                                : null
                            }
                            onChange={e => {
                              driverContext[index].type = e.target.value;
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
                              context.state.driver[index]
                                ? context.state.driver[index].name
                                : null
                            }
                            onChange={e => {
                              driverContext[index].name = e.target.value;
                            }}
                          >
                            <option selected value="" disabled>
                              Select
                            </option>
                            <option value="name">Name</option>
                            <option value="phone">Phone No.</option>
                            <option value="license">License No.</option>
                          </select>
                        </div>

                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <p>Specify Pattern for Validation : </p>
                          <input
                            type="text"
                            value={
                              context.state.driver[index]
                                ? context.state.driver[index].pattern
                                : null
                            }
                            onChange={e => {
                              driverContext[index].pattern = e.target.value;
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
                  onClick={() => this.onClickNext(context, driverContext)}
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
