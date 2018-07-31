import React, { Component } from "react";
import "./App.css";
import Steps from "./componets/steps";
import Init from "./componets/init";
import Substeps from "./componets/substeps";
import FinalSteps from "./componets/final";

export const MyContext = React.createContext();

class MyProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generic: {},
      final: {},
      // gps: {},
      // vehicle: [],
      // driver: [],
      // trip: [],
      finalCurrentStep: 0,
      currentStep: 0,
      genericbuffer: [],
      genInit: true,
      buffer: {},
      stepCount: "",
      // stepChanged: false,
      steps: [],
      disableSubsteps: true,
      disableApply: true,
      disableFinal: true,
      finalStepError: 0
    };
  }

  render() {
    const {
      currentStep,
      disableApply,
      disableSubsteps,
      generic,
      disableFinal,
      finalCurrentStep,
      final,
      buffer,
      genericbuffer,
      steps,
      finalStepError
    } = this.state;
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          // gpsAdd: gpsContext => this.setState({ gps: gpsContext }),
          // vehicleAdd: vehicleContext =>
          //   this.setState({ vehicle: vehicleContext }),
          // driverAdd: driverContext => this.setState({ driver: driverContext }),
          // tripAdd: tripContext => this.setState({ trip: tripContext }),
          nextStep: () => this.setState({ currentStep: currentStep + 1 }),
          prevStep: () => this.setState({ currentStep: currentStep - 1 }),
          finalNextStep: () =>
            this.setState({ finalCurrentStep: finalCurrentStep + 1 }),
          finalPrevStep: () =>
            this.setState({ finalCurrentStep: finalCurrentStep - 1 }),
          setStepCount: stepCount => this.setState({ stepCount }),
          setCurrentStep: currentStep => this.setState({ currentStep }),
          setSteps: steps => this.setState({ steps }),
          // trueStepChanged: () => this.setState({ stepChanged: true }),
          // falseStepChanged: () => this.setState({ stepChanged: false }),
          toggleDisableSubsteps: () =>
            this.setState({ disableSubsteps: !disableSubsteps }),
          toggleDisableApply: () =>
            this.setState({ disableApply: !disableApply }),
          toggleDisableFinal: () =>
            this.setState({ disableFinal: !disableFinal }),
          currentStepAdd: currentStep => {
            this.setState({
              generic: { ...generic, [currentStep]: genericbuffer }
            });
          },
          finalCurrentStepAdd: finalCurrentStep => {
            this.setState({
              final: { ...final, [steps[finalCurrentStep].title]: buffer }
            });
          },
          genericBufferInit: () => {
            const gen = genericbuffer;
            gen.push({});
            this.setState({
              genericbuffer: gen
            });
          },
          genericBufferInitSame: () => {
            this.setState({
              genericbuffer: generic[currentStep]
            });
          },
          genericBufferAdd: (index, what, value) => {
            const gen = genericbuffer;
            gen[index][what] = value;
            this.setState({
              genericbuffer: gen
            });
          },
          falseGenInit: () => {
            this.setState({ genInit: false });
          },
          clearGenericBuffer: () => {
            this.setState({ genInit: true, genericbuffer: [] });
          },
          bufferAdd: (key, value) => {
            this.setState({ buffer: { ...buffer, [key]: value } });
          },
          incFinalStepError: () => {
            this.setState({ finalStepError: finalStepError + 1 });
          },
          decFinalStepError: () => {
            this.setState({ finalStepError: finalStepError - 1 });
          },
          resetFinalStepError: () => {
            this.setState({ finalStepError: 0 });
          },
          // handleCheck: (currentStep, which) => {
          //   const { steps } = this.state;
          //   steps[currentStep].checkObj[which] = !steps[currentStep].checkObj[
          //     which
          //   ];
          //   this.setState({
          //     steps
          //   });
          // },
          clearGeneric: () => this.setState({ generic: {} }),
          clearBuffer: () => this.setState({ buffer: {} })
          // clearCheck: () => {
          //   const { steps, currentStep, generic } = this.state;
          //   if (!generic[currentStep])
          //     Object.keys(steps[currentStep].checkObj).map((key, index) => {
          //       if (!generic[currentStep]) {
          //         steps[currentStep].checkObj[key] = false;
          //       } else if (!generic[currentStep][index]) {
          //           steps[currentStep].checkObj[key] = false;
          //         }
          //     });
          //   this.setState({
          //     steps
          //   });
          // }
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
    if (context.state.disableFinal === false) context.toggleDisableFinal();
    this.setState({ initConfig: !initConfig });
    context.setCurrentStep(0);
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
              {context.state.disableFinal ? (
                <Steps
                  steps={context.state.steps}
                  currentStep={context.state.currentStep}
                />
              ) : (
                <FinalSteps
                  steps={context.state.steps}
                  generic={context.state.generic}
                  finalCurrentStep={context.state.finalCurrentStep}
                />
              )}
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
// 867857039221622
