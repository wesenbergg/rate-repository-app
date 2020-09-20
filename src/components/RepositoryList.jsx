import React from 'react';
import { FlatList, View, StyleSheet, SafeAreaView } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryListItem from './RepositoryListItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

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
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return (
  <SafeAreaView>
    <RepositoryListContainer repositories={repositories}/>
  </SafeAreaView>
  );
};

export default RepositoryList;