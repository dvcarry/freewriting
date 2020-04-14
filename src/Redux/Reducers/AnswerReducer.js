const ADD_ANSWER = 'ADD_ANSWER',
    ADD_TASK = 'ADD_TASK',
    EVERYDAY_TASK = 'EVERYDAY_TASK',
    ADD_CURRENT_ANSWER = 'ADD_CURRENT_ANSWER',
    EDIT_ANSWER = 'EDIT_ANSWER',
    RESET_CURRENT_ANSWER = 'RESET_CURRENT_ANSWER',
    FETCH_DONE_TASKS = 'FETCH_DONE_TASKS',
    SET_DONE_TASKS = 'SET_DONE_TASKS',
    SET_CURRENT_ANSWER_TIMER = 'SET_CURRENT_ANSWER_TIMER',
    SET_CURRENT_ANSWER = 'SET_CURRENT_ANSWER'


const initialState = {
    usersAnswers: [],
    // userTodayTasks: [],
    currentAnswer: {}
}


const answerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ANSWER:
            return {
                ...state,
                usersAnswers: [...state.usersAnswers, {
                    date: state.currentAnswer.date,
                    text: state.currentAnswer.text,
                    title: state.currentAnswer.title,
                    type: state.currentAnswer.type,
                    length: state.currentAnswer.length,
                    timer: state.currentAnswer.timer,
                    id: `${state.currentAnswer.date} ${state.currentAnswer.type}`
                }]

            }
        // case EVERYDAY_TASK:
        //     return {
        //         ...state,
        //         userTodayTasks: [...state.userTodayTasks, action.payload]
        //     }
        // case ADD_TASK:
        //     return {
        //         ...state,
        //         userTodayTasks: [...state.userTodayTasks, action.payload]
        //     }

        case SET_CURRENT_ANSWER:
            return {
                ...state,
                currentAnswer: action.payload
            }

        case ADD_CURRENT_ANSWER:
            const newCurrentAnswerText = { ...state.currentAnswer }
            newCurrentAnswerText.text = action.payload.text
            newCurrentAnswerText.length = action.payload.length
            return {
                ...state,
                currentAnswer: newCurrentAnswerText
            }

        case RESET_CURRENT_ANSWER:
            return {
                ...state,
                currentAnswer: {}
            }

        case SET_CURRENT_ANSWER_TIMER:
            const newCurrentAnswer = { ...state.currentAnswer }
            console.log(newCurrentAnswer)
            newCurrentAnswer.timer = newCurrentAnswer.timer + action.payload
            return {
                ...state,
                currentAnswer: newCurrentAnswer
            }

        case EDIT_ANSWER:
            const newAnswers = [...state.usersAnswers]
            newAnswers[state.currentAnswer.currentIndex].text = state.currentAnswer.text
            return {
                ...state,
                usersAnswers: newAnswers
            }

        case FETCH_DONE_TASKS:
            return {
                ...state,
                currentAnswer: {}
            }

        case SET_DONE_TASKS:
            return {
                ...state,
                usersAnswers: action.payload
            }

        default:
            return state
    }
}




export const setCurrentAnswer = payload => {
    return {
        type: SET_CURRENT_ANSWER,
        payload
    }
}

export const setCurrentAnswerTimer = payload => {
    return {
        type: SET_CURRENT_ANSWER_TIMER,
        payload
    }
}


export const setDoneTasks = payload => {
    return {
        type: SET_DONE_TASKS,
        payload
    }
}

export const addAnswer = payload => {
    return {
        type: ADD_ANSWER,
        payload
    }
}

export const addTask = payload => {
    return {
        type: ADD_TASK,
        payload
    }
}

export const addCurrentAnswer = payload => {
    return {
        type: ADD_CURRENT_ANSWER,
        payload
    }
}

export const editAnswer = payload => {
    return {
        type: EDIT_ANSWER,
        payload
    }
}

export const resetCurrentAnswer = payload => {
    return {
        type: RESET_CURRENT_ANSWER,
        payload
    }
}


export default answerReducer
