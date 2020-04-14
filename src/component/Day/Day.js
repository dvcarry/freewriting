import React from 'react';
import Task from './Task';
import { connect } from 'react-redux'
import { today } from './../../Data/dates'
// import { render } from '@testing-library/react';
import { resetCurrentAnswer } from './../../Redux/Reducers/AnswerReducer'
import { fetchDayTasks, fetchQuestionsCatalog } from './../../Redux/Actions'
import { NavLink } from 'react-router-dom';
import Loader from '../UI/Loader';



class Day extends React.Component {

    // const questionsTypesArr = questionTypes.map(item => item.id)
    componentDidMount() {
        this.props.resetCurrentAnswer()
        this.props.fetchDayTasks(today)
        
        if (this.props.questionsCatalog === null) {
            this.props.fetchQuestionsCatalog()
        }
        
    }

    
    
    render() {

        let commonLength, commonTimer
        if (this.props.usersAnswers.length > 0) {
            commonLength = this.props.usersAnswers.reduce((sum, number) => sum + number.length, 0)
            commonTimer = this.props.usersAnswers.reduce((sum, number) => sum + number.timer, 0)
        }
        
        
        // {
        //     // let sum = 0
        //     // sum += number.length
        //     return sum + number.length
        // })

        console.log('ddffd', commonLength, commonTimer)


        return (
            <>
                {/* <p>{currMonthWord}, {currDay}</p> */}
    
                <div className='heading'>
                    <h1>Рукописи на сегодня</h1>
                    <p>{today}</p>
                </div>
                
                {
                    this.props.isLoading ? <Loader /> : null
                }
                {/* <Loader /> */}
    
                {
                    this.props.usersQuestions.length === 0 && !this.props.isLoading
                    ? <div><p>К сожалению, у тебя нет добавленных задач.</p> <NavLink to='/questions/'>Добавить</NavLink></div> 
                    : null
                }
                
               
                <div>
                    {
                        this.props.usersTaskToDo.map(item => <Task
                            name={item.title}
                            key={item.type}
                            id={item.type}
                            date={today}
                            done={false}                        
                            // description={item.description}
                            // add={() => this.props.addQuestion(item.id)} 
                            />)
                    }
                </div>
             
                <div>
                    {
                        this.props.usersAnswers.map(item => <Task
                            name={item.title}
                            key={item.id}
                            id={item.type}
                            date={today}
                            done={true}
                            // description={item.description}
                            length={item.length}
                            timer={item.timer}
                            // add={() => this.props.addQuestion(item.id)} 
                            />)
                    }
                </div>

                <div>
                    Сегодня ты уделил фрирайтингу {commonTimer} минут своей жизни и написал {commonLength} символов.
                </div>
    
            </>
        )
    }

    
}

const mapStateToProps = state => {
    return {
        usersQuestions: state.questions.usersQuestions,
        usersAnswers: state.answers.usersAnswers,
        userToday: state.answers.userTodayTasks,
        usersTaskToDo: state.questions.usersTaskToDo,
        isLoading: state.questions.isLoading,
        questionsCatalog: state.questions.allQuestions
    }
}

export default connect(mapStateToProps, { resetCurrentAnswer, fetchDayTasks, fetchQuestionsCatalog })(Day)