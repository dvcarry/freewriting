import React from 'react';

const QuestionType = props => {
    
    const classes = ['question_type', 'card', props.done ? 'done' : 'notdone']
    
    return (
        <div className={classes.join(' ')} >
            <strong>{props.name}</strong>
            <p>{props.description}</p>
            <button onClick={props.click}>{props.type}</button>
        </div>
    )
}

export default QuestionType