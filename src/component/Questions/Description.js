import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';




class Description extends React.Component {   
    
    render() {

        const array = this.props.allQuestions.map(item => item.id)
        const index = array.indexOf(this.props.match.params.type)
        const title = this.props.allQuestions[index].title

        return (    
            <div>
                <div className="paper_heading">
                    <h1>{title}</h1>
                </div>
                {/* <p>{props.description}</p> */}
            </div>
        )
    }}

const mapStateToProps = state => {
    return {
        allQuestions: state.questions.allQuestions
    }
}


export default connect(mapStateToProps)(withRouter(Description))  