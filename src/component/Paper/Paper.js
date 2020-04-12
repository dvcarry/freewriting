import React from 'react';
import { connect } from 'react-redux'
// import PaperHeading from './PaperHeading';
// import PaperText from './PaperText';
// import PaperPanel from './PaperPanel';
import { withRouter } from 'react-router-dom';
import { questionTypesIdArray, questionTypes } from './../../Data/questionType'
import { addAnswer, addCurrentAnswer, editAnswer } from '../../Redux/Reducers/AnswerReducer'
import { doneTask } from '../../Redux/Reducers/QuestionReducer'
import { fetchAddAnswer } from './../../Redux/Actions'
import { today } from './../../Data/dates'

class Paper extends React.Component {

    clickReady = () => {

        
        if (this.props.currentAnswer.status === 'old') {
            this.props.editAnswer()
        } else {            
            
            this.props.fetchAddAnswer(this.props.match.params.date, this.props.match.params.type, this.props.currentAnswer)
            this.props.addAnswer()
            this.props.doneTask(this.props.match.params.type)               
        }

        
        this.props.history.push('/tasks/' + today)     
    }

    addCurrent = event => {

        this.props.addCurrentAnswer({
            date: this.props.match.params.date,
            type: this.props.match.params.type,
            title: questionTypes[questionTypesIdArray.indexOf(this.props.match.params.type)].title,
            text: event.target.value,
            length: event.target.value.length,
            id: this.props.match.params.date + ' ' + this.props.match.params.type
        })
    }

    skipQuestion = () => {
        this.props.history.push('/tasks/' + today)
    }


    componentDidMount() {

        const current = this.props.answers.find(item => item.id === `${this.props.match.params.date} ${this.props.match.params.type}`)        

        if (current) {
            this.props.addCurrentAnswer({
                date: current.date,
                type: current.type,
                title: current.title,
                text: current.text,
                length: current.length,
                status: 'old',
                currentIndex: this.props.answers.indexOf(current)
            })
        } else {
            this.props.addCurrentAnswer({
                date: this.props.match.params.date,
                type: this.props.match.params.type,
                title: questionTypes[questionTypesIdArray.indexOf(this.props.match.params.type)].title,
                text: '',
                length: 0,
                status: 'new'
            })
        }
    }


    render() {

        let questionType = this.props.match.params.type
        const questionHeading = questionTypes[questionTypesIdArray.indexOf(questionType)].title
        const currentID = `${this.props.match.params.date} ${this.props.match.params.type}`

        const currentAnswer = this.props.answers.find(item => item.id === currentID) || ''



        return (
            <div className="paper">                
                <div className="paper_heading">
                    <h1>{questionHeading}</h1>
                </div>
                <div className="paper_text">

                    <textarea
                        autoFocus="true"
                        rows='35'
                        value={this.props.currentAnswer.text}
                        onChange={this.addCurrent}
                        placeholder='Стоит только начать...'

                    ></textarea>
                </div>
                <div className="paper_panel">
                    <div>
                        { this.props.currentAnswer.length > 0
                        ? <button onClick={this.clickReady}>Готово</button>
                        : <button onClick={this.skipQuestion}>Пропустить</button>}
                    </div>
                    <div>
                        <span>{this.props.currentAnswer.length}</span>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        answers: state.answers.usersAnswers,
        usersTaskToDo: state.questions.usersTaskToDo,
        currentAnswer: state.answers.currentAnswer
    }
}

export default connect(mapStateToProps, { addAnswer, doneTask, addCurrentAnswer, editAnswer, fetchAddAnswer })(withRouter(Paper))