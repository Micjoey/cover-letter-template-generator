import React from 'react'
import { Route, Switch } from 'react-router-dom'

import JobListView from './containers/job_container/JobListView'
import JobDetailView from './containers/job_container/JobDetailView'
import CoverLetterView from './containers/forms/CoverLetterView'
import Login from './containers/Login'
import Signup from './containers/Signup'

const BaseRouter = (props) => (
    <div>
        <Switch>
            <Route exact path='/job/form' component={CoverLetterView}/>
            <Route exact path='/jobs/:jobID' render={() => (<JobDetailView {...props}/>)}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/' component={JobListView}/>
            <Route path='' component={JobListView}/>
        </Switch>
    </div>
)

export default BaseRouter