import React from 'react';
import { StyleSheet } from 'react-native';
import { Block } from 'galio-framework';
import nowTheme from '../constants/Theme';

function Divider({ borderColor }) {
  return (
    <Block
      style={{
        borderColor: borderColor,
        width: '93%',
        borderWidth: StyleSheet.hairlineWidth,
        marginHorizontal: 10,
      }}
    />
  );
}

Divider.defaultProps = { borderColor: nowTheme.COLORS.WHITE };

export default Divider;
