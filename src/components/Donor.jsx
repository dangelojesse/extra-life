import React, { Component } from 'react';
import moment from 'moment';

export class Donor extends Component {
  render() {
    const image = this.props.image;
    let name = this.props.name;
    const donationDate = moment(this.props.donationDate).format('MMMM Do - hh:mm A');
    const amount = this.props.amount;
    const message = this.props.message;

    if(!name) {
      name = 'Anonymous';
    }

    return (
      <div className="col-sm-4 el__donor">
        <div className="row">
          <div className="col-sm-4">
            <img src={image} alt={name} className="rounded mb-3 img-fluid el__avatar"/>
          </div>
          <div className="col-sm-8">
            <h4>{name} <small>${amount}</small></h4>
            <p><em>{donationDate}</em></p>
            <p><b>{message}</b></p>
          </div>
        </div>
      </div>
    );
  }
}
