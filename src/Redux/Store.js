import { createStore, combineReducers, applyMiddleware } from 'redux'
import questionReducer from './Reducers/QuestionReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import answerReducer from './Reducers/AnswerReducer';
import thunk from 'redux-thunk';
import authReducer from './Reducers/AuthReducer';

let reducers = combineReducers({
    questions: questionReducer,
    answers: answerReducer,
    auth: authReducer
})

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;