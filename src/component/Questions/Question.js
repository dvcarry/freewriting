import React from 'react';

const QuestionType = props => {

    const classes = ['question_type', 'card', props.done ? 'done' : 'notdone']

    return (
        <div className={classes.join(' ')} >
            <div>
                <strong>{props.name}</strong>
                <p>{props.description}</p>
            </div>
            <div className="question_right">
                <button onClick={props.click}>{props.type}</button>
            </div>


        </div>
    )
}

export default QuestionType