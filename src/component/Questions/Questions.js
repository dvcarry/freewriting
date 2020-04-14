import React from 'react';
import Question from './Question';
import { connect } from 'react-redux'
import { addQuestion, removeQuestion } from './../../Redux/Reducers/QuestionReducer'
import { fetchQuestions, fetchAddQuestion, fetchUserQuestions, fetchRemoveQuestion } from '../../Redux/Actions';
import Loader from '../UI/Loader';

class Questions extends React.Component {

    componentDidMount() {
        this.props.fetchQuestions()
    }


    render() {

        const allQuestions = this.props.allQuestions
        const restQuestions = this.props.restQuestions
        const usersQuestions = this.props.usersQuestions

        let questions = <Loader/>



        if (!this.props.isLoading) {
            questions = (
                <>
                    <div>
                        {
                            usersQuestions.map(id => <Question
                                title={allQuestions[id].title}
                                key={allQuestions[id].id}
                                done={false}
                                type={allQuestions[id].id}
                                description={allQuestions[id].desc}
                                button={'Удалить'}
                                click={() => this.props.fetchRemoveQuestion(allQuestions[id].id, this.props.usersQuestions)}
                            />)
                        }
                    </div>

                    <div>
                        {
                            restQuestions.map(id => <Question
                                title={allQuestions[id].title}
                                key={allQuestions[id].id}
                                type={allQuestions[id].id}
                                done={true}
                                description={allQuestions[id].desc}
                                button={'Добавить'}
                                click={() => this.props.fetchAddQuestion(allQuestions[id].id, this.props.usersQuestions)}
                            />)
                        }
                    </div>
                </>
            )
        }



        return (
            <>
                <div className='heading'>
                    <h1>Мои дневники на каждый день</h1>
                </div>
                {/* {
                    this.props.isLoading ? <Loader /> : null
                } */}
                {questions}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        usersQuestions: state.questions.usersQuestions,
        allQuestions: state.questions.allQuestions,
        restQuestions: state.questions.restQuestions,
        isLoading: state.questions.isLoading,
    }
}

export default connect(mapStateToProps, { addQuestion, removeQuestion, fetchQuestions, fetchAddQuestion, fetchRemoveQuestion })(Questions)