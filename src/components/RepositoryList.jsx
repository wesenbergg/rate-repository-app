import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, SafeAreaView, Text } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryListItem from './RepositoryListItem';
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from "use-debounce";
 
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const Dropdown = ({setSortBy}) => {
  const [search, setSearch] = useState();
  const [debouncedSearchTerm] = useDebounce(search, 1000);
  
  // Effect for API call 
  useEffect(
    () => {
      if (debouncedSearchTerm && debouncedSearchTerm != '') {
        setSortBy({ searchKeyword: debouncedSearchTerm, first: 8 })
      }
    }, [debouncedSearchTerm]);

    return (<>
      <Searchbar
        placeholder="Search"
        onChangeText={v => setSearch(v) }
        value={search}
      />
      <RNPickerSelect
        onValueChange={(value) => setSortBy(value)}
        items={[
          { label: 'Latest repositories', value: {orderBy: "CREATED_AT"} },
          { label: 'Highest rated repositories', value: {orderBy: "RATING_AVERAGE", orderDirection: "DESC", first: 8} },
          { label: 'Lowest rated repositories', value: {orderBy: "RATING_AVERAGE", orderDirection: "ASC", first: 8} },
        ]}
        />
        </>
    );
};

const ItemSeparator = () => <View style={styles.separator} />;
const renderItem = (e) => <RepositoryListItem testID="item" repo={e} />;

export const RepositoryListContainer = ({ repositories, setSortBy, onEndReach }) => {
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
      ListHeaderComponent={() => <Dropdown setSortBy={setSortBy}/>}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [ sortBy, setSortBy ] = useState({orderBy: "CREATED_AT", first: 8});
  const { repositories, fetchMore } = useRepositories({...sortBy});

  const onEndReach = () => {
    fetchMore();
  };

  return (
  <>
    <RepositoryListContainer onEndReach={onEndReach} repositories={repositories} setSortBy={setSortBy}/>
  </>
  );
};

export default RepositoryList;