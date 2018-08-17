import React from "react";
import Select from "react-select";
import { MyContext } from "../App";

export default class MySelect extends React.Component {
  state = {
    currentStep: this.props.currentStep,
    attributeArray: this.props.attributeArray,
    index: this.props.index,
    column: this.props.column
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.currentStep !== prevState.currentStep ||
      nextProps.index !== prevState.index ||
      nextProps.attributeArray.toString() !==
        prevState.attributeArray.toString() ||
      nextProps.column !== prevState.column
    ) {
      return {
        currentStep: nextProps.currentStep,
        attributeArray: nextProps.attributeArray,
        index: nextProps.index,
        column: nextProps.column
      };
    }
    return prevState;
  }

  render() {
    const { currentStep, attributeArray, index, column } = this.state;
    const options = [];
    attributeArray.map((key, index) => {
      options.push({
        value: key,
        label: key
      });
      return null;
    });
    console.log(options);
    return (
      <MyContext.Consumer>
        {context => (
          <Select
            value={
              context.state.generic[currentStep]
                ? context.state.generic[currentStep][index][column] || null
                : context.state.genericbuffer[index][column] || null
            }
            defaultValue={null}
            onChange={selectedOption => this.props.onChange(selectedOption)}
            options={[{ value: null, label: "Select" }, ...options]}
          />
        )}
      </MyContext.Consumer>
    );
  }
}
