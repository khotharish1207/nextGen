import React from 'react';
import { ScrollView, StyleSheet, View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Block, Text, theme } from 'galio-framework';

import { articles, nowTheme } from '../constants/';
import { Icon, Input, Button as LButton } from '../components';

class AddNewFeed extends React.Component {
  state = {
    image: null,
    full: true,
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        // base64: true
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  renderCards = () => {
    let { image } = this.state;
    return (
      <Block flex>
        <Block flex style={styles.imageContainer}>
          {image && <Image source={{ uri: image }} style={styles.fullImage} />}
        </Block>
        <Button title="Pick an image from camera roll" onPress={this._pickImage} />
      </Block>
    );
  };

  renderInputs = () => {
    return (
      <Block flex>
        <Text size={16} style={styles.title}>
          Title
        </Text>
        <Block>
          <Input
            primary={this.state.primaryFocus}
            right
            placeholder="Title of news"
            onFocus={() => this.setState({ primaryFocus: true })}
            onBlur={() => this.setState({ primaryFocus: false })}
            iconContent={<Block />}
            shadowless
          />
        </Block>
        <Text size={16} style={styles.title}>
          Content
        </Text>
        <Block>
          <Input
            primary={this.state.ContentFocus}
            right
            placeholder="Content"
            onFocus={() => this.setState({ ContentFocus: true })}
            onBlur={() => this.setState({ ContentFocus: false })}
            iconContent={<Block />}
            shadowless
          />
        </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block flex style={styles.container}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps='always'
        >
          {this.renderCards()}
          {this.renderInputs()}
          <Block flex center style={{ marginTop: 20 }}>
            <LButton
              // onPress={this.onClick(feed.url)}
              round
              color="primary"
              size="small"
            >
              Share
            </LButton>
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: theme.SIZES.BASE,
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 20,
    color: nowTheme.COLORS.HEADER,
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
  fullImage: {
    height: 215,
  },
});

export default AddNewFeed;
