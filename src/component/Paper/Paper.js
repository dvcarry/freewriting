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

class Paper extends React.Component {

    // state = {
    //     text: '',
    //     date: this.props.match.params.date,
    //     type: this.props.match.params.type,
    //     title: questionTypes[questionTypesIdArray.indexOf(this.props.match.params.type)].title
    // }

    // addText = event => {
    //     this.setState({text: event.target.value})

    // }

    clickReady = () => {

        // // console.log(this.state)
        // const z = this.props.usersTaskToDo.filter(item => item != state.type)
        // console.log(z)
        // const nextTask = this.props.usersTaskToDo.length > 0 ? this.props.usersTaskToDo.filter(item => item != this.props.currentAnswer.type)[0] : '' 
        // debugger
        // const nextTaskUrl = '/tasks/' + this.props.currentAnswer.date + '/' + nextTask
        // console.log(nextTask)

        
        if (this.props.currentAnswer.status === 'old') {
            this.props.editAnswer()
        } else {            
            
            this.props.fetchAddAnswer(this.props.currentAnswer)
            this.props.addAnswer()
            this.props.doneTask(this.props.match.params.type)               
        }

        
        this.props.history.push('/day/')     
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
        this.props.history.push('/day/')
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

        // current ? console.log('yes') : console.log('no')

        // console.log(current)

        // this.props.addCurrentAnswer({
        //     date: this.props.match.params.date,
        //     type: this.props.match.params.type,
        //     title: questionTypes[questionTypesIdArray.indexOf(this.props.match.params.type)].title,
        //     text: ''
        // })
        // this.addCurrent()
    }

    // componentDidUpdate() {
    //     this.addCurrent()
    // }


    render() {

        // console.log(this.props.answers)

        // debugger

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
                        // value={this.state.text} 
                        // value={this.props.currentAnswer.text}
                        value={currentAnswer.text}
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
                        {/* <span>{this.props.currentAnswer.length}</span> */}
                    </div>
                </div>
            </div>

        )
    }
}



const mapStateToProps = state => {
    return {
        answers: state.answers.usersDay,
        usersTaskToDo: state.questions.usersTaskToDo,
        currentAnswer: state.answers.currentAnswer
    }
}

export default connect(mapStateToProps, { addAnswer, doneTask, addCurrentAnswer, editAnswer, fetchAddAnswer })(withRouter(Paper))
// export default connect()(Paper)