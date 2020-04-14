import React from 'react';
import { setCurrentAnswerTimer } from '../../Redux/Reducers/AnswerReducer';
import { connect } from 'react-redux';

class Timer extends React.Component {   

    componentDidMount() {
        this.interval = setInterval(() => this.increment(), 60000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    increment = () => {
        this.props.setCurrentAnswerTimer(1)
    }

    render() {      


        return (
            <span>
                {this.props.timer} мин.
            </span>
        )
    }

}

const mapStateToProps = state => {
    return {
        timer: state.answers.currentAnswer.timer
    }       
}

export default connect(mapStateToProps, {setCurrentAnswerTimer})(Timer)