import { handleActions } from 'redux-actions'
import { Record } from 'immutable'
import * from actionTypes from '../action/action-types'

const InitialState = new Record({
    loaded: false,
    uuid: {},
    errors: {},
});

const uuid = handleActions({
    [actionTypes.UUID_ROW]: (state = InitialState(), action) => state
        .set('loaded', true)
        .set('uuid', action.payload)
        .set('errors', action.error)
}, new InitialState());

export default uuid;
