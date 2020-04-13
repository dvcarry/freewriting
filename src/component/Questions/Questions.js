import React from 'react';
import QuestionType from './Question';
import { connect } from 'react-redux'
import { addQuestion, removeQuestion } from './../../Redux/Reducers/QuestionReducer'
import { fetchQuestions, fetchAddQuestion, fetchUserQuestions, fetchRemoveQuestion } from '../../Redux/Actions';

class Questions extends React.Component {

    componentDidMount() {

        if (!this.props.allQuestions) {
            this.props.fetchQuestions()
            console.log('didMount')
        }



        // this.props.fetchUserQuestions()
    }

    // componentDidUpdate() {        
    //     this.props.fetchQuestions()
    //     // this.props.fetchUserQuestions()
    // }    

    shouldComponentUpdate(nextProps, nextState) {
        // if (nextProps.usersQuestions != this.props.usersQuestions || nextProps.allQuestions != this.props.allQuestions) {
        //     console.log('true')
        // } else {
        //     console.log('false')
        // }

        return nextProps.usersQuestions != this.props.usersQuestions || nextProps.allQuestions != this.props.allQuestions

        // return true
        // nextProps.usersQuestions != this.props.usersQuestions
    }


    render() {

        const allQuestions = this.props.allQuestions
        const restQuestions = this.props.restQuestions
        const usersQuestions = this.props.usersQuestions

        let questions = null

        if (this.props.allQuestions) {
            questions = (
                <>
                    <div>
                        {
                            usersQuestions.map(id => <QuestionType
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
                            restQuestions.map(id => <QuestionType
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

                {questions}

                {/* <div>
                    {
                        usersQuestions.map(id => <QuestionType
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
                        restQuestions.map(id => <QuestionType
                            title={allQuestions[id].title}
                            key={allQuestions[id].id}
                            type={allQuestions[id].id}
                            done={true}
                            description={allQuestions[id].desc}
                            button={'Добавить'}
                            click={() => this.props.fetchAddQuestion(allQuestions[id].id, this.props.usersQuestions)}
                        />)
                    }
                </div> */}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        usersQuestions: state.questions.usersQuestions,
        allQuestions: state.questions.allQuestions,
        restQuestions: state.questions.restQuestions
    }
}

export default connect(mapStateToProps, { addQuestion, removeQuestion, fetchQuestions, fetchAddQuestion, fetchRemoveQuestion })(Questions)