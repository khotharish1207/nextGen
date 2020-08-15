import React from 'react';
import { Image } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import axios from 'axios';


import configureStore from './redux/store';
import { fetchCategories, fetchServiceLocations, getToken, action } from './redux/actions/actions';
import Screens from './navigation/Screens';
import { Images, articles, nowTheme } from './constants';
import BusyScreen from './components/BusyScreen';
// import {retrieveAsyncData} from './utils'

const store = configureStore({});

(async function init() {

  // await store.dispatch(getToken());
  await store.dispatch(action());
  // await store.dispatch(fetchCategories());
  // await store.dispatch(fetchServiceLocations());
  // store.dispatch(fetchSocialPosts());
})();

// axios.interceptors.request.use(function (config) {
//   const token = store.getState().app.accessToken;
//   // const token = localStorage.getItem('token');
//   console.log('===axios.interceptors==', token)
//   config.headers.Authorization = token ? token : '';
//   return config;
// });

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.Logo,
  Images.Pro,
  Images.NowLogo,
  Images.iOSLogo,
  Images.androidLogo,
  Images.ProfilePicture,
  Images.CreativeTimLogo,
  Images.InvisionLogo,
  Images.RegisterBackground,
  Images.ProfileBackground,
  Images.person,
  Images.newsPlaceholder,
];

// cache product images
articles.map((article) => assetImages.push(article.image));

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false,
  };

  async componentDidMount() {
    Font.loadAsync({
      'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
      'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <NavigationContainer>
            <GalioProvider theme={nowTheme}>
              <Block flex>
                <Screens />
                <BusyScreen />
              </Block>
            </GalioProvider>
          </NavigationContainer>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([...cacheImages(assetImages)]);
  };

  _handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    if (this.state.fontLoaded) {
      this.setState({ isLoadingComplete: true });
    }
  };
}
