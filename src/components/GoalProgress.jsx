import React, { Component } from 'react';
import _ from 'lodash';

export class GoalProgress extends Component {
  calcProgress(total, goal) {
    return _.round(_.divide(total, goal), 2);
  }

  render() {
    const progress = _.multiply(this.calcProgress(this.props.total, this.props.goal), 100);
    const progressPercent = progress + '%';


    return (
      <div class="goal-progress">
        <h2>Donation Goal <small>${this.props.total} of ${this.props.goal}</small></h2>
        <div class="progress">
          <div class="progress-bar text-center progress--green" style={{width: progress + '%'}} role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
            {progressPercent}
          </div>
        </div>
      </div>
    );
  }
}
