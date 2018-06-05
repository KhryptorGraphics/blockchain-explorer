import { createAction } from 'redux-actions'
import * as actionTypes from '../action-types'
import { get } from '../../../services/request.js';

export const getUUIDStatusList = (channel) => dispatch => {
    get('/api/uuidlist/' + channel)
        .then(resp => {
            dispatch(createAction(actionTypes.UUID_LIST)(resp))
        }).catch((error) => {
            console.log(error);
        })
}
