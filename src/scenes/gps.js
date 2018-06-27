// @flow
import React from "react";
import { MyContext } from "../componets/steps";

export default class Gps extends React.Component {
  onClickNext = (context, gpsContext) => {
    context.gpsAdd(gpsContext);
    context.nextStep();
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
    const gpsContext = {};
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
              <React.Fragment>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p>Unique GPS Identifier : </p>
                  <select
                    value={context.state.gps.what || null}
                    onChange={e => {
                      gpsContext.what = e.target.value;
                    }}
                  >
                    <option selected value="" disabled>
                      Select
                    </option>
                    <option value="imei">IMEI</option>
                    <option value="x">x</option>
                    <option value="y">y</option>
                  </select>
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p>Select type : </p>
                  <select
                    value={context.state.gps.type || null}
                    onChange={e => {
                      gpsContext.type = e.target.value;
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
                    value={context.state.gps.name || null}
                    onChange={e => {
                      gpsContext.name = e.target.value;
                    }}
                  >
                    <option selected value="" disabled>
                      Select
                    </option>
                    <option value="imei">IMEI</option>
                    <option value="x">x</option>
                    <option value="y">y</option>
                  </select>
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p>Specify api : </p>
                  <input
                    type="text"
                    value={context.state.gps.api || null}
                    onChange={e => {
                      gpsContext.api = e.target.value;
                    }}
                  />
                </div>
              </React.Fragment>
              <button
                type="button"
                style={buttonStyle}
                onClick={() => this.onClickNext(context, gpsContext)}
              >
                Next
              </button>
            </React.Fragment>
          )}
        </MyContext.Consumer>
      </div>
    );
  }
}
