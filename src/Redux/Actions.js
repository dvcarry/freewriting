import Axios from 'axios'
import { addQuestion, removeQuestion, doneTask, loadingOff, loadingOn, fetchAllQuestions, fetchUserQuestions, actionFetchQuestions, fetchTasks } from './Reducers/QuestionReducer'

Axios.defaults.baseURL = 'https://free-ad202.firebaseio.com/';

export function fetchQuestions() {
    return async dispatch => {
        console.log('dispatch questoiins')
        // dispatch(loadingOn)

        try {
            let allQuestions = await Axios.get('questionTypes.json')
            allQuestions = Object.values(allQuestions.data)

            const allQuestionsArr = allQuestions.map(item => item.id)

            let myQuestions = await Axios.get('users/kirill/questions/.json')
            if (myQuestions.data) {
                myQuestions = Object.values(myQuestions.data)
            } else { myQuestions = [] }

            let myQuestionsArr = []
            let restQuestionArr = []

            allQuestionsArr.map(item => {
                if (myQuestions.includes(item)) {
                    myQuestionsArr.push(item)
                } else {
                    restQuestionArr.push(item)
                }
            })

            dispatch(actionFetchQuestions(allQuestions, myQuestionsArr))

        } catch (e) {
            console.log(e)
        }
    }
}

export function fetchAddQuestion(item, array) {
    return async dispatch => {

        // dispatch(loadingOn)        
        // debugger
        console.log(item)

        const newArr = [...array, item]
        console.log(newArr)

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

export function fetchAddAnswer(data) {
    return dispatch => {

        console.log('fetch')

        try {
            Axios.post('users/kirill/answers.json', data)

        } catch (e) {
            console.log(e)
        }

    }
}

export function fetchDayTasks(date) {
    return async dispatch => {

        try {            
            let allQuestions = await Axios.get('questionTypes.json')
            const allQuestionsObj = allQuestions.data
            allQuestions = Object.values(allQuestions.data)          
            
            let answers = await Axios.get('users/kirill/answers.json')
            answers = Object.values(answers.data)
            
            const answersArr = answers.map(item => item.id)
            console.log('answers', answers, answersArr)

            let myQuestions = await Axios.get('users/kirill/questions.json')
            myQuestions = Object.values(myQuestions.data) 

            myQuestions = myQuestions.map(item => {
                return {
                    id: `${date} ${item}`,
                    type: item
                }
            })

            let myTaskToDo = []

            myQuestions.map(item => {
                if (!answersArr.includes(item.id)) {
                    myTaskToDo.push({
                        title: allQuestionsObj[item.type].title,
                        type: item.type
                    })
                } 
            })

            dispatch(fetchTasks(myTaskToDo))
            

            console.log(myTaskToDo)

        } catch (error) {
            console.log(error)
        }
    }
}

