import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterByGroups, filterByName } from './actions';
import Filter from './component';

class FilterContainer extends Component {
    state = {
        nameFilter: '',
        groupFilter: '',
    };

    onChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });

        if (name === 'nameFilter') {
            this.props.filterByName(value);
        } else {
            this.props.filterByGroups(value);
        }
    };

    render() {
        const { groups } = this.props;

        return (
            <Filter
                groups={groups}
                onChange={this.onChange}
            />
        );
    }
}

FilterContainer.propTypes = {
    filterByGroups: PropTypes.func,
    filterByName: PropTypes.func,
};

export default connect(
    null,
    { filterByGroups, filterByName }
)(FilterContainer);
