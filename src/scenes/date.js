import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { MyContext } from "../App";

import "react-datepicker/dist/react-datepicker.css";

export default class Date extends React.Component {
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

  handleDateChange = (date, context, obj) => {
    context.bufferAdd(obj.what, date);
  };

  render() {
    const { obj } = this.state;
    return (
      <MyContext.Consumer>
        {context => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>{obj.what} Details</label>

            <DatePicker
              selected={
                context.state.final[
                  context.state.steps[context.state.finalCurrentStep].title
                ]
                  ? context.state.final[
                      context.state.steps[context.state.finalCurrentStep].title
                    ][obj.what]
                  : context.state.buffer[obj.what] || moment()
              }
              onChange={date => this.handleDateChange(date, context, obj)}
            />
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
