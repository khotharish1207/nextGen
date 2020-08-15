import React from 'react';
import { connect } from 'react-redux';
import { Modal, StyleSheet, View, Animated, Easing, ActivityIndicator } from 'react-native';
import { Button } from 'galio-framework';
import { nowTheme as theme } from '../constants/';


const spinValue = new Animated.Value(0);

Animated.loop(
  Animated.timing(spinValue, {
    toValue: 1,
    duration: 1500,
    easing: Easing.linear,
    useNativeDriver: true,
  })
).start();

const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'],
});

const BusyScreen = ({ visible, ...props }) => {
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        {/* <Button
          onlyIcon
          icon="refresh"
          iconFamily="Font-Awesome"
          iconSize={70}
          color="transparent"
          iconColor="#fff"
          style={{ transform: [{ rotate: spin }] }}
        /> */}
        <ActivityIndicator size={'large'} color={theme.COLORS.ACTIVE} />
      </View>
    </Modal>
  );
};

BusyScreen.defaultProps = {
  visible: false,
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 99,
  },
});

const mapState = ({ app }) => ({ visible: app.showBusyScreen });

export default connect(mapState)(BusyScreen);
