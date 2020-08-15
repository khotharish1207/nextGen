import React, { PureComponent, PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import moment from 'moment';


export default class Comment extends PureComponent {

  //   static propTypes = {
  //     // Comment object shape
  //     comment: PropTypes.shape({
  //       content: PropTypes.string.isRequired,
  //       created: PropTypes.string.isRequired,
  //       // User object shape
  //       user: PropTypes.shape({
  //         name: PropTypes.string.isRequired,
  //         avatar: PropTypes.string.isRequired,
  //       }).isRequired,
  //     }).isRequired,
  //   };

  render() {
    // Pull comment object out of props
    const { comment } = this.props;
    // Pull data needed to display a comment out of comment object
    const { content, created, user, authorName, commentContent, timeStamp } = comment;
    // Pull user name and avatar out of user object
    // const { name, avatar } = user;

    // const userProfileAvtar = avatar ? { uri: avatar } : require('../assets/person_placeholder.jpg')
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            resizeMode='contain'
            style={styles.avatar}
            source={require('../assets/person_placeholder.jpg')}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text>
            <Text style={[styles.text, styles.name]}>{authorName}</Text>
            {' '}
            <Text style={styles.text}>{commentContent}</Text>
          </Text>
          <Text style={[styles.text, styles.created]}>{moment(timeStamp).fromNow()}</Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatarContainer: {
    alignItems: 'center',
    marginLeft: 5,
    paddingTop: 10,
    width: 40,
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    padding: 5,
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 13,
    width: 26,
    height: 26,
  },
  text: {
    color: '#000',
    // fontFamily: 'Avenir',
    fontSize: 15,
  },
  name: {
    fontWeight: 'bold',
  },
  created: {
    color: '#BBB',
  },
});