import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css'
import reducer from './reducer'
import * as serviceWorker from './serviceWorker'
import EndPointController from './scripts/controller/EndPointController'
import CardComponent from './scripts/component/CardComponent'
import CardFavoriteComponent from './scripts/component/CardFavoriteComponent'
import ModalComponent from './scripts/component/ModalComponent'
import NavBarComponent from './scripts/component/NavBarComponent'
import FormComponent from './scripts/component/FormComponent'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


const endPointController = new EndPointController()

const store = createStore(reducer)

ReactDOM.render(
    <React.StrictMode >
        <Provider store={store}>
            <header>
                <NavBarComponent />
            </header>
            <main className="container-lg mt-5">
                <div className="mt-5">
                    {endPointController.endpoint ? (<FormComponent />) : null }
                </div>
                <div className="mt-5">
                    <div className="row justify-content-around row-cols-1 row-cols-md-2" id="cardsArea">
                        <Router>
                            <Switch>
                            <Route path="/">
                                <CardComponent endPoint={endPointController.endpoint} />
                            </Route>
                            <Route path="/favoritos">
                                <CardFavoriteComponent />
                            </Route>
                            </Switch>
                        </Router>
                        <ModalComponent />
                    </div>
                </div>
            </main>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

serviceWorker.unregister()
