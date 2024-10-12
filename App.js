import React from 'react';
import { SafeAreaView } from 'react-native';
import SqlComponent from './src/components/SqltComponent';

const app = () => {
  const userTableColumns = [
    { name: 'name', type: 'TEXT' },
    { name: 'age', type: 'INTEGER' }
  ];

  return (
    <SafeAreaView>
      <SqlComponent tableName="user_data" columns={userTableColumns} />
    </SafeAreaView>
  );
};

export default App;