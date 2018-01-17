import React, { Component } from 'react';

const kinds = {
  PARTICIPANT: 'Participant',
  TEAM: 'Team'
}

export class ExtraLifeDataType extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onSearchChange(e.target.value);
  }

  render() {
    let id = this.props.id ? this.props.id : '';
    const kind = this.props.kind;

    return (
      <div className="form-group">
        <legend>Enter {kinds[kind]} ID:</legend>
        <input className="form-control"
               value={id}
               onChange={this.handleChange} />
      </div>
    );
  }
}
