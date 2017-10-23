import React, { Component } from 'react';
import { render } from 'react-dom';
import _ from 'lodash';

import { ExtraLifeDataType } from './ExtraLifeDataType';
import { SearchAvatar } from './SearchAvatar';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      participant: {},
      team: {},
      hasParticipant: false,
      hasTeam: false
    };

    this.handleParticipantChange = this.handleParticipantChange.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleParticipantChange(247161);
    this.handleTeamChange(33203);
  }

  handleParticipantChange(id) {
    this.setState({participantId: id});
  }

  handleTeamChange(id) {
    this.setState({teamId: id});
  }

  handleSubmit() {
    const participant = _.template('https://www.extra-life.org/index.cfm?fuseaction=donordrive.participant&participantID=<%= participantId %>&format=json');
    const team = _.template('https://www.extra-life.org/index.cfm?fuseaction=donordrive.team&teamID=<%= teamId %>&format=json');

    if(this.state.participantId) {
      fetch(participant({participantId: this.state.participantId}))
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            participant: data,
            hasParticipant: true
          });
        });
    } else {
      this.setState({hasParticipant: false});
    }

    if(this.state.teamId) {
      fetch(team({teamId: this.state.teamId}))
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            team: data,
            hasTeam: true
          });
        });
    } else {
      this.setState({hasTeam: false});
    }
  }

  render() {
    const hasParticipant = this.state.hasParticipant;
    const hasTeam = this.state.hasTeam;
    const participantId = this.state.participantId;
    const teamId = this.state.teamId;

    let participant = null;
    let team = null;
    let helloData = null

    if (hasParticipant) {
      participant = <SearchAvatar kind="PARTICIPANT"
                                  name={this.state.participant.displayName}
                                  image={this.state.participant.avatarImageURL}
                                  id={this.state.participant.participantID} />
    }

    if (hasTeam) {
      team = <SearchAvatar kind="TEAM"
                           name={this.state.team.name}
                           image={this.state.team.avatarImageURL}
                           id={this.state.team.teamID} />;
    }

    if (hasParticipant || hasTeam) {
      helloData = <div className="col-md-12 js__dashboard-select">
          <div className="row align-items-center">
            <div className="col-md-8 offset-md-2 justify-content-center">
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
          <div className="col-md-8 offset-md-2">
            <div className="container">
              <div className="row align-items-center el__boxy">
                <form className="col-md-8 offset-md-2 my-4 justify-content-center">
                  <ExtraLifeDataType className="row mb-1"
                                     kind="PARTICIPANT"
                                     id={participantId}
                                     onSearchChange={this.handleParticipantChange} />
                  <ExtraLifeDataType className="row mb-1"
                                     kind="TEAM"
                                     id={teamId}
                                     onSearchChange={this.handleTeamChange} />
                  <div className="row">
                    <div className="col">
                      <button onClick={(e) => {e.preventDefault(); this.handleSubmit()}} className="btn-block">SUBMIT</button>
                    </div>
                  </div>
                </form>
                {helloData}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}