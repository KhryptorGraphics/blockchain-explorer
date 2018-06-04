var sql = require('../db/pgservice.js');

function getUUIDStatusList(channelName) {
    let sqlUUIDList = `selecct * from UUID`;
    return sql.getRowsBySQlQuery(sqlUUIDList);
}

function getUUIDStatusRow(channelName) {
    let sqlUUID = `select * from UUID where reqcreatedt = (select MAX(reqcreatedt) from UUID) limit 1`;
    return sql.getRowByPkOne(sqlUUID)
}


exports.getUUIDStatusList = getUUIDStatusList
exports.getUUIDStatusRow = getUUIDStatusRow
