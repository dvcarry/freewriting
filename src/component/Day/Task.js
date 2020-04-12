import React from 'react';
import { withRouter } from 'react-router-dom';

const Task = props => {

    const classes = ['task', 'card', props.done ? 'done' : 'notdone']

    return (
        <div className={classes.join(' ')} onClick={() => {props.history.push(`/tasks/${props.date}/${props.id}`)}}>
            <p>{props.name}</p>
        </div>
    )
}

export default withRouter(Task)