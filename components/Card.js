import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import {
  StyleSheet, Image, Share, TextInput, Text as RNText, View, TouchableOpacity, ScrollView
} from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';

import { nowTheme } from '../constants';
// import { Audio, Video } from "expo-av";
import Video from './VideoInCard'
import Dialog from './Dialog'
import Input from './Input'
import Comment from './Comment'
import UserAvtar from './UserAvatar'

import KeyboardAwareScrollView from './KeyboardAwareScrollViewCustom'
import { like, postComment } from '../redux/actions/actions';
import { getLoginAlert } from '../utils/ui'



class Card extends React.Component {
  state = {
    isLiked: false,
    showComments: false,
    comment: '',
    // likeCount: 0,
    // commentCount: 0,
    // commentDetails: []

  }

  componentDidMount() {
    const { item: { likeCount, commentDetails, commentCount, likeDetailsMap = {} }, auth } = this.props;
    let isLiked = false
    if (auth && auth.userId) {
      isLiked = !!likeDetailsMap[auth.userId]
    }
    this.setState({ likeCount, commentDetails, commentCount })
  }

  doLike = () => {
    const { like, item, isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return getLoginAlert();
    }
    const { isLiked } = this.state
    like({ id: item.id, like: !isLiked })
    this.setState({ isLiked: !isLiked })
  }

  doShare = () => {
    const { item } = this.props;
    const url = `${item.title} - ${item.authorName}`

    Share.share(
      {
        message: url,
        url,
        title: 'Next gen app ',
      },
      {
        // Android only:
        dialogTitle: 'Next gen app',
        // iOS only:
        excludedActivityTypes: [],
      }
    );
  };

  doComment = () => {
    const { postComment, item, isLoggedIn } = this.props;
    const { comment } = this.state;
    if (!isLoggedIn) {
      return getLoginAlert();
    }
    if (comment) {
      postComment({ id: item.id, commentContent: comment })
      this.setState({ comment: '' })
    }

  }


  renderButtons = (feed) => {
    return (
      <Block flex>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block row space="evenly">
            <Block flex>
              <Button
                round
                onlyIcon
                color="transparent"
                icon="thumbs-up"
                iconFamily="Font-Awesome"
                iconColor={this.state.isLiked && nowTheme.COLORS.THUMB_SWITCH_ON}
                iconSize={theme.SIZES.BASE}
                style={styles.optionsButton}
                onPress={this.doLike}
              >
                like
              </Button>
            </Block>
            <Block flex>
              <Button
                onPress={this.showComments}
                round
                onlyIcon
                color="transparent"
                size="small"
                icon="comments"
                iconFamily="Font-Awesome"
                //  iconColor={theme.COLORS.WHITE}
                iconSize={theme.SIZES.BASE}
                style={styles.optionsButton}
              >
                Comments
              </Button>
            </Block>
            <Block flex>
              <Button
                onPress={this.doShare}
                round
                onlyIcon
                color="transparent"
                size="small"
                icon="share-alt"
                iconFamily="Font-Awesome"
                // iconColor={theme.COLORS.WHITE}
                iconSize={theme.SIZES.BASE}
                style={styles.optionsButton}
              >
                Share
              </Button>
            </Block>

          </Block>
        </Block>
      </Block>
    );
  };

  showComments = () => this.setState({ showComments: true })
  hideComments = () => this.setState({ showComments: false })
  onChangeText = (comment) => this.setState({ comment });

  renderCommentsView = () => {
    const { showComments, comment } = this.state;
    const { item: { commentDetails = [] } } = this.props;

    return <Dialog
      visible={showComments}
      onClose={this.hideComments}
      full
      title='Comments'
      style={{ padding: 10 }}
    >

      <KeyboardAwareScrollView padding={20} stickyHeaderIndices={[0]}>
        <Block style={styles.container}>
          <Input
            iconContent={<Block />}
            placeholder="Add a comment..."
            keyboardType="twitter" // keyboard with no return button
            autoFocus={true} // focus and show the keyboard
            style={styles.input}
            value={comment}
            onChangeText={this.onChangeText} // handle input changes
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.doComment}
          >
            {/* Apply inactive style if no input */}
            <RNText style={[styles.text, !comment ? styles.inactive : []]}>Post</RNText>
          </TouchableOpacity>
        </Block>
        {commentDetails.reverse().map((comment, index) => <Comment comment={comment} key={index} />)}

      </KeyboardAwareScrollView>
    </Dialog>
  }

  render() {
    const {
      navigation,
      item,
      horizontal,
      full = true,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle,
      showCta = true,
      isVideo = false
    } = this.props;

    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow,
    ];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        {/* <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro')}> */}

        <UserAvtar {...item} />
        <Block flex style={imgContainer}>
          {
            item.mediaType === "video" ?

              <Video
                source={{ uri: item.mediaUrl }}
                rate={1.0}
                volume={1.0}
                style={imageStyles}
              /> :
              <Image resizeMode="cover" source={{ uri: item.mediaUrl }} style={imageStyles} />

          }
        </Block>

        <Block flex space="between" style={styles.cardDescription}>
          <Block flex>
            {item.title && (
              <Text
                style={{ fontFamily: 'montserrat-regular' }}
                size={14}
                style={titleStyles}
                color={nowTheme.COLORS.SECONDARY}
              >
                {item.title}
              </Text>
            )}

            {item.details && (
              <Block flex>
                <Text
                  style={{ fontFamily: 'montserrat-regular' }}
                  size={12}
                  color={nowTheme.COLORS.BLACK}
                >
                  {item.details}
                </Text>
              </Block>
            )}

            {item.description && (
              <Block flex center>
                <Text
                  style={{ fontFamily: 'montserrat-regular', textAlign: 'center', padding: 15 }}
                  size={14}
                  color={'#9A9A9A'}
                >
                  {item.description}
                </Text>
              </Block>
            )}

            {item.body && (
              <Block flex left>
                <Text
                  style={{ fontFamily: 'montserrat-regular' }}
                  size={12}
                  color={nowTheme.COLORS.TEXT}
                >
                  {item.body}
                </Text>
              </Block>
            )}
          </Block>

          <Block flex right>
            <Text
              style={{ fontFamily: 'montserrat-regular', padding: 10 }}
              size={10}
              color={nowTheme.COLORS.BLACK}
            >
              Likes {item.likeCount} comments {item.commentCount}
            </Text>
          </Block>

          {this.renderButtons()}
          {showCta && (
            <Block right={ctaRight ? true : false}>
              <Text
                style={styles.articleButton}
                size={12}
                muted={!ctaColor}
                color={ctaColor || nowTheme.COLORS.ACTIVE}
                bold
              >
                {item.cta}
              </Text>
            </Block>
          )}
        </Block>
        {/* </TouchableWithoutFeedback> */}
        {this.renderCommentsView()}
      </Block>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 350,
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactive: {
    color: '#CCC',
  },
  text: {
    color: '#3F51B5',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
});


const mapState = ({ auth }) => ({ auth });
const mapDispatch = (dispatch) => bindActionCreators({ like, postComment }, dispatch);

export default withNavigation(connect(mapState, mapDispatch)(Card));
