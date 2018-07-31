import React from "react";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "moment";
import { MyContext } from "../App";

export default class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: this.props.obj
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.obj.name !== prevState.obj.name) {
      return { obj: nextProps.obj };
    }
    return prevState;
  }

  handleTimeChange = (time, context, obj) => {
    context.bufferAdd(obj.what, time);
  };

  render() {
    const { obj } = this.state;
    return (
      <MyContext.Consumer>
        {context => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>{obj.what} Details</label>

            <TimePicker
              value={
                context.state.final[
                  context.state.steps[context.state.finalCurrentStep].title
                ]
                  ? context.state.final[
                      context.state.steps[context.state.finalCurrentStep].title
                    ][obj.what]
                  : context.state.buffer[obj.what] || moment()
              }
              onChange={time => this.handleTimeChange(time, context, obj)}
            />
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
