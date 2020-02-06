import React, { Component } from "react";
import { connect } from "react-redux";
import { incrementAsync, decrementAsync } from "./TestActions";
import { Button } from "semantic-ui-react";
import { openModal } from "../Modals/ModalAction";

const actions = {
  incrementAsync,
  decrementAsync,
  openModal
};

const mapState = state => ({
  data: state.test.data,
  loading: state.async.loading,
  buttonName: state.async.elementName
});
class TestComponent extends Component {
  render() {
    const {
      incrementAsync,
      decrementAsync,
      openModal,
      loading,
      buttonName
    } = this.props;
    return (
      <div>
        <h1>Test Component</h1>
        <h3>the answer is {this.props.data}</h3>
        <Button
          name="increment"
          loading={buttonName === "increment" && loading}
          onClick={e => incrementAsync(e.target.name)}
          positive
          content="+"
        />
        <Button
          name="decrement "
          loading={buttonName === "decrement" && loading}
          onClick={e => decrementAsync(e.target.name)}
          negative
          content="-"
        />
        <Button
        
          color="teal"
          onClick={() => openModal("TestModal", { data: 42 })}
          content="Open modal "
        />
      </div>
    );
  }
}
export default connect(mapState, actions)(TestComponent);
