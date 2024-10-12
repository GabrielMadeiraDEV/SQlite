import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { executeSql } from '../database/db';

const SqlComponent = ({ tableName, columns }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const createTable = async () => {
      const columnsSql = columns.map(col => `${col.name} ${col.type}`).join(', ');
      await executeSql(`CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, ${columnsSql})`);
    };

    const fetchData = async () => {
      const results = await executeSql(`SELECT * FROM ${tableName}`);
      const rows = results.rows._array;
      setData(rows);
    };

    createTable();
    fetchData();
  }, [tableName, columns]);

  const insertData = async () => {
    const sampleData = columns.map(col => `'Sample ${col.name}'`).join(', ');
    await executeSql(`INSERT INTO ${tableName} (${columns.map(col => col.name).join(', ')}) VALUES (${sampleData})`);
    const results = await executeSql(`SELECT * FROM ${tableName}`);
    const rows = results.rows._array;
    setData(rows);
  };

  return (
    <View style={styles.container}>
      <Button title="Insert Sample Data" onPress={insertData} />
      {data.map((row, index) => (
        <Text key={index} style={styles.row}>
          {Object.values(row).join(', ')}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default SqlComponent;