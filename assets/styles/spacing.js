// InterviU Spacing System
// Consistent spacing values for layout and design

export const InterviUSpacing = {
  // Base spacing unit (8px)
  unit: 8,
  
  // Spacing Scale
  spacing: {
    0: 0,
    1: 4,   // 0.5 * unit
    2: 8,   // 1 * unit
    3: 12,  // 1.5 * unit
    4: 16,  // 2 * unit
    5: 20,  // 2.5 * unit
    6: 24,  // 3 * unit
    8: 32,  // 4 * unit
    10: 40, // 5 * unit
    12: 48, // 6 * unit
    16: 64, // 8 * unit
    20: 80, // 10 * unit
    24: 96, // 12 * unit
    32: 128, // 16 * unit
  },
  
  // Common Layout Spacing
  layout: {
    // Container padding
    containerPadding: 16,
    screenPadding: 20,
    
    // Component spacing
    componentMargin: 16,
    sectionMargin: 24,
    
    // Card spacing
    cardPadding: 16,
    cardMargin: 12,
    
    // Form spacing
    inputMargin: 12,
    labelMargin: 8,
    
    // Button spacing
    buttonPadding: 16,
    buttonMargin: 8,
    
    // List spacing
    listItemPadding: 16,
    listItemMargin: 8,
  },
  
  // Border Radius
  borderRadius: {
    none: 0,
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    full: 9999,
  },
  
  // Shadows
  shadow: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    base: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
  
  // Icon Sizes
  iconSize: {
    xs: 12,
    sm: 16,
    base: 20,
    md: 24,
    lg: 32,
    xl: 40,
    '2xl': 48,
  },
  
  // Avatar Sizes
  avatarSize: {
    xs: 24,
    sm: 32,
    base: 40,
    md: 48,
    lg: 64,
    xl: 80,
    '2xl': 96,
  },
};

export default InterviUSpacing;
