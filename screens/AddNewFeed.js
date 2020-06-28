import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Image, Button, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Block, Text, theme, Button as Btn, Icon } from 'galio-framework';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { addSocialPosts } from '../redux/actions/actions';
import { nowTheme } from '../constants/';
import {
  Input,
  Button as LButton,
  KeyboardAwareScrollView,
  LocationSelector,
  TextArea,
} from '../components';

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

      // console.log(result);
    } catch (E) {
      // console.log(E);
    }
  };

  renderCards = () => {
    let { image } = this.state;
    return (
      <Block flex>
        <Block flex style={styles.imageContainer}>
          {image && <Image source={{ uri: image }} style={styles.fullImage} />}
        </Block>

        <Button
          title="Pick an image from camera roll"
          icon="refresh"
          iconFamily="Font-Awesome"
          onPress={this._pickImage}
        />
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
            onChange={this.onChange('title')}
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
            onChange={this.onChange('content')}
            iconContent={<Block />}
            shadowless
          />
          <TextArea multiline numberOfLines={6} />
        </Block>
      </Block>
    );
  };

  renderLocationSelector = () => {
    return (
      <Block flex>
        <Text size={16} style={styles.title}>
          <Icon
            name="location-arrow"
            family="Font-Awesome"
            size={16}
            color={nowTheme.COLORS.PRIMARY}
            style={{ marginRight: 10 }}
          />
          &nbsp;Select City
        </Text>

        <LocationSelector style={{ color: nowTheme.COLORS.BLACK }} />
      </Block>
    );
  };

  onPostSubmit = () => {};

  onChange = (type) => (e) => this.setState({ [type]: e.target.value });

  render() {
    console.log(this.state);
    return (
      <KeyboardAwareScrollView>
        {this.renderCards()}
        {this.renderLocationSelector()}
        {this.renderInputs()}
        <Block flex center style={{ marginTop: 20 }}>
          <LButton round color="primary" size="small">
            Share
          </LButton>
        </Block>
      </KeyboardAwareScrollView>
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
    color: nowTheme.COLORS.PRIMARY,
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

const mapState = (state) => state;
const mapDispatch = (dispatch) => bindActionCreators({ addSocialPosts }, dispatch);

// export default AddNewFeed;
export default connect(mapState, mapDispatch)(AddNewFeed);
