import React, { Component } from "react";
import "./App.css";
import Steps from "./componets/steps";
import Init from "./componets/init";
import Substeps from "./componets/substeps";

export const MyContext = React.createContext();

class MyProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generic: {},
      gps: {},
      vehicle: [],
      driver: [],
      trip: [],
      currentStep: 0,
      stepCount: "",
      stepChanged: false,
      steps: [],
      disableSubsteps: true,
      disableApply: true
    };
  }

  render() {
    const { currentStep, disableApply, disableSubsteps, generic } = this.state;
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          gpsAdd: gpsContext => this.setState({ gps: gpsContext }),
          vehicleAdd: vehicleContext =>
            this.setState({ vehicle: vehicleContext }),
          driverAdd: driverContext => this.setState({ driver: driverContext }),
          tripAdd: tripContext => this.setState({ trip: tripContext }),
          nextStep: () => this.setState({ currentStep: currentStep + 1 }),
          prevStep: () => this.setState({ currentStep: currentStep - 1 }),
          setStepCount: stepCount => {
            this.setState({ stepCount });
          },
          setSteps: steps => {
            this.setState({ steps });
          },
          trueStepChanged: () => this.setState({ stepChanged: true }),
          falseStepChanged: () => this.setState({ stepChanged: false }),
          toggleDisableSubsteps: () =>
            this.setState({ disableSubsteps: !disableSubsteps }),
          toggleDisableApply: () =>
            this.setState({ disableApply: !disableApply }),
          currentStepAdd: (currentStepContext, currentStep) => {
            this.setState({
              generic: { ...generic, [currentStep]: currentStepContext }
            });
          }
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

class App extends Component {
  state = {
    initConfig: true
  };

  handleApply = context => {
    const { initConfig } = this.state;
    if (context.state.stepChanged === true) context.falseStepChanged();
    this.setState({ initConfig: !initConfig });
  };

  handleReconfigure = context => {
    const { initConfig } = this.state;
    if (context.state.disableApply === false) context.toggleDisableApply();
    if (context.state.disableSubsteps === false)
      context.toggleDisableSubsteps();
    this.setState({ initConfig: !initConfig });
  };

  render() {
    const { initConfig } = this.state;
    const buttonStyle = {
      background: "#E0E0E0",
      width: 200,
      padding: 16,
      textAlign: "center",
      margin: "0 auto",
      marginTop: 32
    };
    if (initConfig) {
      return (
        <MyProvider>
          <MyContext.Consumer>
            {context => (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Init stepCount={context.state.stepCount} />

                {!context.state.disableSubsteps && (
                  <Substeps steps={context.state.steps} />
                )}

                {context.state.disableApply ? (
                  <button
                    type="button"
                    style={buttonStyle}
                    onClick={() => this.handleApply()}
                    disabled
                  >
                    Apply
                  </button>
                ) : (
                  <button
                    type="button"
                    style={buttonStyle}
                    onClick={() => this.handleApply(context)}
                  >
                    Apply
                  </button>
                )}
              </div>
            )}
          </MyContext.Consumer>
        </MyProvider>
      );
    }
    return (
      <MyProvider>
        <MyContext.Consumer>
          {context => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Steps steps={context.state.steps} />
              <button
                type="button"
                style={buttonStyle}
                onClick={() => this.handleReconfigure(context)}
              >
                Reconfigure
              </button>
            </div>
          )}
        </MyContext.Consumer>
      </MyProvider>
    );
  }
}

export default App;
