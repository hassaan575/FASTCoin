import React, { Component } from "react";
import Scanner from "./Scanner";

class Reader extends Component {
  state = {
    results: [],
  };

  _scan = () => {
    this.setState({ scanning: !this.state.scanning });
  };

  _onDetected = (result) => {
    this.setState({ results: [] });
    this.setState({ results: this.state.results.concat([result]) });
  };

  render() {
    return (
      <div>
        <span>Barcode Scanner</span>
        {/* <Paper variant="outlined" style={{marginTop:30, width:640, height:320}}>
        </Paper> */}
        <Scanner onDetected={this._onDetected} />

        <div>
          {this.state.results[0]
            ? this.state.results[0].codeResult.code
            : "No data scanned"}
        </div>
        <button
          style={{
            borderRadius: "10px",
            border: "1px solid red",
            backgroundColor: "red",
            color: "white",
            marginBottom: "5px",
          }}
          onClick={() => {
            this.props.setValue(this.state.results[0].codeResult.code);
          }}
        >
          send data back
        </button>
      </div>
    );
  }
}

export default Reader;
