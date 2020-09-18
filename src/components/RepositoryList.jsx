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
const renderItem = (e) => <RepositoryListItem repo={e} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
  <SafeAreaView>
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(e) => renderItem(e.item)}
      keyExtractor={e => e.id}
      // other props
    />
  </SafeAreaView>
  );
};

export default RepositoryList;