// @flow
import React from "react";
import { MyContext } from "../App";

export default class Driver extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      checkObj: {
        origin: false,
        destination: false,
        consigner: false,
        consinee: false,
        invoice: false,
        start_date: false,
        duration: false,
        eta: false
      }
    };
  }

  onClickNext = (context, tripContext) => {
    context.tripAdd(tripContext);
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
    const tripContext = [{}, {}, {}, {}, {}, {}, {}, {}];
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
            return (
              <React.Fragment>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <label>
                    Unique Driver Identifier :
                    <input
                      type="checkbox"
                      value="origin"
                      checked={checkObj.origin}
                      onChange={() => {
                        this.handleCheck("origin");
                      }}
                    />
                    Origin
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      value="destination"
                      checked={checkObj.destination}
                      onChange={() => {
                        this.handleCheck("destination");
                      }}
                    />
                    Destination
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      value="consigner"
                      checked={checkObj.consigner}
                      onChange={() => {
                        this.handleCheck("consigner");
                      }}
                    />
                    Consigner
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      value="consignee"
                      checked={checkObj.consignee}
                      onChange={() => {
                        this.handleCheck("consignee");
                      }}
                    />
                    Consignee
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      value="invoice"
                      checked={checkObj.invoice}
                      onChange={() => {
                        this.handleCheck("invoice");
                      }}
                    />
                    Invoice No.
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      value="start_date"
                      checked={checkObj.start_date}
                      onChange={() => {
                        this.handleCheck("start_date");
                      }}
                    />
                    Start Date
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      value="duration"
                      checked={checkObj.duration}
                      onChange={() => {
                        this.handleCheck("duration");
                      }}
                    />
                    Duration
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      value="eta"
                      checked={checkObj.eta}
                      onChange={() => {
                        this.handleCheck("eta");
                      }}
                    />
                    E.T.A
                  </label>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    overflow: "auto",
                    whiteSpace: "no-wrap"
                  }}
                >
                  {Object.keys(checkObj).map((key, index) => {
                    if (checkObj[key]) {
                      return (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                          key={index}
                        >
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <p>Select Identifier : </p>
                            <select
                              value={
                                context.state.trip[index]
                                  ? context.state.trip[index].what
                                  : null
                              }
                              onChange={e => {
                                tripContext[index].what = e.target.value;
                              }}
                            >
                              <option selected value="" disabled>
                                Select
                              </option>
                              <option value="origin">Origin</option>
                              <option value="destination">Destination</option>
                              <option value="consigner">Consigner</option>
                              <option value="consignee">Consignee</option>
                              <option value="invoice">Invoice No.</option>
                              <option value="start_date">Start Date</option>
                              <option value="duration">Duration</option>
                              <option value="eta">E.T.A</option>
                            </select>
                          </div>

                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <p>Select type : </p>
                            <select
                              value={
                                context.state.trip[index]
                                  ? context.state.trip[index].type
                                  : null
                              }
                              onChange={e => {
                                tripContext[index].type = e.target.value;
                              }}
                            >
                              <option selected value="" disabled>
                                Select
                              </option>
                              <option value="text">text</option>
                              <option value="number">number</option>
                            </select>
                          </div>

                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <p>Specify input name attribute : </p>
                            <select
                              value={
                                context.state.trip[index]
                                  ? context.state.trip[index].name
                                  : null
                              }
                              onChange={e => {
                                tripContext[index].name = e.target.value;
                              }}
                            >
                              <option selected value="" disabled>
                                Select
                              </option>
                              <option value="origin">origin</option>
                              <option value="destination">destination</option>
                              <option value="consigner">consigner</option>
                              <option value="consignee">consignee</option>
                              <option value="invoice">invoice</option>
                              <option value="start_date">start_date</option>
                              <option value="duration">duration</option>
                              <option value="eta">eta</option>
                            </select>
                          </div>

                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <p>Specify Pattern for Validation : </p>
                            <input
                              type="text"
                              value={
                                context.state.trip[index]
                                  ? context.state.trip[index].pattern
                                  : null
                              }
                              onChange={e => {
                                tripContext[index].pattern = e.target.value;
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
                    onClick={() => this.onClickNext(context, tripContext)}
                  >
                    Next
                  </button>
                </div>
              </React.Fragment>
            );
          }}
        </MyContext.Consumer>
      </div>
    );
  }
}
