import React from 'react';
import { FlatList, View, StyleSheet, SafeAreaView, Text } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryListItem from './RepositoryListItem';
import RNPickerSelect from 'react-native-picker-select';
 
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const Dropdown = () => {
    return (
        <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
        />
    );
};

const ItemSeparator = () => <View style={styles.separator} />;
const renderItem = (e) => <RepositoryListItem testID="item" repo={e} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      testID="list"
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(e) => renderItem(e.item)}
      keyExtractor={e => e.id}
      ListHeaderComponent={Dropdown}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return (
  <>
    <RepositoryListContainer repositories={repositories}/>
  </>
  );
};

export default RepositoryList;