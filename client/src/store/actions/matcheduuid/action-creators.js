import { createAction } from 'redux-actions'
import * as actionTypes from '../action-types'
import { get } from '../../../services/request.js';

export const getUUIDStatusRow = (channel) => dispatch => {
    get('/api/uuid/' + channel)
        .then(resp => {
            dispatch(createAction(actionTypes.UUID_ROW)(resp))
        }).catch((error) => {
            console.log(error);
        })
}
