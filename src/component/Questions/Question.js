import React from 'react';
import { NavLink } from 'react-router-dom';

const QuestionType = props => {

    const classes = ['question_type', 'card', props.done ? 'done' : 'notdone']

    return (
        <div className={classes.join(' ')} >
            <div>
                <strong><NavLink to={`/questions/${props.type}`}>{props.title}</NavLink></strong>
                
                <p>{props.description}</p>
            </div>
            <div className="question_right">
                <button onClick={props.click}>{props.button}</button>
            </div>


        </div>
    )
}

export default QuestionType