// InterviU Brand Styles
// Complete design system combining colors, typography, and spacing

import { StyleSheet } from "react-native";
import InterviUColors from "./colors";
import InterviUTypography from "./typography";
import InterviUSpacing from "./spacing";

export const InterviUBrandStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: InterviUColors.background.primary,
  },

  containerDark: {
    flex: 1,
    backgroundColor: InterviUColors.background.dark,
  },

  screenContainer: {
    flex: 1,
    backgroundColor: InterviUColors.background.primary,
    paddingHorizontal: InterviUSpacing.layout.screenPadding,
  },

  // Card Styles
  card: {
    backgroundColor: InterviUColors.background.card,
    borderRadius: InterviUSpacing.borderRadius.lg,
    padding: InterviUSpacing.layout.cardPadding,
    marginVertical: InterviUSpacing.layout.cardMargin,
    ...InterviUSpacing.shadow.base,
  },

  cardDark: {
    backgroundColor: InterviUColors.deepBlue,
    borderRadius: InterviUSpacing.borderRadius.lg,
    padding: InterviUSpacing.layout.cardPadding,
    marginVertical: InterviUSpacing.layout.cardMargin,
    ...InterviUSpacing.shadow.base,
  },

  // Button Styles
  primaryButton: {
    backgroundColor: InterviUColors.purpleBlue,
    borderRadius: InterviUSpacing.borderRadius.base,
    paddingVertical: InterviUSpacing.layout.buttonPadding,
    paddingHorizontal: InterviUSpacing.spacing[6],
    alignItems: "center",
    justifyContent: "center",
    ...InterviUSpacing.shadow.sm,
  },

  primaryButtonText: {
    ...InterviUTypography.styles.button,
    color: InterviUColors.white,
  },

  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: InterviUColors.purpleBlue,
    borderRadius: InterviUSpacing.borderRadius.base,
    paddingVertical: InterviUSpacing.layout.buttonPadding,
    paddingHorizontal: InterviUSpacing.spacing[6],
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    ...InterviUTypography.styles.button,
    color: InterviUColors.purpleBlue,
  },

  // Input Styles
  input: {
    borderWidth: 1,
    borderColor: InterviUColors.border.light,
    borderRadius: InterviUSpacing.borderRadius.base,
    paddingHorizontal: InterviUSpacing.spacing[4],
    paddingVertical: InterviUSpacing.spacing[3],
    ...InterviUTypography.styles.body,
    backgroundColor: InterviUColors.white,
    marginVertical: InterviUSpacing.layout.inputMargin,
  },

  inputFocused: {
    borderColor: InterviUColors.purpleBlue,
    borderWidth: 2,
  },

  inputError: {
    borderColor: InterviUColors.error,
    borderWidth: 2,
  },

  // Text Styles
  heading: {
    ...InterviUTypography.styles.h2,
    color: InterviUColors.text.primary,
    marginBottom: InterviUSpacing.spacing[4],
  },

  headingDark: {
    ...InterviUTypography.styles.h2,
    color: InterviUColors.text.light,
    marginBottom: InterviUSpacing.spacing[4],
  },

  subheading: {
    ...InterviUTypography.styles.h4,
    color: InterviUColors.text.secondary,
    marginBottom: InterviUSpacing.spacing[3],
  },

  bodyText: {
    ...InterviUTypography.styles.body,
    color: InterviUColors.text.primary,
    lineHeight:
      InterviUTypography.lineHeight.relaxed * InterviUTypography.fontSize.base,
  },

  bodyTextDark: {
    ...InterviUTypography.styles.body,
    color: InterviUColors.text.light,
    lineHeight:
      InterviUTypography.lineHeight.relaxed * InterviUTypography.fontSize.base,
  },

  caption: {
    ...InterviUTypography.styles.caption,
    color: InterviUColors.text.muted,
  },

  // Header Styles
  header: {
    backgroundColor: InterviUColors.white,
    borderBottomWidth: 1,
    borderBottomColor: InterviUColors.border.light,
    paddingHorizontal: InterviUSpacing.layout.screenPadding,
    paddingVertical: InterviUSpacing.spacing[4],
    ...InterviUSpacing.shadow.sm,
  },

  headerDark: {
    backgroundColor: InterviUColors.background.dark,
    borderBottomWidth: 1,
    borderBottomColor: InterviUColors.deepBlue,
    paddingHorizontal: InterviUSpacing.layout.screenPadding,
    paddingVertical: InterviUSpacing.spacing[4],
    ...InterviUSpacing.shadow.sm,
  },

  headerTitle: {
    ...InterviUTypography.styles.h3,
    color: InterviUColors.text.primary,
    textAlign: "center",
  },

  headerTitleDark: {
    ...InterviUTypography.styles.h3,
    color: InterviUColors.text.light,
    textAlign: "center",
  },

  // List Styles
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: InterviUSpacing.layout.listItemPadding,
    paddingHorizontal: InterviUSpacing.layout.screenPadding,
    borderBottomWidth: 1,
    borderBottomColor: InterviUColors.border.light,
  },

  listItemContent: {
    flex: 1,
    marginLeft: InterviUSpacing.spacing[3],
  },

  listItemTitle: {
    ...InterviUTypography.styles.h6,
    color: InterviUColors.text.primary,
    marginBottom: InterviUSpacing.spacing[1],
  },

  listItemSubtitle: {
    ...InterviUTypography.styles.bodySmall,
    color: InterviUColors.text.muted,
  },

  // Avatar Styles
  avatar: {
    width: InterviUSpacing.avatarSize.base,
    height: InterviUSpacing.avatarSize.base,
    borderRadius: InterviUSpacing.avatarSize.base / 2,
    backgroundColor: InterviUColors.gray[200],
  },

  avatarLarge: {
    width: InterviUSpacing.avatarSize.lg,
    height: InterviUSpacing.avatarSize.lg,
    borderRadius: InterviUSpacing.avatarSize.lg / 2,
    backgroundColor: InterviUColors.gray[200],
  },

  // Badge Styles
  badge: {
    backgroundColor: InterviUColors.purpleBlue,
    borderRadius: InterviUSpacing.borderRadius.full,
    paddingHorizontal: InterviUSpacing.spacing[2],
    paddingVertical: InterviUSpacing.spacing[1],
    alignSelf: "flex-start",
  },

  badgeText: {
    ...InterviUTypography.styles.caption,
    color: InterviUColors.white,
    fontWeight: InterviUTypography.fontWeight.semibold,
  },

  // Gradient Background
  gradientBackground: {
    flex: 1,
  },

  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: InterviUColors.background.primary,
  },

  loadingText: {
    ...InterviUTypography.styles.body,
    color: InterviUColors.text.muted,
    marginTop: InterviUSpacing.spacing[4],
  },

  // Error Styles
  errorContainer: {
    backgroundColor: InterviUColors.error,
    padding: InterviUSpacing.spacing[3],
    borderRadius: InterviUSpacing.borderRadius.base,
    marginVertical: InterviUSpacing.spacing[2],
  },

  errorText: {
    ...InterviUTypography.styles.bodySmall,
    color: InterviUColors.white,
    textAlign: "center",
  },

  // Success Styles
  successContainer: {
    backgroundColor: InterviUColors.success,
    padding: InterviUSpacing.spacing[3],
    borderRadius: InterviUSpacing.borderRadius.base,
    marginVertical: InterviUSpacing.spacing[2],
  },

  successText: {
    ...InterviUTypography.styles.bodySmall,
    color: InterviUColors.white,
    textAlign: "center",
  },
});

// Export individual style categories for convenience
export { InterviUColors, InterviUTypography, InterviUSpacing };

export default InterviUBrandStyles;
