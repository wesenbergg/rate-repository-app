import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import theme from '../theme';
import Text from './Text';
import thousandsToK from '../utils/thousandsToK';

const styles = StyleSheet.create({
  item: {
    fontSize: 15,
    padding: theme.spacing.p5,
    marginBottom: 3,
    backgroundColor: theme.colors.profileCardBg
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

const DetailBox = ({header, body}) => {
    return(
    <View style={styles.detailBoxContainer}>
      <Text style={{textAlign: "center"}} subheading bold>{header}</Text>
      <Text style={{textAlign: "center"}} color="textSecondary">{body}</Text>
    </View>
  );
};

const RepositoryListItem = ({ repo }) => {
  // console.log(repo);
  return (
  <View style={styles.item}>
    <View style={{flexDirection: "row"}}>
      <Image style={styles.tinyLogo} source={{ uri: repo.ownerAvatarUrl }} />
      <View style={styles.headerTextContainer}>
        <Text subheading bold>{repo.fullName}</Text>
        <Text color="textSecondary">{repo.description}</Text>
        <Text style={{alignSelf: 'flex-start', marginVertical: 10}} badge bold>{repo.language}</Text>
      </View>
    </View>
    <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-around'}}>
      <DetailBox body="Stars" header={thousandsToK(repo.stargazersCount)} />
      <DetailBox body="Forks" header={thousandsToK(repo.forksCount)} />
      <DetailBox body="Reviews" header={thousandsToK(repo.reviewCount)} />
      <DetailBox body="Rating" header={thousandsToK(repo.ratingAverage)} />
    </View>

    {/* <Text>{repo.id}</Text> */}
    
  </View>
  );
};

export default RepositoryListItem;