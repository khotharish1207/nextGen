import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Dimensions, ScrollView, View, Linking, Share } from 'react-native';
import { Block, theme, Text, Card, Button } from 'galio-framework';

import moment from 'moment';

import { articles, nowTheme, topics, feeds, Images } from '../constants';
const { width } = Dimensions.get('screen');

class SocialPost extends React.Component {
  state = {
    like: false,
  };
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
                iconColor={this.state.like && nowTheme.COLORS.THUMB_SWITCH_ON}
                iconSize={theme.SIZES.BASE}
                style={styles.optionsButton}
                onPress={this.onLike}
              >
                like
              </Button>
            </Block>
            <Block flex>
              <Button
                // onPress={this.onClick(feed.url)}
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
                onPress={this.onClick(feed.title)}
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
            {/* <Block flex right>
                  <Button
                    textStyle={{ fontFamily: 'montserrat-regular', fontSize: 10 }}
                    center
                    color="default"
                    style={styles.optionsButton}
                  >
                    SAVE FOR LATER
                  </Button>
                </Block> */}
          </Block>
        </Block>
      </Block>
    );
  };

  onClick = (url) => () => {
    Share.share(
      {
        message: url,
        url,
        title: 'Next gen app share title',
      },
      {
        // Android only:
        dialogTitle: 'Next gen app',
        // iOS only:
        excludedActivityTypes: [],
      }
    );
  };

  onLike = () => this.setState({ like: !this.state.like });

  render() {
    const {
      navigation,

      horizontal,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle,
      feed,
    } = this.props;

    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow,
    ];
    // console.log(`***link***`, feed.postImgUrl);
    

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <Card
          flex
          borderless
          card={false}
          shadow={false}
          style={styles.card}
          title={feed.author}
          //   caption={feed.source.name || ''}
          caption={moment(feed.createTs).format('dddd, MMMM Do YYYY, h:mm:ss a')}
          location="Los Angeles, CA"
          avatar={Images.person}
          imageStyle={styles.cardImageRadius}
          imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
        //   image={Images.newsPlaceholder}
          image={feed.postImgUrl}
        />
        <Block flex space="between" style={styles.cardDescription}>
          <Block flex>
            <Text
              style={{ fontFamily: 'montserrat-regular' }}
              size={14}
              style={titleStyles}
              color={nowTheme.COLORS.SECONDARY}
            >
              {feed.title}
            </Text>

            {feed.subtitle && (
              <Block flex left>
                <Text
                  style={{ fontFamily: 'montserrat-regular' }}
                  size={32}
                  color={nowTheme.COLORS.BLACK}
                >
                  {feed.subtitle}
                </Text>
              </Block>
            )}

            {feed.content && (
              <Block flex left>
                <Text
                  style={{ fontFamily: 'montserrat-regular', padding: 10, paddingTop: 0 }}
                  size={14}
                  color={'#9A9A9A'}
                >
                  {feed.content}
                </Text>
              </Block>
            )}
            <Block flex right>
              <Text
                style={{ fontFamily: 'montserrat-regular', padding: 10 }}
                size={10}
                color={nowTheme.COLORS.BLACK}
              >
                Likes {feed.likeCount} comments {feed.commentCount}
              </Text>
            </Block>

            <Block right={ctaRight ? true : false}>
              <Text
                style={styles.articleButton}
                size={12}
                muted={!ctaColor}
                color={ctaColor || nowTheme.COLORS.ACTIVE}
                bold
              >
                View article
              </Text>
            </Block>
            {this.renderButtons(feed)}
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  articles: {
    width: width - nowTheme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
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
    paddingBottom: 10,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7,
    padding: 15,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default SocialPost;
