/*
    SPDX-License-Identifier: Apache-2.0
*/

var sql = require('../db/pgservice.js');

function getTransactionByID(channelName, txhash) {
    let sqlTxById = ` select * from TRANSACTION where txhash = '${txhash}' `;
    return sql.getRowByPkOne(sqlTxById);
}

function getTxList(channelName, blockNum, txid) {
    let sqlTxList = ` select * from transaction where  blockid >= ${blockNum} and id >= ${txid} and
     channelname = '${channelName}'  order by  transaction.id desc`;
    return sql.getRowsBySQlQuery(sqlTxList);

}

exports.getTransactionByID = getTransactionByID
exports.getTxList = getTxList
