import React, { useState } from 'react';
import { TouchableOpacity, Text, Animated, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { InterviUColors, InterviUTypography, InterviUSpacing } from '../assets/styles/brandStyles';

const GradientButton = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled,
    style,
    ...props
}) => {
    const [pressAnim] = useState(new Animated.Value(1));

    const handlePressIn = () => {
        Animated.spring(pressAnim, {
            toValue: 0.95,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(pressAnim, {
            toValue: 1,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const getGradientColors = () => {
        if (disabled) {
            return ['rgba(150, 150, 150, 0.5)', 'rgba(100, 100, 100, 0.5)'];
        }
        switch (variant) {
            case 'primary':
                return InterviUColors.primaryGradient;
            case 'danger':
                return ['#FF3B30', '#FF6B6B'];
            case 'success':
                return ['#34C759', '#4CD964'];
            default:
                return InterviUColors.primaryGradient;
        }
    };

    const buttonStyles = [
        styles.button,
        size === 'small' && styles.buttonSmall,
        size === 'large' && styles.buttonLarge,
        disabled && styles.buttonDisabled,
        style,
    ];

    const textStyles = [
        styles.text,
        size === 'small' && styles.textSmall,
        size === 'large' && styles.textLarge,
        disabled && styles.textDisabled,
    ];

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={disabled ? null : onPress}
            onPressIn={disabled ? null : handlePressIn}
            onPressOut={disabled ? null : handlePressOut}
            {...props}
        >
            <Animated.View style={[buttonStyles, { transform: [{ scale: pressAnim }] }]}>
                <LinearGradient
                    colors={getGradientColors()}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                >
                    <Text style={textStyles}>{title}</Text>
                </LinearGradient>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: InterviUSpacing.borderRadius.base,
        overflow: 'hidden',
        ...InterviUSpacing.shadow.md,
    },
    buttonSmall: {
        minWidth: 80,
    },
    buttonLarge: {
        minWidth: 160,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    gradient: {
        paddingVertical: InterviUSpacing.spacing[3],
        paddingHorizontal: InterviUSpacing.spacing[6],
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        ...InterviUTypography.styles.button,
        color: InterviUColors.white,
        textAlign: 'center',
    },
    textSmall: {
        fontSize: InterviUTypography.fontSize.sm,
    },
    textLarge: {
        fontSize: InterviUTypography.fontSize.lg,
    },
    textDisabled: {
        color: 'rgba(255, 255, 255, 0.7)',
    },
});

export default GradientButton;
