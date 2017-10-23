import React, { Component } from 'react';

export class Donor extends Component {
  render() {
    const image = this.props.image;
    let name = this.props.name;
    const donationDate = this.props.donationDate;
    const amount = this.props.amount;
    const message = this.props.message;

    if(!name) {
      name = 'Anonymous';
    }

    return (
      <div class="col-md-4">
        <div class="row">
          <div class="col-md-4">
            <img src={image} alt={name} class="rounded border border-success mb-3 img-fluid"/>
          </div>
          <div class="col-md-8">
            <h4>{name} <small>${amount}</small></h4>
            <p>{message}</p>
          </div>
        </div>
      </div>
    );
  }
}
