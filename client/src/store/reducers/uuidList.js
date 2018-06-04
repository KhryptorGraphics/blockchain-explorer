import { handleActions } from 'redux-actions'
import { Record } from 'immutable'
import * as actionTypes from '../actions/action-types'
import moment from 'moment-timezone';

const InitialState = new Record ({
    loaded: false,
    uuidList: [],
    errors: {},

})

const uuidList = handleActions({
    [actionTypes.UUID_LIST]: (state = InitialState(), action) => {
        action.payload.rows.forEach(element => {
            element.reqcreatedt = moment(element.reqcreatedt).tz(moment.tz.guess()).format("YYYY-MM-DD HH:mm")
        })
        return (
            state
                .set('uuidList', action.payload)
                .set('loaded', true)
                .set('errors', action.error)
        )
    }
}, new InitialState());

export default uuidList;
