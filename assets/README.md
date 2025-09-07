# InterviU Brand Assets

This folder contains all the brand assets and styling for the Quick Status Board app, following the InterviU brand guidelines.

## 📁 Folder Structure

```
assets/
├── logos/           # InterviU logo variants
├── profiles/        # Default profile pictures
├── banners/         # Social media banners
├── styles/          # Brand styling system
└── README.md        # This file
```

## 🎨 Brand Assets

### Logos

- **Source:** `C:\Users\fajea\Desktop\InterviU\Graphic_chart\Logo 1\` and `Logo 2\`
- **Formats:** HD PNG, SVG, Transparent PNG
- **Usage:** App icons, headers, branding elements

### Profile Pictures

- **Source:** `C:\Users\fajea\Desktop\InterviU\Graphic_chart\Logo 1\Profile Pic\`
- **Formats:** PNG with transparent backgrounds
- **Usage:** Default user avatars, profile placeholders

### Social Media Banners

- **Source:** `C:\Users\fajea\Desktop\InterviU\Graphic_chart\Media_banner\`
- **Platforms:** Facebook, LinkedIn, X (Twitter)
- **Usage:** Social sharing, profile exports

## 🎨 Brand Colors

The InterviU brand uses a 5-color palette:

- **Dark Blue:** `#010916` - Primary text, dark backgrounds
- **Deep Blue:** `#070854` - Secondary elements
- **Purple Blue:** `#5639FE` - Primary brand color, buttons
- **Medium Blue:** `#5E91FE` - Accent color
- **Light Blue:** `#66E8FD` - Highlights, gradients

## 📝 Typography

- **Font Family:** Poppins
- **Weights:** Regular (400), Medium (500), SemiBold (600), Bold (700)
- **Usage:** All text elements throughout the app

## 📏 Spacing System

- **Base Unit:** 8px
- **Scale:** 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px, 128px
- **Usage:** Consistent spacing for all UI elements

## 🚀 Usage

### Import Brand Styles

```javascript
import InterviUBrandStyles, {
  InterviUColors,
  InterviUTypography,
  InterviUSpacing,
} from "../assets/styles/brandStyles";

// Use in your components
const styles = StyleSheet.create({
  container: {
    ...InterviUBrandStyles.container,
    backgroundColor: InterviUColors.background.primary,
  },
  title: {
    ...InterviUBrandStyles.heading,
    color: InterviUColors.text.primary,
  },
});
```

### Use Brand Colors

```javascript
import { InterviUColors } from "../assets/styles/brandStyles";

const buttonStyle = {
  backgroundColor: InterviUColors.purpleBlue,
  borderRadius: InterviUSpacing.borderRadius.base,
};
```

### Apply Typography

```javascript
import { InterviUTypography } from "../assets/styles/brandStyles";

const textStyle = {
  ...InterviUTypography.styles.h3,
  color: InterviUColors.text.primary,
};
```

## 📋 Asset Integration Checklist

- [ ] Copy logo files from Graphic_chart folder
- [ ] Copy profile picture assets
- [ ] Copy social media banners
- [ ] Update app.json with new app icon
- [ ] Apply brand colors throughout the app
- [ ] Implement Poppins font family
- [ ] Use consistent spacing system
- [ ] Test on Android device

## 🔄 Pull Request Integration

This asset system is designed to support the following pull requests:

1. **PR #2: InterviU Brand Integration** - Primary usage of these assets
2. **PR #3: Enhanced User Profiles** - Profile picture assets
3. **PR #4: Advanced UI Components** - Styling system
4. **PR #5: Social Media Integration** - Banner assets

## 📱 Platform Considerations

- **Android:** All assets optimized for Android display
- **Responsive:** Assets scale appropriately for different screen sizes
- **Performance:** Optimized file sizes for mobile performance

---

_This asset system ensures consistent branding and professional appearance across the entire Quick Status Board application._
