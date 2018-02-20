import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

  getTeam(teamID){
    const team = _.template('https://www.extra-life.org/index.cfm?fuseaction=donordrive.team&teamID=' + teamID + '&format=json');
    fetch(team({teamtId: teamID}))
      .then((response) => response.json())
      .then((data) => {this.setState({teamName: data.name})});
  }

  render() {
    let donors;
    let participant = {};
    let link = '/';

    if(!_.isEmpty(this.state.basic) && _.isEmpty(participant)) {
      participant.name = this.state.basic.displayName;
      participant.image = this.state.basic.avatarImageURL;
      link = '/team/' + this.state.basic.teamID;

      if(!this.state.teamName) {
        this.getTeam(this.state.basic.teamID);
      }

      if(this.state.basic.isTeamCaptain) {
        participant.captain = <span className="fa-stack">
        <i className="fa fa-certificate fa-stack-2x el__text--blue"></i>
        <i className="fa fa-heart fa-stack-1x text-white"></i>
      </span>;
      }
    }

    if(this.state.donors.length > 0) {
      donors = this.state.donors.map(function(donor) {
        return <Donor key={donor.donorName + donor.createdOn}
               name={donor.donorName}
               image={donor.avatarImageURL}
               donationDate={donor.createdOn}
               amount={donor.donationAmount}
               message={donor.message} />
      });
    };

    return (
      <div className="container-fluid">
        <div className="row el__dashboard-top p-4">
          <div className="col-sm-3 col-md-1 order-2 order-sm-1">
            <img src={participant.image} alt={participant.captain} className="rounded img-fluid el__avatar" />
          </div>
          <div className="col-sm-4 col-md-3 order-1 pull order-sm-2">
            <h3>{participant.captain} {participant.name}</h3>
            <Link to={link}>
              <h4 className="el__text--green">{this.state.teamName}</h4>
            </Link>
          </div>
          <div className="col-sm-5 col-md-8 order-3 order-sm-3">
            <GoalProgress total={this.state.basic.totalRaisedAmount} goal={this.state.basic.fundraisingGoal} />
          </div>
        </div>
        <div className="row el__dashboard-bottom p-4">
          {donors}
        </div>
      </div>
    );
  }
}