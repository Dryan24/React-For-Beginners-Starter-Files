import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";
import PropTypes from "prop-types";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  // Life Cycle Methods
  componentDidMount() {
    const params = this.props.match.params;

    // First reinstate local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // Custom Functions
  addFish = (fish) => {
    //1. copy existing state
    const fishes = { ...this.state.fishes };

    //2. add new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;

    // 3. set the new fishes object to state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // take a copy of current state
    const fishes = { ...this.state.fishes };

    // update the state
    fishes[key] = updatedFish;

    // set to state
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    // take a copy of state
    const fishes = { ...this.state.fishes };

    // update the state (for firebase we have to update to null first)
    fishes[key] = null;

    // update the state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    });
  };

  addToOrder = (key) => {
    //1 take a copy of state
    const order = { ...this.state.order };

    //2 either add to order or update the number
    order[key] = order[key] + 1 || 1; // if the order.fish1 exists it will increment otherwise will make it one

    //3 call setstate to update the state object
    this.setState({ order });
  };

  removeFromOrder = (key) => {
    // take a copy of state
    const order = { ...this.state.order };

    //remove item from order
    delete order[key];

    // update the state
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Is Best" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                index={key}
                key={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              >
                {key}
              </Fish>
            ))}
          </ul>
        </div>

        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          updateFish={this.updateFish}
          removeFromOrder={this.removeFromOrder}
        />

        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
