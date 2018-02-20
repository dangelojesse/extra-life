import React, { Component } from 'react';
import _ from 'lodash';

export class GoalProgress extends Component {
  calcProgress(total, goal) {
    let progress = _.multiply(_.divide(total, goal), 100);
    return _.round(progress, 2);
  }

  render() {
    const progress = this.calcProgress(this.props.total, this.props.goal);
    const progressPercent = progress + '%';

    return (
      <div className="goal-progress">
        <h2>Donation Goal <small>${this.props.total} of ${this.props.goal}</small></h2>
        <div className="progress">
<<<<<<< HEAD
          <div className="progress-bar text-center progress--green" style={{width: progress + '%', minWidth: 75}} role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
=======
          <div className="progress-bar text-center progress--green" style={{width: progress + '%'}} role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
>>>>>>> 5258e9764406a0dbe88ff59d5a513511aba2b724
            {progressPercent}
          </div>
        </div>
      </div>
    );
  }
}
