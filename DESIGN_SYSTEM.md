# Axel Design System — Mandatory Specification

## 1. COLOR SYSTEM

### Primary Colors — Based on USER PERCEPTION
| Color | Hex | Usage | NEVER use for |
|-------|-----|-------|---------------|
| Axel Pink | #EF508D | ONLY "Axel is doing something": avatar, speaking, thinking, searching, recommendations label, automated status | Buttons, inputs, dropdowns, option pills, modals, selection lists |
| Interface Blue | #0090FF | ALL interactive UI user touches: buttons, option pills, CTAs, dropdowns, modals, pickers, toggles | Axel's identity or AI status |
| Price Green | #4FC660 | Prices, savings, "Save $X", confirmed status, "Nonstop", success | Non-price text, buttons, borders |
| Alert Orange | #FB7A29 | Price change alerts, time-limited warnings, "Non-refundable", stops count | General buttons, text, status |

### Surface Colors
| Background | #000000 | Card | #111111 | Border | #222222 | Elevated | #1A1A1A |

### Text Colors
| Primary #FFFFFF | Secondary #AAAAAA | Tertiary #666666 | Strikethrough #888888 |

## 2. TYPOGRAPHY
- Font: Lato (fallback: system-ui, sans-serif)
- Weight: 400 regular for everything, 600 semi-bold ONLY for titles/prices
- NEVER use 700/bold
- Screen title: 20px 600 #FFFFFF
- Card title: 16px 600 #FFFFFF
- Body: 14px 400 #FFFFFF
- Secondary: 13px 400 #AAAAAA
- Caption: 12px 400 #666666
- Price large: 20px 600 #4FC660
- Price inline: 14px 600 #4FC660

## 3. COMPONENT RULES
- Axel Panel: bg #111111, border-top 1px solid #222222, left border 3px #EF508D
- Avatar: 32px circle #EF508D bg, white "A"
- Option buttons: transparent bg, 1px solid #0090FF border, #0090FF text, 20px radius
- CTA buttons: #0090FF bg, white text, 12px radius, 14px 600
- Cards: #111111 bg, 1px solid #222222 border, 12px radius, 16px padding
- Animations: 300ms slide, 200ms fade+30px slide cards, 50ms stagger
