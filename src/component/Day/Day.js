import React from 'react';
import Task from './Task';
import { questionTypes, questionTypesIdArray } from './../../Data/questionType'
import { connect } from 'react-redux'
import { today } from './../../Data/dates'
import { userTodayTasks } from '../../Data/tasksToDo';
import { NavLink } from "react-router-dom";
import { render } from '@testing-library/react';
import { resetCurrentAnswer } from './../../Redux/Reducers/AnswerReducer'
import { fetchDayTasks } from './../../Redux/Actions'



class Day extends React.Component {

    // const questionsTypesArr = questionTypes.map(item => item.id)


    componentDidMount() {
        this.props.resetCurrentAnswer()
        this.props.fetchDayTasks('11-3-2020')
    }
    
    render() {

        // console.log('render')
        // const usersQuestions = this.props.usersQuestions.map(item => {
        //     let i = questionTypesIdArray.indexOf(item, 0)
        //     return {
        //         id: item,
        //         title: questionTypes[i].title,
        //         description: questionTypes[i].description
        //     }
        // })
    
        // const usersAnswers = this.props.usersAnswers
    
        // const userTaskDone = []
        // const userTaskDoneArr = []
        // for (let key in usersAnswers) {
        //     userTaskDone.push({ id: usersAnswers[key].type, title: usersAnswers[key].title })
        //     userTaskDoneArr.push(usersAnswers[key].type)
        // }
    
        // const userTaskToDo = usersQuestions.filter(item => !userTaskDoneArr.includes(item.id))



        return (
            <>
                {/* <p>{currMonthWord}, {currDay}</p> */}
    
                <div className='heading'>
                    <h1>Рукописи на сегодня</h1>
                    <p>{today}</p>
                </div>
    
                {/* {
                    usersQuestions.length === 0 
                    ? <div><p>К великому сожалению, у тебя нет довленных задач.</p> <NavLink to='/questions/'>Добавить</NavLink></div> 
                    : null
                } */}
                
               
                <div>
                    {
                        this.props.usersTaskToDo.map(item => <Task
                            name={item.title}
                            key={item.id}
                            id={item.id}
                            date={today}
                            done={false}
                            description={item.description}
                            add={() => this.props.addQuestion(item.id)} />)
                    }
                </div>
             
                {/* <div>
                    {
                        userTaskDone.map(item => <Task
                            name={item.title}
                            key={item.id}
                            id={item.id}
                            date={today}
                            done={true}
                            description={item.description}
                            add={() => this.props.addQuestion(item.id)} />)
                    }
                </div>
     */}
            </>
        )
    }

    
}

const mapStateToProps = state => {
    return {
        usersQuestions: state.questions.usersQuestions,
        usersAnswers: state.answers.usersDay,
        userToday: state.answers.userTodayTasks,
        usersTaskToDo: state.questions.usersTaskToDo
    }
}

export default connect(mapStateToProps, { resetCurrentAnswer, fetchDayTasks })(Day)