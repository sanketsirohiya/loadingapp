// @flow
import * as React from "react";
import Stepper from "react-stepper-horizontal";
import Gps from "../scenes/gps";
import Driver from "../scenes/driver";
import Vehicle from "../scenes/vehicle";
import Trip from "../scenes/trip";

type Props = {
  currentStep: number
};

export const MyContext = React.createContext();

class MyProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gps: {},
      vehicle: [],
      driver: [],
      trip: [],
      currentStep: 0
    };
  }
  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          gpsAdd: gpsContext => this.setState({ gps: gpsContext }),
          vehicleAdd: vehicleContext =>
            this.setState({ vehicle: vehicleContext }),
          driverAdd: driverContext => this.setState({ driver: driverContext }),
          tripAdd: tripContext => this.setState({ trip: tripContext }),
          nextStep: () =>
            this.setState({ currentStep: this.state.currentStep + 1 }),
          prevStep: () =>
            this.setState({ currentStep: this.state.currentStep - 1 })
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

class CurrStep extends React.Component<Props> {
  render() {
    const { currentStep } = this.props;
    if (currentStep === 0) {
      return <Gps />;
    }
    if (currentStep === 1) {
      return <Vehicle />;
    }
    if (currentStep === 2) {
      return <Driver />;
    }
    if (currentStep === 3) {
      return <Trip />;
    }
    return <h1>FINISH!</h1>;
  }
}

export default class Steps extends React.Component {
  state = {
    steps: [
      {
        title: "Step One",
        onClick: () => {
          console.log("onClick", 1);
        }
      },
      {
        title: "Step Two",
        onClick: () => {
          console.log("onClick", 2);
        }
      },
      {
        title: "Step Three",
        onClick: () => {
          console.log("onClick", 3);
        }
      },
      {
        title: "Step Four",
        onClick: () => {
          console.log("onClick", 4);
        }
      },
      {
        title: "Step Five",
        onClick: () => {
          console.log("onClick", 5);
        }
      }
    ]
  };

  render() {
    const { steps } = this.state;
    return (
      <MyProvider>
        <div style={{ flexDirection: "column" }}>
          <MyContext.Consumer>
            {context => {
              console.log(context);
              return (
                <React.Fragment>
                  <Stepper
                    steps={steps}
                    activeStep={context.state.currentStep}
                  />
                  <CurrStep currentStep={context.state.currentStep} />
                </React.Fragment>
              );
            }}
          </MyContext.Consumer>
        </div>
      </MyProvider>
    );
  }
}
