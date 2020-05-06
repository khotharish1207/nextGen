import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { Block, Text, Card } from 'galio-framework';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, CategoryIcon } from '../components';
import { articles, nowTheme, topics } from '../constants';
import { chunk } from '../utils';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class Home extends React.Component {
  getChunkSize = () => {
    return Math.ceil(width / 150);
  };

  renderArticles = () => {
    const Topics = chunk([...topics, ...topics], this.getChunkSize());
    // console.log('*****', Topics);

    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Text
          h4
          style={{
            fontFamily: 'montserrat-regular',
            marginBottom: nowTheme.SIZES.BASE / 2,
          }}
          color={nowTheme.COLORS.HEADER}
        >
          Categories
        </Text>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {topics.map((t, i) => (
            <CategoryIcon
              key={i + '_chunk'}
              item={t}
              style={{ marginRight: nowTheme.SIZES.BASE }}
            />
          ))}
        </ScrollView>

        <Text
          h4
          style={{
            fontFamily: 'montserrat-regular',
            marginBottom: nowTheme.SIZES.BASE / 2,
          }}
          color={nowTheme.COLORS.HEADER}
        >
          Suggested Topics
        </Text>
        <Block row space="around" style={{ marginTop: nowTheme.SIZES.BASE, flexWrap: 'wrap' }}>
          {topics.map((t, i) => (
            <Block key={`viewed-${i}`} style={styles.shadow}>
              <CategoryIcon key={i + '_chunk'} item={t} style={styles.albumThumb} />
            </Block>
          ))}
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - nowTheme.SIZES.BASE * 2,
    paddingVertical: nowTheme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    // width: thumbMeasure,
    // height: thumbMeasure
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
});

export default Home;
