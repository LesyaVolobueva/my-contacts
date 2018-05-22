import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import CustomField from '../../components/Field';
import Button from '../../components/Button';

const ContactEdit = ({
    required,
    email,
    normalizePhone,
    updateContact,
    initialValues,
    groups,
    handleSubmit,
    back,
}) => {
    return (
        <div>
            <form
                className='form'
                onSubmit={handleSubmit(updateContact)}
            >
                {initialValues && <div className='contact__field'>
                    <img
                        src={initialValues.photoUrl}
                        alt='avatar'
                        className='avatar'
                    />
                </div>}
                <Field
                    name='name'
                    type='text'
                    component={CustomField}
                    label='Name'
                    validate={[required]}
                    placeholder='Enter the name'
                />
                <Field
                    name='mobPhone'
                    type='text'
                    component={CustomField}
                    label='Mobile phone'
                    validate={[required]}
                    normalize={normalizePhone}
                    placeholder='0xx-xxx-xxxx'
                />
                <Field
                    name='workPhone'
                    type='text'
                    component={CustomField}
                    label='Work Phone'
                    normalize={normalizePhone}
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
                    validate={[email]}
                    placeholder='email@exam.com'
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
                <div className='contact__field'>
                    <label className='contact__label'>Description</label>
                    <Field
                        name='description'
                        component='textarea'
                        className='contact__input'
                        placeholder='Description'
                    >
                    </Field>
                </div>
                <div className='contact__field'>
                    <Button
                        onClick={back}
                        type='button'
                        className='contact__save'
                    >
                        Back
                    </Button>
                    <Button
                        type='submit'
                        className='contact__save'
                    >
                        Save
                    </Button>

                </div>
            </form>
        </div>
    );
};

ContactEdit.propTypes = {
    required: PropTypes.func,
    email: PropTypes.func,
    normalizePhone: PropTypes.func,
    updateContact: PropTypes.func,
    initialValues: PropTypes.shape(Object),
    groups: PropTypes.arrayOf(Object),
    handleSubmit: PropTypes.func,
};

export default ContactEdit;
