import React from "react";
import { MyContext } from "../App";

export default class MySelect extends React.Component {
  state = {
    val: this.props.val,
    attributeArray: this.props.attributeArray,
    index: this.props.index
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.index !== prevState.index ||
      nextProps.attributeArray.toString() !==
        prevState.attributeArray.toString()
    ) {
      return {
        val: nextProps.val,
        attributeArray: nextProps.attributeArray,
        index: nextProps.index
      };
    }
    return prevState;
  }

  render() {
    const { val, attributeArray } = this.state;
    return (
      <MyContext.Consumer>
        {context => (
          <select defaultValue={val} onChange={e => this.props.onChange(e)}>
            <option value="">Select</option>
            {attributeArray.map((key, index) => (
              <option key={index} value={key}>
                {key}
              </option>
            ))}
          </select>
        )}
      </MyContext.Consumer>
    );
  }
}
