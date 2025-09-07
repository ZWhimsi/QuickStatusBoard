import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Animated, StyleSheet } from 'react-native';
import { InterviUColors, InterviUTypography, InterviUSpacing } from '../assets/styles/brandStyles';

const FloatingLabelInput = ({
    label,
    value,
    onChangeText,
    multiline,
    style,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const animatedLabelValue = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animatedLabelValue, {
            toValue: (isFocused || value) ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, value]);

    const labelStyle = {
        position: 'absolute',
        left: InterviUSpacing.spacing[4],
        top: animatedLabelValue.interpolate({
            inputRange: [0, 1],
            outputRange: [multiline ? 24 : 16, 8],
        }),
        fontSize: animatedLabelValue.interpolate({
            inputRange: [0, 1],
            outputRange: [InterviUTypography.fontSize.base, InterviUTypography.fontSize.xs],
        }),
        color: animatedLabelValue.interpolate({
            inputRange: [0, 1],
            outputRange: [InterviUColors.text.muted, InterviUColors.lightBlue],
        }),
    };

    return (
        <View style={[styles.container, style]}>
            <Animated.Text style={[styles.label, labelStyle]}>
                {label}
            </Animated.Text>
            <TextInput
                style={[
                    styles.input,
                    multiline && styles.multilineInput,
                    isFocused && styles.inputFocused,
                ]}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={value}
                onChangeText={onChangeText}
                multiline={multiline}
                placeholderTextColor={InterviUColors.text.muted}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: InterviUSpacing.spacing[4],
    },
    label: {
        ...InterviUTypography.styles.label,
        backgroundColor: 'transparent',
        paddingHorizontal: InterviUSpacing.spacing[1],
    },
    input: {
        ...InterviUTypography.styles.body,
        color: InterviUColors.text.light,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: InterviUSpacing.borderRadius.lg,
        paddingHorizontal: InterviUSpacing.spacing[4],
        paddingTop: InterviUSpacing.spacing[6],
        paddingBottom: InterviUSpacing.spacing[3],
        height: 60,
    },
    multilineInput: {
        height: 120,
        textAlignVertical: 'top',
        paddingTop: InterviUSpacing.spacing[8],
    },
    inputFocused: {
        borderColor: InterviUColors.lightBlue,
        borderWidth: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        ...InterviUSpacing.shadow.md,
    },
});

export default FloatingLabelInput;
