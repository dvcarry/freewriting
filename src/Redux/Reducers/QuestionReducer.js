const ADD_QUESTIONS = 'ADD_QUESTION',
    REMOVE_QUESTIONS = 'REMOVE_QUESTIONS',
    DONE_TASK = 'DONE_TASK',
    LOADING_ON = 'LOADING_ON',
    LOADING_OFF = 'LOADING_OFF',
    FETCH_ALL_QUESTIONS = 'FETCH_ALL_QUESTIONS',
    FETCH_USER_QUESTIONS = 'FETCH_USER_QUESTIONS',
    FETCH_QUESTIONS = 'FETCH_QUESTIONS',
    FETCH_TASKS = 'FETCH_TASKS'

const initialState = {
    allQuestions: [],
    usersQuestions: [],
    usersTaskToDo: [],
    isLoading: false
}

const questionReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_QUESTIONS:
            return {
                ...state,
                usersQuestions: [...state.usersQuestions, action.payload],
                usersTaskToDo: [...state.usersTaskToDo, action.payload]
            }
        case REMOVE_QUESTIONS:         
            return {
                ...state,
                usersQuestions: [...state.usersQuestions.filter( item => item != action.payload) ],
                usersTaskToDo: [...state.usersTaskToDo.filter( item => item != action.payload) ]
            }
        case DONE_TASK:
            return {
                ...state,
                usersTaskToDo: [...state.usersTaskToDo.filter( item => item != action.payload) ]
            }
        case LOADING_ON:
            return {
                ...state,
                isLoading: true
            }
        case LOADING_OFF:
            return {
                ...state,
                isLoading: false
            }
        case FETCH_ALL_QUESTIONS:
            return {
                ...state,
                allQuestions: action.payload
            }
        case FETCH_USER_QUESTIONS:
            return {
                ...state,
                usersQuestions: action.payload
            }
        case FETCH_TASKS:
            return {
                ...state,
                usersTaskToDo: action.payload
            }
        case FETCH_QUESTIONS:
            return {
                ...state,
                usersQuestions: action.usersQuestions,
                allQuestions: action.allQuestions,
                // restQuestions: action.restQuestions
            }
        
        default:
            return state
    }
}




export const fetchAllQuestions = payload => {
    return {
        type: FETCH_ALL_QUESTIONS,
        payload
    }
}

export const fetchUserQuestions = payload => {
    return {
        type: FETCH_USER_QUESTIONS,
        payload
    }
}

export const actionFetchQuestions = (allQuestions, usersQuestions, restQuestions) => {
    return {
        type: FETCH_QUESTIONS,
        allQuestions,
        usersQuestions,
        restQuestions
    }
}


export const addQuestion = payload => {
    return {
        type: ADD_QUESTIONS,
        payload
    }
}

export const removeQuestion = payload => {
    return {
        type: REMOVE_QUESTIONS,
        payload
    }
}

export const doneTask = payload => {
    return {
        type: DONE_TASK,
        payload
    }
}

export const fetchTasks = payload => {
    return {
        type: FETCH_TASKS,
        payload
    }
}



export const loadingOff = {type: LOADING_OFF}
export const loadingOn = {type: LOADING_ON}




export default questionReducer