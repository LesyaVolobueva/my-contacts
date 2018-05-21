import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ onChange, groups }) => {
    return (
        <div className='filter'>
            <div className='filter__search'>
                <input
                    type="text"
                    name='nameFilter'
                    onChange={onChange}
                    className='filter__search-input'
                    placeholder='Enter the name'
                />
            </div>
            <div className='filter__select'>
                <select
                    name='groupFilter'
                    onChange={onChange}
                >
                    <option value=''>Choose group</option>
                    {groups.map(group =>
                        <option
                            value={group.id}
                            key={group.id}
                        >{group.title}</option>)}
                </select>
            </div>
        </div>
    );
};

Filter.propTypes = {
    onChange: PropTypes.func,
    groups: PropTypes.arrayOf(Object),
};

export default Filter;
