import React from 'react';
import { StyleSheet } from 'react-native';
import { theme } from 'galio-framework';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function KeyboardAwareScrollViewCustom({ children, padding, styles = {}, ...props }) {
  return (
    <KeyboardAwareScrollView enableOnAndroid style={[styles.container, styles]} {...props}>
      {children}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.SIZES.BASE,
  },
});

export default KeyboardAwareScrollViewCustom;
