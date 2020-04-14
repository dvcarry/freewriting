import React from 'react';
import { withRouter } from 'react-router-dom';

const Task = props => {

    const classes = ['task', 'card', props.done ? 'done' : 'notdone']

    return (
        <div className={classes.join(' ')} onClick={() => { props.history.push(`/tasks/${props.date}/${props.id}`) }}>
            <p>{props.name}</p>
            <div className="task_kpi">
                <span>{props.length}{props.done ? ' сим.' : null}</span>
                <span>{props.timer}{props.done ? ' мин.' : null}</span>
            </div>

        </div>
    )
}

export default withRouter(Task)