// import {questionTypes, questionTypesIdArray} from './questionType'
// import { connect } from 'react-redux'

// export const userTodayTasks = props => {
//     debugger
//     const usersQuestions = props.usersQuestions.map(item => {
//         let i = questionTypesIdArray.indexOf(item, 0)
//         return {
//             id: item,
//             title: questionTypes[i].title,
//             description: questionTypes[i].description
//         }
//     })

//     console.log(usersQuestions)

//     const usersAnswers = props.usersAnswers
    
//     const userTaskDone = []
//     const userTaskDoneArr = []
//     for (let key in usersAnswers) {
//         userTaskDone.push({id: usersAnswers[key].type, title: usersAnswers[key].title})
//         userTaskDoneArr.push(usersAnswers[key].type)
//     }

//     const userTaskToDo = usersQuestions.filter( item => !userTaskDoneArr.includes(item.id))

//     return {
//         userTaskToDo,
//         userTaskDone
//     }

// }

// const mapStateToProps = state => {
//     return {
//         usersQuestions: state.questions.usersQuestions,
//         usersAnswers: state.answers.usersDay
//     }
// }

// export default connect(mapStateToProps)(userTodayTasks)

 