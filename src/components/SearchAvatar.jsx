import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class SearchAvatar extends Component {

  //eslint-disable no-unused-vars
  render() {
    const image = this.props.image;
    const name = this.props.name;
    const id = this.props.id;
    const kind = this.props.kind;
    let link = '/team/' + id;
    let kindName = 'Team';

    if(kind === "PARTICIPANT") {
      link = '/participant/' + id;
      kindName = 'Participant'
    }

    return (
      <div className="col-sm text-center">
        <h3 className="el__text--green ">{kindName}</h3>
        <Link to={link}>
          <img src={image} alt={name} className="rounded mb-3 img-fluid el__avatar"/>
          <h5>{name}</h5>
        </Link>
      </div>
    );
  }
}
