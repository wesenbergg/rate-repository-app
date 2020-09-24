import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Button, TouchableOpacity, Linking, FlatList } from 'react-native';
import theme from '../theme';
import Text from './Text';
import formatDate from '../utils/dateFormattor';
import { useParams } from 'react-router-native';
import { GET_SINGLE_REPO } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';
import RepositoryListItem from './RepositoryListItem';
import { date } from 'yup';

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

const Reviews = ({reviews}) => {
  // console.log(reviews);
  return(
    <FlatList
    data={reviews}
    renderItem={({ item }) => <Review item={item} />}
    keyExtractor={({ id }) => id}
    ItemSeparatorComponent={() => <View style={{height: 10}} />}
    // ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    // ...
  />
  );
}

const SingleRepo = () => {
  const { id } = useParams();
  const [ repo, setRepo ] = useState();
  const { data } = useQuery(GET_SINGLE_REPO, {
    fetchPolicy: 'cache-and-network',
    variables: { id }
  });
  
  useEffect(() => {
    if(data) setRepo(data.repository)
  }, [id, data]);

  if(!repo) return <></>;

  return (
    <View>
      <View style={styles.item}>
        <RepositoryListItem repo={repo} />
        <TouchableOpacity onPress={() => Linking.openURL(repo.url)}>
          <Text style={{width: "100%", textAlign: "center", marginVertical: 10}} badge bold >
            Open in Github
          </Text>
        </TouchableOpacity>
      </View>
      <Reviews reviews={repo.reviews.edges} />
    </View>
  
  );
};

export default SingleRepo;