import React, { Component } from 'react';
import { render } from 'react-dom';
import _ from 'lodash';

import { Donor } from './Donor'
import { GoalProgress } from './GoalProgress'

export class Participant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      basic: {},
      donors: {}
    }
  }

  componentWillMount() {
    const basic = _.template('https://www.extra-life.org/index.cfm?fuseaction=donordrive.participant&participantID=<%= participantId %>&format=json');
    const donors = _.template('https://www.extra-life.org/index.cfm?fuseaction=donordrive.participantDonations&participantID=<%= participantId %>&format=json');
    const id = this.props.match.params.id;

    fetch(basic({participantId: id}))
      .then((response) => response.json())
      .then((data) => this.setState({basic: data}));


    fetch(donors({participantId: id}))
      .then((response) => response.json())
      .then((data) => this.setState({donors: data}));
  }

  render() {
    let donors;

    if(this.state.donors.length > 0) {
      let id = 1;

      donors = this.state.donors.map(function(donor) {
        id += id;
        return <Donor id={id}
               name={donor.donorName}
               image={donor.avatarImageURL}
               donationDate={donor.createdOn}
               amount={donor.donationAmount}
               message={donor.message} />
      });
    };


    return (
      <div class="container-fluid">
        <div class="row el__dashboard-top p-4">
          <div class="col-md-2">
            <img src={this.state.basic.avatarImageURL} alt={this.state.basic.displayName} class="rounded border border-success img-fluid" />
          </div>
          <div class="col-md-3">
            {this.state.basic.displayName}
          </div>
          <div class="col-md-7">
            <GoalProgress total={this.state.basic.totalRaisedAmount} goal={this.state.basic.fundraisingGoal} />
          </div>
        </div>
        <div class="row el__dashboard-bottom p-4">
          {donors}
        </div>
      </div>
    );
  }
}