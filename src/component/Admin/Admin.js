import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestionsCatalog } from './../../Redux/Actions'
import Question from '../Questions/Question';


class Admin extends React.Component {

    componentDidMount() {
        this.props.fetchQuestionsCatalog()
    }

    render() {

        const questions = this.props.questions

        let questionsArray = null
        if (this.props.questions) {
            questionsArray = Object.keys(questions).map(question => <Question
                type={questions[question].id}
                title={questions[question].title}
                description={questions[question].desc}
            />)
        }





        return (

            <div>
                <div className='heading'>
                    <h1>Все доступные вопросы</h1>
                </div>
                {questionsArray}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        questions: state.questions.allQuestions
    }
}

export default connect(mapStateToProps, { fetchQuestionsCatalog })(Admin) 