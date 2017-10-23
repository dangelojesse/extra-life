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

    if(kind === "PARTICIPANT") {
      link = '/participant/' + id;
    }

    return (
      <div class="col-md text-center">
        <Link to={link}>
          <img src={image} alt={name} class="rounded border border-success mb-3 img-fluid"/>
          <h4>{name}</h4>
        </Link>
      </div>
    );
  }
}
