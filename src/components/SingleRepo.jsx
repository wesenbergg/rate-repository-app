import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking, FlatList } from 'react-native';
import theme from '../theme';
import Text from './Text';
import formatDate from '../utils/dateFormattor';
import { useParams } from 'react-router-native';
import { GET_SINGLE_REPO } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';
import RepositoryListItem from './RepositoryListItem';

const styles = StyleSheet.create({
  item: {
    fontSize: 15,
    padding: theme.spacing.p5,
    backgroundColor: theme.colors.profileCardBg,
    flexDirection: "column"
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
  headerTextContainer: {
    paddingLeft: theme.spacing.p5,
  },
  detailBoxContainer: {
    margin: 8,
  },

});

const Review = ({item}) => {
  const review = item.node;
  // borderRadius: 70, borderWidth: 4
  return(
    <>
      <View style={{flexDirection: "row", padding: 5, backgroundColor: "white"}}>
        <View>
          <Text style={{padding: 20 }} h1 bold center >{review.rating}</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text subheading bold >{review.user.username}</Text>
          <Text color="textSecondary">{formatDate(review.createdAt)}</Text>
          <Text style={{ marginRight: 80 }} testID="language">{review.text}</Text>
        </View>
      </View>
    </>
    );
}

const Reviews = ({reviews, onEndReach}) => {
  // console.log(reviews);
  return(
    <FlatList
    data={reviews}
    renderItem={({ item }) => <Review item={item} />}
    keyExtractor={({ id }) => id}
    ItemSeparatorComponent={() => <View style={{height: 10}} />}
    onEndReached={onEndReach}
    onEndReachedThreshold={0.5}
    // ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    // ...
  />
  );
}

const SingleRepo = () => {
  const { id } = useParams();

  const variables = { id, first: 3 }

  const { data, loading, fetchMore } = useQuery(GET_SINGLE_REPO, {
    fetchPolicy: 'cache-and-network',
    variables: { ...variables }
  });

  const onEndReach = () => {
    // console.log("onEndReach called", loading);
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    fetchMore({
      query: GET_SINGLE_REPO,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        // console.log("pre", previousResult.repository.reviews.edges.length);
        // console.log("fetch", fetchMoreResult.repository.reviews.edges.length);
        // console.log("pre", previousResult.repository.reviews.edges);
        const nextResult = {
          repository: {
            ...previousResult.repository,
            reviews: {
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
              ...fetchMoreResult.repository.reviews,
            }
          },
        };
        // console.log(nextResult.repository.reviews.edges.length);
        return nextResult;
      },
    });
  };

  if(!data || !data.repository) return <></>;

  return (
    <>
      <View style={styles.item}>
        <RepositoryListItem repo={data.repository} />
        <TouchableOpacity onPress={() => Linking.openURL(data.repository.url)}>
          <Text style={{width: "100%", textAlign: "center", marginVertical: 10}} badge bold >
            Open in Github
          </Text>
        </TouchableOpacity>
      </View>
      <Reviews reviews={data.repository.reviews.edges} onEndReach={onEndReach}/>
    </>
  );
};

export default SingleRepo;