import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchExtras, addExtra, removeExtra } from "../../actions/extra";
import "./advertextras.css";

const initialState = {
  text: ""
};

class AdvertExtras extends Component {
  state = initialState;

  componentDidMount = () => {
    if (this.props.myAdvert) {
      this.props.fetchExtras();
    }
  };

  addExtra = (id, text) => {
    const selectedExtrasIds = this.props.advert.advertExtras.map(
      extra => extra.extraId
    );
    if (selectedExtrasIds.includes(id)) {
      return;
    } else {
      this.props.addExtra(text);
    }
  };

  removeExtra = id => {
    this.props.removeExtra(id);
  };

  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  addNew = e => {
    e.preventDefault();
    this.props.addExtra(this.state.text);
    this.setState(initialState);
  };

  render() {
    if (this.props.myAdvert) {
      return (
        <div>
          <h4>Features provide extra details for your property</h4>
          <p>To remove feature from your ad, just click on it.</p>
          {this.props.advert.advertExtras.map((extraCon, i) => (
            <button
              className="btn btn-sm btn-outline-success ml-1 allextras mt-1"
              key={i}
              onClick={() => this.removeExtra(extraCon.extra.id)}
            >
              {extraCon.extra.text}
            </button>
          ))}
          <hr />
          <div>
            <h4>Top Features for this property</h4>
            <p>
              Choose feature fronm the list below or type new feature
            </p>
            {this.props.extras.map((extra, i) => (
              <button
                className="btn btn-sm btn-outline-info ml-1 allextras mt-1"
                key={i}
                onClick={() => this.addExtra(extra.id, extra.text)}
              >
                {extra.text}
              </button>
            ))}
          </div>
          <hr />
          <div className="col-12 col-md-12 col-lg-6 col-xl-5">
            <h4>New Feature</h4>
            <p>Type new feature</p>
            <form onSubmit={e => this.addNew(e)} className="input-group">
              <input
                type="text"
                name="text"
                className="form-control"
                value={this.state.text}
                onChange={this.handleChange}
              />
              <input
                type="submit"
                value="Add New"
                className="btn btn-sm btn-success ml-3"
              />
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h4>Advantages</h4>
          {this.props.advert.advertExtras.map((extraCon, i) => (
            <p
              className="btn btn-sm btn-outline-info ml-1 allextras mt-1"
              key={i}
            >
              {extraCon.extra.text}
            </p>
          ))}
          <hr />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    extras: state.extraReducer.fetchedExtras
  };
}

export default connect(mapStateToProps, { fetchExtras, addExtra, removeExtra })(
  AdvertExtras
);
