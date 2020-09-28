import { useMutation, useQuery } from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, SafeAreaView, Alert, TouchableOpacity, Linking } from 'react-native';
import { AUTHORIZED_USER_REVIEWS } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import theme from '../theme';
import Text from './Text';
 
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerTextContainer: {
    paddingLeft: theme.spacing.p5,
  },
  detailBoxContainer: {
    margin: 8,
  },
  btnPrimary: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.badge,
    margin: 12,
    flex:1,
    padding: 10,
  },
  btnDanger: {
    backgroundColor: theme.colors.error,
    borderRadius: theme.borderRadius.badge,
    margin: 12,
    flex:1,
    padding: 10,
  }
});

const createTwoButtonAlert = ( handleDelete ) =>{
  console.log(handleDelete);
  return Alert.alert(
    "Alert Title",
    "My Alert Msg",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => handleDelete() }
    ],
    { cancelable: true }
  );
}

const Review = ({item, refetch}) => {
  const review = item.node;
  const [mutate, result] = useMutation(DELETE_REVIEW);
  // console.log(review.id);
  const handleDelete = () => {
    console.log("Mutation");
    mutate({ variables: { id: review.id }})
    refetch()
  };

  return(
    <>
      <View style={{flexDirection: "row", padding: 5, backgroundColor: "white"}}>
        <View>
          <Text style={{padding: 20 }} h1 bold center >{review.rating}</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text subheading bold >{review.repositoryId}</Text>
          <Text color="textSecondary">{formatDate(review.createdAt)}</Text>
          <Text style={{ marginRight: 80 }} testID="language">{review.text}</Text>
        </View>
      </View>
      <View style={{flexDirection: "row", flex:1, padding: 5, backgroundColor: "white"}}>
        <TouchableOpacity style={styles.btnPrimary} activeOpacity={theme.buttons.activeOpacity} 
          onPress={() => Linking.openURL(review.repository.url)}>
            <Text center h1 bold light>Show repo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnDanger} activeOpacity={theme.buttons.activeOpacity}
            onPress={() => createTwoButtonAlert( handleDelete )}>
            <Text center h1 bold light>Delete review</Text>
          </TouchableOpacity>
      </View>
    </>
    );
}

const ReviewList = ({reviews, refetch}) => {
  return(
    <FlatList
    data={reviews}
    renderItem={({ item }) => <Review item={item} refetch={refetch} />}
    keyExtractor={({ id }) => id}
    ItemSeparatorComponent={() => <View style={{height: 10}} />}
  />
  );
}

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(AUTHORIZED_USER_REVIEWS, {
    fetchPolicy: 'cache-and-network',
  });
  
  if(loading && !data)return <></>;
  // console.log(data);
  return (
  <>
    <ReviewList refetch={refetch} reviews={data.authorizedUser.reviews.edges}/>
  </>
  );
};

export default MyReviews;