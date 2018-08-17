import React from "react";
import Datetime from "react-datetime";
import "./react-datetime.css";
import moment from "moment";
import { MyContext } from "../App";

export default class DateTime extends React.Component {
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

  handleDateTimeChange = (datetime, context, obj) => {
    context.bufferAdd(obj.what, datetime);
  };

  render() {
    const { obj } = this.state;
    return (
      <MyContext.Consumer>
        {context => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>{obj.what} Details</label>

            <Datetime
              value={
                context.state.final[
                  context.state.steps[context.state.finalCurrentStep].title
                ]
                  ? context.state.final[
                      context.state.steps[context.state.finalCurrentStep].title
                    ][obj.what]
                  : context.state.buffer[obj.what] || moment()
              }
              onChange={datetime =>
                this.handleDateTimeChange(datetime, context, obj)
              }
            />
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
