---
name: Heritage Stitch
colors:
  surface: '#fdf8f8'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f2'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e6'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#444748'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1d1b1a'
  on-tertiary-container: '#868381'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e6e1df'
  tertiary-fixed-dim: '#cac6c3'
  on-tertiary-fixed: '#1d1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#fdf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  embroidery-xl:
    fontFamily: Bebas Neue
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: 0.05em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Bebas Neue
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system embodies the intersection of academic achievement and West African cultural pride. The aesthetic is **Premium Corporate Modern** with a **Tactile** twist, focusing on the high-fidelity representation of embroidery and woven textiles. 

The target audience consists of graduates seeking to honor their lineage through a custom, high-quality garment. The UI must feel as prestigious as a graduation ceremony: clean, organized, and celebratory. We utilize heavy whitespace to allow the rich colors of the sashes to remain the focal point, while incorporating subtle metallic textures and Adinkra-inspired patterns to anchor the digital experience in physical craft.

## Colors

The palette is rooted in the "Deep Black" of premium satin sashes, used for primary text and high-contrast UI shells. **Metallic Gold** serves as our signature action color, mimicking the luster of silk embroidery thread. 

The Pan-African trio (Red, Yellow, Green) is used intentionally for decorative accents, progress indicators, and status signaling. Backgrounds remain in a "Paper White" or very light neutral to provide a museum-like backdrop for the vibrant product visualizations. Use gradients sparingly on buttons to simulate a subtle metallic sheen.

## Typography

This system uses a dual-personality typographic approach. **Montserrat** provides a bold, confident structure for marketing headlines. **Inter** handles the functional, data-heavy aspects of the customization studio with professional neutrality.

For sash-specific content (previews, labels, and embroidered names), we use **Bebas Neue**. Its condensed, vertical nature perfectly replicates the traditional block-embroidery style found on graduation stoles. All "Embroidery" class text should be rendered in Metallic Gold or high-contrast White when appearing on the sash preview.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop to maintain the premium, editorial feel of a boutique studio. We utilize a 12-column grid with generous margins (64px) to ensure the customization panels do not feel cramped.

In the studio view, use a split-screen layout: the left side remains a sticky "Product Preview" (the sash), while the right side is a scrollable "Configurator" panel. On mobile, this reflows into a vertical stack where the sash preview occupies the top 40% of the viewport.

## Elevation & Depth

We avoid heavy, artificial dropshadows in favor of **Tonal Layers** and **Ambient Depth**. 

- **Level 1 (Base):** Neutral background.
- **Level 2 (Cards):** White surfaces with a 1px soft grey border (`#EEEEEE`) and an ultra-diffused shadow (0px 4px 20px, 4% opacity).
- **Level 3 (Modals/Active Tools):** Slightly more pronounced depth to indicate interactivity.
- **The Sash Preview:** Should utilize a custom "Fabric Shadow" – a subtle inner glow and soft drop shadow that makes the textile appear to float slightly above the table.

## Shapes

The design system uses a **Rounded** (Level 2) shape language. Standard buttons and input fields use a 0.5rem (8px) radius, striking a balance between the precision of the embroidery process and the approachability of a celebratory service. 

Interactive chips and Adinkra symbol cards use `rounded-lg` (16px) to feel more like physical artifacts or collector cards. Avoid sharp 0px corners, as they feel too clinical for a heritage-focused brand.

## Components

### Interactive Designer Panels
Step-based navigation for the customization flow. Use Gold for the active step indicator. Content should be grouped into logical "zones" (Left Side, Right Side, Center/Back).

### Visual Library Cards (Adinkra Symbols)
Small, square cards featuring a high-contrast black symbol on a white background. Upon selection, the card should gain a Gold border and a subtle "stitched" texture overlay.

### Design Capacity Indicators
A progress bar representing the available embroidery space. Use a clean track with a Gold fill. If the user exceeds character limits, the bar transitions to Tertiary Red.

### Celebration Elements
Order confirmations should use "Confetti" patterns derived from simplified Adinkra shapes. Buttons in this state should be "Primary Gold" with a high-gloss finish.

### Input Fields
Minimalist underlines or very soft-bordered boxes. Labels should use `label-caps` for a professional, technical appearance.