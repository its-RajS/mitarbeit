# Figma Design Tokens Usage Guide

All your custom Figma colors, fonts, and spacing have been added to `src/app/globals.css`. Here's how to use them:

## 🎨 Colors

### Using Colors as Tailwind Utilities

All colors are available as Tailwind classes. Use them with any color utility:

```tsx
// Background colors
<div className="bg-washed-purple-500">Content</div>
<div className="bg-primary-blue-500">Content</div>
<div className="bg-brand-primary-purple">Content</div>

// Text colors
<p className="text-washed-blue-600">Text</p>
<p className="text-primary-purple-500">Text</p>

// Border colors
<div className="border-2 border-neutrals-8">Content</div>

// Ring colors (for focus states)
<button className="ring-2 ring-primary-blue-500">Button</button>
```

### Available Color Palettes

#### Washed Purple
- `washed-purple-50` through `washed-purple-900`
- Example: `bg-washed-purple-500`, `text-washed-purple-700`

#### Washed Blue
- `washed-blue-50` through `washed-blue-900`
- Example: `bg-washed-blue-500`, `text-washed-blue-700`

#### Primary Blue
- `primary-blue-50` through `primary-blue-900`
- Example: `bg-primary-blue-500`, `text-primary-blue-700`

#### Primary Purple
- `primary-purple-50` through `primary-purple-900`
- Example: `bg-primary-purple-500`, `text-primary-purple-700`

#### Neutrals
- `neutrals-1` through `neutrals-13`
- Example: `bg-neutrals-1`, `text-neutrals-10`, `border-neutrals-5`

#### Brand Colors
- `brand-washed-purple`
- `brand-washed-blue`
- `brand-primary-blue`
- `brand-primary-purple`
- `brand-dark`

### Using Colors with CSS Variables

You can also use colors directly with CSS variables:

```tsx
<div style={{ backgroundColor: 'hsl(var(--washed-purple-500))' }}>
  Content
</div>

<div className="bg-[hsl(var(--primary-blue-500))]">
  Content
</div>
```

## 📝 Font Sizes

Use font sizes with Tailwind's `text-` utilities:

```tsx
<p className="text-base">Base size (1rem)</p>
<p className="text-lg">Large (1.125rem)</p>
<p className="text-xl">XL (1.5625rem)</p>
<p className="text-2xl">2XL (1.625rem)</p>
<p className="text-3xl">3XL (2.1875rem)</p>
<p className="text-4xl">4XL (2.8125rem)</p>
<p className="text-5xl">5XL (3.4375rem)</p>
<p className="text-6xl">6XL (4.0625rem)</p>
```

**Note:** The font sizes are mapped to Tailwind's default size scale. If you need custom sizes, use arbitrary values:
```tsx
<p style={{ fontSize: 'var(--font-size-xl)' }}>Custom size</p>
```

## 🔤 Font Family

DM Sans is automatically applied to the body. To use it explicitly:

```tsx
<p className="font-dm-sans">Text with DM Sans</p>

// Or with CSS variable
<p style={{ fontFamily: 'var(--font-family-dm-sans)' }}>Text</p>
```

## 📐 Border Radius

Use border radius with Tailwind's `rounded-` utilities:

```tsx
<div className="rounded-0">No radius</div>
<div className="rounded-4">Small radius (0.0625rem)</div>
<div className="rounded-8">Medium radius (0.125rem)</div>
<div className="rounded-12">Standard radius (0.25rem)</div>
<div className="rounded-16">Large radius (0.5rem)</div>
<div className="rounded-20">XL radius (1.75rem)</div>
<div className="rounded-24">2XL radius (3.125rem)</div>
```

**Note:** Tailwind's default `rounded-*` classes (like `rounded-md`, `rounded-lg`) still work. Your custom radius values are available as `rounded-{number}`.

## 💡 Complete Examples

### Button with Brand Colors
```tsx
<button className="bg-brand-primary-blue text-white px-4 py-2 rounded-12 hover:bg-primary-blue-600">
  Click Me
</button>
```

### Card with Neutral Background
```tsx
<div className="bg-neutrals-1 border border-neutrals-5 rounded-16 p-6">
  <h2 className="text-2xl text-neutrals-12">Card Title</h2>
  <p className="text-base text-neutrals-8">Card content</p>
</div>
```

### Gradient Background
```tsx
<div className="bg-linear-to-r from-washed-purple-400 to-washed-blue-400 p-8 rounded-20">
  Gradient Content
</div>
```

### Dark Mode Support
All colors automatically work with dark mode. The same class names work in both light and dark themes.

```tsx
<div className="bg-neutrals-1 dark:bg-neutrals-13 text-neutrals-12 dark:text-neutrals-1">
  Adapts to theme
</div>
```

## 🎯 Quick Reference

| Type | Usage | Example |
|------|-------|---------|
| Background | `bg-{color}` | `bg-primary-blue-500` |
| Text | `text-{color}` | `text-washed-purple-700` |
| Border | `border-{color}` | `border-neutrals-5` |
| Font Size | `text-{size}` | `text-xl` |
| Border Radius | `rounded-{number}` | `rounded-16` |
| Font Family | `font-dm-sans` | `font-dm-sans` |

## 📚 All Available Colors

### Washed Purple: `washed-purple-50` to `washed-purple-900`
### Washed Blue: `washed-blue-50` to `washed-blue-900`
### Primary Blue: `primary-blue-50` to `primary-blue-900`
### Primary Purple: `primary-purple-50` to `primary-purple-900`
### Neutrals: `neutrals-1` to `neutrals-13`
### Brand: `brand-washed-purple`, `brand-washed-blue`, `brand-primary-blue`, `brand-primary-purple`, `brand-dark`
