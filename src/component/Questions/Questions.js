import React from 'react';
import { questionTypes } from './../../Data/questionType'
import QuestionType from './Question';
import { connect } from 'react-redux'
import { addQuestion, removeQuestion } from './../../Redux/Reducers/QuestionReducer'
import { fetchQuestions, fetchAddQuestion, fetchUserQuestions, fetchRemoveQuestion } from '../../Redux/Actions';

class Questions extends React.Component {

    componentDidMount() {
        this.props.fetchQuestions()
        console.log('didMount')
        // this.props.fetchUserQuestions()
    }

    // componentDidUpdate() {        
    //     this.props.fetchQuestions()
    //     // this.props.fetchUserQuestions()
    // }    

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.usersQuestions != this.props.usersQuestions && nextProps.allQuestions != this.props.allQuestions) {
            console.log('true')
        } else {
            console.log('false')
        }
        
        return true
        // nextProps.usersQuestions != this.props.usersQuestions
    }


    render() {
        console.log('render')
        // const questionsTypesArr = questionTypes.map(item => item.id)

        // const usersQuestions = this.props.usersQuestions.map(item => {
        //     let i = questionsTypesArr.indexOf(item, 0)
        //     return {
        //         id: item,
        //         title: questionTypes[i].title,
        //         description: questionTypes[i].description
        //     }
        // })

        // const typeForAdd = questionTypes.filter(item => !this.props.usersQuestions.includes(item.id))

        let queRest =[]
        let myRest =[]

        this.props.allQuestions.map( item => {
            if (this.props.usersQuestions.includes(item.id)) {
                myRest.push({
                    id: item.id,
                    title: item.title,
                    desc: item.desc
                })
            } else {
                queRest.push({
                    id: item.id,
                    title: item.title,
                    desc: item.desc
                })
            }
        })


        return (
            <>
                {/* <div>
                    <div className='heading'>
                        <h1>Мои активности</h1>
                    </div>

                    {
                        usersQuestions.map(item => <QuestionType
                            name={item.title}
                            key={item.id}
                            description={item.description}
                            type={'Убрать'}
                            done={false}
                            click={() => this.props.removeQuestion(item.id)}
                        />)
                    }
                </div> */}




                {/* <h2>Добавить</h2>
                <hr></hr>
                <div>
                    {
                        typeForAdd.map(item => <QuestionType 
                            name={item.title} 
                            key={item.id} 
                            description={item.description}
                            done={true}
                            type={'Добавить'}                        
                            click={() => this.props.addQuestion(item.id)} />)
                    }
                </div> */}

                {/* <hr></hr> */}


                <div className='heading'>
                    <h1>Мои активности</h1>
                </div>

                <div>
                    {
                        myRest.map(item => <QuestionType
                            name={item.title}
                            key={item.id}
                            done={false}
                            description={item.desc}
                            type={'Удалить'}
                            click={() => this.props.fetchRemoveQuestion(item.id, this.props.usersQuestions)}
                        />)
                    }
                </div>



                <div>
                    {
                        queRest.map(item => <QuestionType
                            name={item.title}
                            key={item.id}
                            done={true}
                            description={item.desc}
                            type={'Добавить'}
                            click={() => this.props.fetchAddQuestion(item.id, this.props.usersQuestions)}
                        />)
                    }
                </div>
            </>
        )
    }


}

const mapStateToProps = state => {
    return {
        usersQuestions: state.questions.usersQuestions,
        allQuestions: state.questions.allQuestions,
        restQuestions: state.questions.restQuestions
    }
}

export default connect(mapStateToProps, { addQuestion, removeQuestion, fetchQuestions, fetchAddQuestion, fetchRemoveQuestion })(Questions)