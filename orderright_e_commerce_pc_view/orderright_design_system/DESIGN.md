---
name: OrderRight Design System
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#ab3600'
  on-secondary: '#ffffff'
  secondary-container: '#fe5e1e'
  on-secondary-container: '#551600'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001356'
  on-tertiary-container: '#5979ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffdbcf'
  secondary-fixed-dim: '#ffb59c'
  on-secondary-fixed: '#390c00'
  on-secondary-fixed-variant: '#832700'
  tertiary-fixed: '#dde1ff'
  tertiary-fixed-dim: '#b8c3ff'
  on-tertiary-fixed: '#001356'
  on-tertiary-fixed-variant: '#0035be'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
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
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is engineered for a premium Ghanaian fashion house that balances high-fashion sophistication with youthful energy. The brand personality is creative, trustworthy, and distinctly modern.

The visual direction follows a **Corporate / Modern** aesthetic with **Minimalist** influences. It prioritizes expansive whitespace and high-quality photography to allow product imagery to act as the primary visual driver. The interface utilizes high-contrast typography and subtle depth to create a sense of luxury, while vibrant accents inject a sense of dynamism suitable for a creative, youth-oriented audience.

## Colors

The palette is anchored by a high-fashion **Deep Charcoal (#121212)** primary color, used for core branding, text, and primary actions to establish an authoritative, premium feel. 

The secondary accent is **Sunset Orange (#FF5F1F)**, representing the energy and creativity of the Ghanaian youth market. A tertiary **Electric Blue (#2E5BFF)** is reserved for functional secondary actions or highlights. The background remains clean using **Off-White (#F8F8F8)** and pure white to maintain a minimalist, breathable layout. Use light grays for subtle borders and structural separation.

## Typography

This design system uses a dual-font strategy. **Montserrat** provides a bold, geometric, and fashionable presence for headlines and display text, evoking a premium editorial feel. **Inter** is utilized for body copy and UI labels due to its exceptional readability and systematic, modern tone.

For marketing surfaces, use `display-lg` with tight letter spacing. For e-commerce listing details, `label-md` should be used in uppercase to create a distinct visual hierarchy between product titles and metadata.

## Layout & Spacing

The layout utilizes a **Fixed Grid** model for desktop, centered within a 1280px container, and a **Fluid Grid** for mobile devices. 

- **Desktop:** 12-column grid with 24px gutters and 40px side margins.
- **Tablet:** 8-column grid with 20px gutters and 24px side margins.
- **Mobile:** 4-column grid with 16px gutters and 16px side margins.

Spacing follows a 4px base unit, favoring larger increments (`xl` and `2xl`) for vertical section separation to enhance the "premium" feel and prevent content crowding. Product cards in listings should ideally span 3 columns on desktop and 2 columns on mobile.

## Elevation & Depth

This design system employs **Ambient Shadows** and **Tonal Layers** to create a refined sense of depth without cluttering the UI. 

1.  **Low Elevation (Surface):** Default state for cards and inputs. Uses a soft 1px border (#EEEEEE) with no shadow.
2.  **Medium Elevation (Raised):** Used for hovered product cards and active dropdowns. A diffused shadow: `0px 4px 20px rgba(0, 0, 0, 0.05)`.
3.  **High Elevation (Overlay):** Used for modals and floating "Add to Cart" bars. A deep, soft shadow: `0px 12px 40px rgba(0, 0, 0, 0.1)`.

Backdrop blurs (12px) are applied to sticky navigation headers to maintain context while scrolling over vibrant imagery.

## Shapes

The shape language is consistently **Rounded** to balance the sharp, high-fashion typography with a friendly, modern accessibility. 

- **Buttons & Inputs:** Use a standard 8px (`0.5rem`) radius.
- **Product Cards:** Use a 16px (`1rem`) radius for a softer, premium container look.
- **Small Components (Chips/Badges):** Use a pill-shape (full radius) to distinguish them from interactive buttons.
- **Icons:** Use a 2px stroke weight with rounded caps and joins to match the UI's curvature.

## Components

### Buttons
- **Primary:** Deep Charcoal background, white text, 8px radius. High-contrast hover state (slight opacity shift or secondary color underline).
- **Secondary:** Transparent background, Deep Charcoal 1.5px border.
- **Accent:** Sunset Orange background, white text. Reserved for "Buy Now" or "Limited Offer" to drive conversion.

### Input Fields
- Understated design: 1px light gray border, 8px radius.
- On focus: Border thickens to 1.5px and changes to Deep Charcoal.
- Error states: Use a muted red text with a 1px red border.

### Product Cards
- Image-first approach. The image container has a 16px radius.
- Text labels (Title, Price) are left-aligned below the image.
- A "Quick Add" floating button (pill-shaped) appears on hover.

### Accordions
- Used for product details (Shipping, Size Guide, Materials).
- Minimalist style: thin horizontal dividers with a plus/minus toggle.
- Transition should be a smooth vertical slide.

### Chips
- Used for categories and sizes. 
- Default: Light gray background, charcoal text. 
- Selected: Charcoal background, white text.

### Navigation
- Sticky top-bar with a backdrop blur. 
- Minimalist icons for search, profile, and cart. 
- Cart icon includes a Sunset Orange notification dot for active items.