import React from 'react';
import { Route, Switch } from 'react-router';
import ContactsList from './features/ContactsList';
import CallsHistory from './features/CallsHistory';
import ContactEditForm from './features/ContactEditForm';
import Contact from './features/ContactView';

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
                        component={ContactEditForm}
                        path='/edit/:id'
                        exact
                    />
                    <Route
                        component={Contact}
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