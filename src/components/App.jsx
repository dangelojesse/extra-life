import React, { Component } from 'react';
import _ from 'lodash';

import { ExtraLifeDataType } from './ExtraLifeDataType';
import { SearchAvatar } from './SearchAvatar';
import logo from '../assets/el-logo.png';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      participant: {},
      team: {},
      loading: false
    };

    this.handleParticipantChange = this.handleParticipantChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleParticipantChange(id) {
    this.setState({participantId: id});
  }

  handleSubmit() {
    const participant = _.template('https://www.extra-life.org/index.cfm?fuseaction=donordrive.participant&participantID=<%= participantId %>&format=json');
    const team = _.template('https://www.extra-life.org/index.cfm?fuseaction=donordrive.team&teamID=<%= teamId %>&format=json');
    let id = this.state.participantId;
    let urlObject;

    if(!_.isEmpty(id)) {
      if(_.isNaN(_.toNumber(id))) {
        urlObject = _.chain(id).replace('?', '')
                      .split('&')
                      .map(_.ary(_.partial(_.split, _, '='), 1))
                      .fromPairs()
                      .value();
        id = urlObject.participantID;
      }

      this.setState({loading: true});

      fetch(participant({participantId: id}))
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            participant: data
          });

          fetch(team({teamId: data.teamID}))
            .then((response) => response.json())
            .then((data) => {
              this.setState({
                team: data,
                loading: false
              });
            });
      });
    } else {
      this.setState({error: <p className="alert alert-danger">Enter Your URL or Participant Id.</p>})
    }
  }

  render() {
    const participantId = this.state.participantId;
    let participant = null;
    let team = null;
    let helloData = null

    if (this.state.loading) {
      participant = <i className="fa fa-spinner fa-spin" />;
      team = <i className="fa fa-spinner fa-spin" />;
    }

    if(this.state.participant.displayName) {
      participant = <SearchAvatar kind="PARTICIPANT"
                                  name={this.state.participant.displayName}
                                  image={this.state.participant.avatarImageURL}
                                  id={this.state.participant.participantID} />
    }

    if(this.state.team.name) {
      team = <SearchAvatar kind="TEAM"
                            name={this.state.team.name}
                            image={this.state.team.avatarImageURL}
                            id={this.state.team.teamID} />;
    }

    if(this.state.participant.displayName || this.state.team.name ) {
      helloData = <div className="col-sm-12 js__dashboard-select">
          <div className="row align-items-center">
            <div className="col-sm-8 offset-sm-2 mb-4 p-4 rounded el__dashboard-selections justify-content-center">
              <h3 className="text-center mb-5">Select a Dashboard</h3>
              <div className="row">
                {participant}
                {team}
              </div>
            </div>
          </div>
      </div>
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8 offset-sm-2">
            <div className="container">
              <div className="row align-items-center el__boxy pb-4">
                <form className="col-sm-8 offset-sm-2 my-4 justify-content-center">
                  <p className="text-center p-4"><img src={logo} alt="Extra Life" className="el__logo" /></p>
                  <ExtraLifeDataType className="row mb-1"
                                     kind="PARTICIPANT"
                                     id={participantId}
                                     onSearchChange={this.handleParticipantChange} />
                  {this.state.error}
                  <div className="row">
                    <div className="col">
                      <button onClick={(e) => {e.preventDefault(); this.handleSubmit()}} className="btn-block rounded">SUBMIT</button>
                    </div>
                  </div>
                </form>
                {helloData}
                <div className="col-sm-10 offset-sm-1">
                  <h1>Hello!</h1>
                  <p>
                    Hope you find this dashboard useful.
                    Simply enter your participant number or the URL to your Extra Life page into the input above and
                    select either your participant or team dashboard. Add this into your streaming tool of choice and you can quickly
                    display your totals during game day.
                  </p>
                  <p>
                    And of course if you'd like to donate to my Extra Life goal this year please <a href="https://www.extra-life.org/index.cfm?fuseaction=donordrive.participant&participantID=247161">click here</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}