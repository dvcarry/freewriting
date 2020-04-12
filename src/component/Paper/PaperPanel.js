import React from 'react';


const PaperPanel = props => {
    return (
        <div className="paper_text">
            <button onClick={props.add}>Готово</button>
            <a>Пропустить</a>
            <span>344</span>
        </div>
    )
}

export default PaperPanel