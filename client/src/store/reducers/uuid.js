import { handleActions } from 'redux-actions'
import { Record } from 'immutable'
import * as actionTypes from '../actions/action-types'
import moment from 'moment-timezone'

const InitialState = new Record({
    loaded: false,
    uuid: {},
    errors: {},
});

const uuid = handleActions({
    [actionTypes.UUID_ROW]: (state = InitialState(), action) => {
        return (
            state
                .set('loaded', true)
                .set('uuid', action.payload)
                .set('errors', action.error)
        )
    }
}, new InitialState());

export default uuid;
