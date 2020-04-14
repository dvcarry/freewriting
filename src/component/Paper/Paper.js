import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { questionTypesIdArray, questionTypes } from './../../Data/questionType'
import { addAnswer, addCurrentAnswer, editAnswer, setCurrentAnswer } from '../../Redux/Reducers/AnswerReducer'
import { doneTask } from '../../Redux/Reducers/QuestionReducer'
import { fetchAddAnswer } from './../../Redux/Actions'
import { today } from './../../Data/dates'
import Timer from './Timer';

class Paper extends React.Component {

    clickReady = () => {
        

        this.props.fetchAddAnswer(this.props.match.params.date, this.props.match.params.type, this.props.currentAnswer)

        // if (this.props.currentAnswer.status === 'old') {
        //     this.props.editAnswer()
        // } else {            
        //     debugger
        //     this.props.fetchAddAnswer(this.props.match.params.date, this.props.match.params.type, this.props.currentAnswer)
        //     this.props.addAnswer()
        //     this.props.doneTask(this.props.match.params.type)               
        // }
        
        this.props.history.push('/tasks/' + today)     
    }

    addCurrent = event => {

        this.props.addCurrentAnswer({
            // date: this.props.match.params.date,
            // type: this.props.match.params.type,
            // title: questionTypes[questionTypesIdArray.indexOf(this.props.match.params.type)].title,
            text: event.target.value,
            length: event.target.value.length,
            // id: this.props.match.params.date + ' ' + this.props.match.params.type
        })
    }

    skipQuestion = () => {
        this.props.history.push('/tasks/' + today)
    }


    componentDidMount() {

        const currentOldAnswer = this.props.answers.find(item => item.id === `${this.props.match.params.date} ${this.props.match.params.type}`)      
         
        if (currentOldAnswer) {
            this.props.setCurrentAnswer({
                date: currentOldAnswer.date,
                type: currentOldAnswer.type,
                title: currentOldAnswer.title,
                text: currentOldAnswer.text,
                length: currentOldAnswer.length,
                status: 'old',
                id: currentOldAnswer.date + ' ' + currentOldAnswer.type,
                timer: currentOldAnswer.timer
                // currentIndex: this.props.answers.indexOf(currentOldAnswer)
            })
        } else {
            this.props.setCurrentAnswer({
                date: this.props.match.params.date,
                type: this.props.match.params.type,
                title: this.props.questionsCatalog[this.props.match.params.type].title,
                text: '',
                length: 0,
                status: 'new',
                id: this.props.match.params.date + ' ' + this.props.match.params.type,
                timer: 0
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
                        autoFocus={true}
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
                    <div className="paper_panel_numbers">
                        <span>{this.props.currentAnswer.length} сим.</span>
                        <Timer />
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
        currentAnswer: state.answers.currentAnswer,
        questionsCatalog: state.questions.allQuestions
    }
}

export default connect(mapStateToProps, { addAnswer, doneTask, addCurrentAnswer, editAnswer, fetchAddAnswer, setCurrentAnswer })(withRouter(Paper))