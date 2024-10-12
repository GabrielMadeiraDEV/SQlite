import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('app.db');

export const executeSql = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        params,
        (tx, results) => {
          resolve(results);
        },
        error => {
          reject(error);
        }
      );
    });
  });
};

export default db;