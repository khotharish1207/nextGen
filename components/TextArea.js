import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { nowTheme } from '../constants';

class TextArea extends React.Component {
  render() {
    const { shadowless, success, error, primary } = this.props;

    const inputStyles = [
      styles.input,
      // !shadowless,
      success && styles.success,
      error && styles.error,
      primary && styles.primary,
      { ...this.props.style },
    ];

    return (
      <TextInput
        placeholder="write something here"
        //placeholderTextColor={nowTheme.COLORS.MUTED}
        style={inputStyles}
        //color={nowTheme.COLORS.HEADER}
        //iconContent={<Icon size={14} color={nowTheme.COLORS.ICON} name="link" family="AntDesign" />}
        {...this.props}
      />
    );
  }
}

TextArea.defaultProps = {
  shadowless: false,
  success: false,
  error: false,
  primary: false,
};

TextArea.propTypes = {
  shadowless: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  primary: PropTypes.bool,
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
    // height: 44,
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'top',
  },
  success: {
    borderColor: nowTheme.COLORS.INPUT_SUCCESS,
  },
  error: {
    borderColor: nowTheme.COLORS.INPUT_ERROR,
  },
  primary: {
    borderColor: nowTheme.COLORS.PRIMARY,
  },
  shadow: {
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 0.5 },
    shadowRadius: 1,
    shadowOpacity: 0.13,
    elevation: 2,
  },
});

export default TextArea;
