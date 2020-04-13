const ADD_ANSWER = 'ADD_ANSWER',
    ADD_TASK = 'ADD_TASK',
    EVERYDAY_TASK = 'EVERYDAY_TASK',
    CURRENT_ANSWER = 'CURRENT_ANSWER',
    EDIT_ANSWER = 'EDIT_ANSWER',
    RESET_CURRENT_ANSWER = 'RESET_CURRENT_ANSWER',
    FETCH_DONE_TASKS = 'FETCH_DONE_TASKS',
    SET_DONE_TASKS = 'SET_DONE_TASKS:'


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
        case CURRENT_ANSWER:
            return {
                ...state,
                currentAnswer: action.payload
            }
        case RESET_CURRENT_ANSWER:
            return {
                ...state,
                currentAnswer: {}
            }
        case EDIT_ANSWER:
            const newAnswers = { ...state.usersAnswers }
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
        type: CURRENT_ANSWER,
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