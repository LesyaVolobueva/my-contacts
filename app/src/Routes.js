import React from 'react';
import { Route, Switch } from 'react-router';
import ContactsList from './features/ContactsList';
import CallsHistory from './features/CallsHistory';
import ContactForm from './features/ContactForm';


class Routes extends React.Component {
    render() {
        return(
            <div>
                <Switch>
                    <Route
                        component={ContactsList}
                        path='/'
                        exact
                    />
                    <Route
                        component={ContactForm}
                        path='/contacts/:id'
                        exact
                    />
                    <Route
                        component={CallsHistory}
                        path='/calls/:id'
                        exact
                    />
                </Switch>
            </div>
        )
    }
}

export default Routes;