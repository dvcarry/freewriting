import Axios from 'axios'
import { addQuestion, removeQuestion, doneTask, loadingOff, loadingOn, fetchAllQuestions, fetchUserQuestions, actionFetchQuestions, fetchTasks } from './Reducers/QuestionReducer'
import { today } from './../Data/dates'
import { setDoneTasks } from './Reducers/AnswerReducer';

Axios.defaults.baseURL = 'https://free-ad202.firebaseio.com/';

export function fetchQuestions() {       
    
    return async (dispatch, getState) => {
        console.log('dispatch questoiins')
        // dispatch(loadingOn)

        // const { questions } = getState()
        // const { allQuestions } = questions

        // console.log('try', allQuestions)

        // if (allQuestions.length > 0) {
        //     return
        // }


        try {
            const {data: allQuestionsData} = await Axios.get('questionTypes.json')
            const allQuestions = Object.values(allQuestionsData)

            const allQuestionsIds = allQuestions.map(item => item.id)

            const dataMyQuestions = await Axios.get('users/kirill/questions.json')         
            const myQuestions = Object.values(dataMyQuestions.data) || []

            const myQuestionsArr = allQuestionsIds.filter(type => myQuestions.includes(type))
            const restQuestionArr = allQuestionsIds.filter(type => !(myQuestions.includes(type)))

            dispatch(actionFetchQuestions(allQuestionsData, myQuestionsArr, restQuestionArr))

        } catch (e) {
            console.log(e)
        }
    }
}

export function fetchAddQuestion(item, array) {
    return async dispatch => {

        // dispatch(loadingOn)        
        // debugger
        // console.log(item)

        const newArr = [...array, item]
        // console.log(newArr)

        // const response = await Axios.get('questionTypes.json')            
        // const allQuestionsArr = Object.values(response.data).map( i => {            
        // })

        try {
            Axios.put('users/kirill/questions/.json', newArr)
            dispatch(addQuestion(item))

        } catch (e) {
            console.log(e)
        }
    }
}

export function fetchRemoveQuestion(item, array) {
    return async dispatch => {

        const newArr = array.filter(i => i != item)

        // const response = await Axios.get('questionTypes.json')            
        // const allQuestionsArr = Object.values(response.data).map( i => {            
        // })

        try {
            Axios.put('users/kirill/questions/.json', newArr)
            dispatch(removeQuestion(item))

        } catch (e) {
            console.log(e)
        }
    }
}

export function fetchAddAnswer(date, type, data) {
    return dispatch => {

        console.log('fetch')

        try {
            Axios.put('users/kirill/answers/' + date + '/' + type + '.json', data)

        } catch (e) {
            console.log(e)
        }

    }
}

export function fetchDayTasks() {
    return async dispatch => {

        try {
            
            dispatch(loadingOn)

            let allQuestions = await Axios.get('questionTypes.json')
            const allQuestionsObj = allQuestions.data
            allQuestions = Object.values(allQuestions.data)

            let answers = await Axios.get(`users/kirill/answers/${today}.json`)

            let answersArr = []
            if (answers.data) {
                answers = Object.values(answers.data)      
                // answersArr = answers.map(item => item.id)          
                answersArr = answers.map(item => item.type)          
            }

            let myQuestions = await Axios.get('users/kirill/questions.json')

            let myTaskToDo = []

            if (myQuestions.data) {
                myQuestions = Object.values(myQuestions.data)                

                myQuestions.map(item => {
                    if (!answersArr.includes(item)) {
                        myTaskToDo.push({
                            title: allQuestionsObj[item].title,
                            type: item
                        })
                    }
                })
            }          


            dispatch(loadingOff)

            dispatch(fetchTasks(myTaskToDo))
            if (answersArr.length > 0) {
                dispatch(setDoneTasks(answers))
            }  


            if (myQuestions.length > 0) {
                dispatch(fetchUserQuestions(myQuestions))
            }



        } catch (error) {
            console.log(error)
        }
    }
}

