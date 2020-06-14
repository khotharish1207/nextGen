import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Dimensions, ScrollView, View, Linking, Share } from 'react-native';
import { Block, theme, Text, Card, Button } from 'galio-framework';
import { Select, Icon, Input, Header, Switch, SocialPost } from '../components';

import moment from 'moment';

import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

import { articles, nowTheme, topics, feeds } from '../constants';
import { fetchSocialPosts } from '../redux/actions/actions';

const { width } = Dimensions.get('screen');

class Feeds extends React.Component {
  componentDidMount() {
    this.props.fetchSocialPosts();
  }

  shareToWhatsApp = (text) => () => {
    Linking.openURL(`whatsapp://send?text=${text}`);
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
                iconColor={nowTheme.COLORS.THUMB_SWITCH_ON}
                iconSize={theme.SIZES.BASE}
                style={styles.optionsButton}
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
                onPress={this.onClick(feed.url)}
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

  onLoadMore = () => this.props.fetchSocialPosts({ type: 'loadMore' });

  renderDummy = () => {
    const dummy = [];
    for (let index = 0; index < 4; index++) {
      dummy.push(
        <ContentLoader height={330} backgroundColor="#9f9d9e" foregroundColor="#ecebeb">
          <Rect x="65" y="164" rx="3" ry="3" width="88" height="6" />
          <Rect x="66" y="183" rx="3" ry="3" width="52" height="6" />
          <Rect x="13" y="228" rx="3" ry="3" width="369" height="6" />
          <Rect x="13" y="211" rx="3" ry="3" width="178" height="6" />
          <Circle cx="33" cy="176" r="20" />
          <Rect x="9" y="1" rx="0" ry="0" width="379" height="146" />
          <Rect x="308" y="178" rx="3" ry="3" width="52" height="6" />
          <Rect x="12" y="241" rx="3" ry="3" width="369" height="6" />
          <Rect x="13" y="254" rx="3" ry="3" width="369" height="6" />
          <Rect x="15" y="284" rx="3" ry="3" width="76" height="12" />
          <Rect x="300" y="270" rx="3" ry="3" width="35" height="7" />
          <Rect x="345" y="269" rx="3" ry="3" width="35" height="7" />
        </ContentLoader>
      );
    }
    return dummy;
  };
  render() {
    const {
      navigation,
      item,
      horizontal,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle,
      socialPosts = { data: [] },
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {socialPosts.data && socialPosts.data.length === 0
          ? this.renderDummy()
          : socialPosts.data.map((post, idx) => <SocialPost feed={post} key={`posts_${idx}`} />)}
        <Block row space="evenly">
          <Button
            round
            capitalize
            color={nowTheme.COLORS.ACTIVE}
            onPress={this.onLoadMore}
          >
            Load More
          </Button>
        </Block>
      </ScrollView>
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

const mapState = ({ posts }) => ({ ...posts });
const mapDispatch = (dispatch) => bindActionCreators({ fetchSocialPosts }, dispatch);
export default connect(mapState, mapDispatch)(Feeds);
