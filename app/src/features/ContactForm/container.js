import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../components/Field';
import Button from '../../components/Button';
import { updateContactThunk } from '../ContactsList/actions';
import { findContact } from '../ContactsList/selectors';

class ContactFormContainer extends Component {
    required = value => (value ? undefined : 'Required');

    number = value => (
        value && isNaN(Number(value))
            ? 'Must be a number'
            : undefined
    );
    email = value => (
        value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? 'Invalid email address'
            : undefined
    );

    normalizePhone = (value) => {
        if (!value) {
            return value;
        }

        const onlyNums = value.replace(/[^\d]/g, '');

        if (onlyNums.length <= 3) {
            return onlyNums;
        }
        if (onlyNums.length <= 7) {
            return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
        }
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
    };

    updateContact = (contact) => {
        console.log(contact);
    }

    render() {
        const { handleSubmit, groups, initialValues: { photoUrl } } = this.props;

        return (
            <div>
                <form
                    className='edit-form'
                    onSubmit={handleSubmit(this.updateContact)}
                >
                    <div className='contact__field'>
                        <img
                            src={photoUrl}
                            alt='avatar'
                            className='avatar'
                        />
                    </div>
                    <Field
                        name='name'
                        type='text'
                        component={CustomField}
                        label='Name'
                        validate={[this.required]}
                    />
                    <Field
                        name='mobPhone'
                        type='text'
                        component={CustomField}
                        label='Mobile phone'
                        validate={[this.required]}
                        normalize={this.normalizePhone}
                        placeholder='0xx-xxx-xxxx'
                    />
                    <Field
                        name='workPhone'
                        type='text'
                        component={CustomField}
                        label='Work Phone'
                        normalize={this.normalizePhone}
                        placeholder='0xx-xxx-xxxx'
                    />
                    <Field
                        name='birthday'
                        type='date'
                        component={CustomField}
                        label='Birthday'
                    />
                    <Field
                        name='email'
                        type='email'
                        component={CustomField}
                        label='Email'
                        validate={[this.email]}
                    />
                    <div className='contact__field'>
                        <label className='contact__label'>Group</label>
                        <Field
                            name='groupId'
                            component='select'
                            className='contact__input contact__input--select'
                        >
                            <option value={null}>Choose group</option>
                            {groups.map(group =>
                                <option
                                    key={group.id}
                                    value={group.id}
                                >{group.title}</option>)}
                        </Field>
                    </div>
                    <Field
                        name='description'
                        type='textarea'
                        component={CustomField}
                        label='Description'
                    />
                    <div className='contact__field'>
                        <Button
                            type='submit'
                            className='contact__save'
                        >Save</Button>
                    </div>
                </form>
            </div>
        );
    }
}

ContactFormContainer.propTypes = {};

export default compose(
    connect(
        (state, ownProps) => ({
            initialValues: findContact(state, ownProps),
            groups: state.contacts.groups,
        }),
        {
            updateContactThunk,
        }
    ),
    reduxForm({
        form: 'EditContact',
    })
)(ContactFormContainer);
