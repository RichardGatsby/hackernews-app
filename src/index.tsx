import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Header from './components/header/header';
import Main from './pages/main/main';
import Comments from './pages/comments/comments';
import './index.scss';
import * as serviceWorker from './serviceWorker';

// TODO: The app currently has no high level state management (meaning the Main components state will reset on navigation)
// to fix this we should implement redux or
// introduce higher root level component to hold the state
const routing = (
    //TODO: Refactor Router to router.tsx
    <Router>
        <div className="app">
            <div className="app__container">
                <Header />
                <div className="app__content">
                    <Route exact path="/" component={Main} />
                    <Route path="/comments/" component={Comments} />
                </div>
            </div>
        </div>
    </Router>
)
ReactDOM.render(routing, document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
