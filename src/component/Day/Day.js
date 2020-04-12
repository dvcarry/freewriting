import React from 'react';
import Task from './Task';
import { connect } from 'react-redux'
import { today } from './../../Data/dates'
// import { render } from '@testing-library/react';
import { resetCurrentAnswer } from './../../Redux/Reducers/AnswerReducer'
import { fetchDayTasks } from './../../Redux/Actions'



class Day extends React.Component {

    // const questionsTypesArr = questionTypes.map(item => item.id)


    componentDidMount() {
        this.props.resetCurrentAnswer()
        this.props.fetchDayTasks(today)
    }
    
    render() {

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
                            id={item.type}
                            date={today}
                            done={false}
                            description={item.description}
                            add={() => this.props.addQuestion(item.id)} />)
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
                            description={item.description}
                            length={item.length}
                            add={() => this.props.addQuestion(item.id)} />)
                    }
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
        usersTaskToDo: state.questions.usersTaskToDo
    }
}

export default connect(mapStateToProps, { resetCurrentAnswer, fetchDayTasks })(Day)