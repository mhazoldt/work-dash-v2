import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from 'axios'
import { Toaster, Position, Intent } from "@blueprintjs/core"
import { setReduxStateSaved } from '../redux/saved/actionCreators'
import { setReduxState } from '../redux/search/actionCreators'
import SavedCard from './SavedCard'


class Saved extends Component {


    handleChange = (e) => {

        this.props.dispatch(setReduxStateSaved({ [e.currentTarget.name]: e.currentTarget.value }))

    }


    displayResults = (results) => {
        
        if(results) {
            let cardCollapse = results.reduce((total, result) => {
                let guid = result['guid']
                total[guid] = true
                return total

            }, {})

            this.props.dispatch(setReduxStateSaved({ cardCollapse: cardCollapse }))

            let cardData = results.map((result) => {
                return (<SavedCard data={result} />)
            })

            this.props.dispatch(setReduxStateSaved({ cardJsx: cardData }))
        }

    }


    makeToaster = (message, intent) => {
        console.log('tried to make toaster')
        let newToster = Toaster.create({position: Position.TOP,  }, document.body)
        newToster.show({message: message, className: "pt-intent-primary mx-auto", intent: intent})
    }


    getSavedJobPosts = () => {
        let that = this

        axios.defaults.headers.common['Authorization'] = `JWT ${this.props.token}`

        axios.get('http://localhost:3001/api/listjobs')
        .then(function (response) {
            console.log('-- got response list jobs --')
            console.log(response)
            that.props.dispatch(setReduxStateSaved({ cardJson: response.data.data }))
        })
        .catch(function (error) {
            console.log(error)
        })

    }


    componentWillReceiveProps(nextProps) {
        console.log('SAVED GOT NEW PROPS')
        if (this.props.cardJson !== nextProps.cardJson) {
            
            this.displayResults(nextProps.cardJson)

        }

        console.log('needsUpdate', nextProps.needsUpdate)
        if (nextProps.needsUpdate === true) {

            this.getSavedJobPosts()
            this.props.dispatch(setReduxStateSaved({ needsUpdate: false }))

        }

    }


    componentDidMount() {

        this.getSavedJobPosts()
    
    }


    render() {

        return (

            <div className='container mt-4'>
                {this.props.cardJsx}
            </div>

        )
    }
}


function mapStateToProps(appState) {
    return {
        authUsername: appState.baselayout.authUsername,
        token: appState.baselayout.token,
        cardJsx: appState.saved.cardJsx,
        cardJson: appState.saved.cardJson,
        newJobPostSaved: appState.search.newJobPostSaved,
        jobPostRemoved: appState.saved.jobPostRemoved,
        needsUpdate: appState.saved.needsUpdate

    }
}


export default connect(mapStateToProps)(Saved)