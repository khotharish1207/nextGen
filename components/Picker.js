import React, { useState } from 'react';
import {
    View, Picker,
    StyleSheet
} from 'react-native';
// import { Picker } from '@react-native-community/picker';

import nowTheme from '../constants/Theme';



function renderOptions(options) {

    return options.map(({ value, label }) => (
        <Picker.Item
            key={value}
            label={label}
            value={value}
        />
    ));
}

function SelectPicker({
    onChange,
    style,
    value,
    options,
    prompt,
    ...props
}) {
    const [selectedValue, setSelectedValue] = useState(value); // Pune

    const onValueChangeCustom = (itemValue) => {

        setSelectedValue(itemValue)
        onChange && onChange(itemValue);
    };


    return (
        <Picker
            style={[styles.pickerItem, style]}
            prompt={prompt}
            selectedValue={selectedValue}
            onValueChange={onValueChangeCustom}
            {...props}
        >
            {options && options.length > 0 && renderOptions(options)}
        </Picker>
    );
}

SelectPicker.defaultProps = {
    mode: 'dialog',
    // options: [],
    style: {},
    value: "select",
    // prompt: 'Select'
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pickerItem: {
        color: nowTheme.COLORS.ACTIVE,
        fontWeight: 'normal',
        // fontFamily: 'montserrat-regular',
    },
});

export default SelectPicker
