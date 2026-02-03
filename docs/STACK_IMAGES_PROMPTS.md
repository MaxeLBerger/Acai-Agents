# Stack Images - AI Generation Prompts

## Image Quality Issues & Solutions

The current images have an "AI slop" look because:

1. Too busy/cluttered compositions
2. Visible text artifacts and hex codes
3. Inconsistent lighting and style
4. Generic corporate illustration feel

## Recommended Approach

**Option A: Hire a designer** - Best for authentic, non-AI look **Option B: Use
simpler, abstract visuals** - Geometric shapes, minimal elements **Option C: Use
real photos** - Stock photos with consistent editing

---

## Refined Prompts (Minimal/Abstract Style)

### Context for ALL Images

```
Style: Minimal, abstract, premium dark-mode aesthetic
Background: Deep charcoal (#1F2121 to #262828)
Lighting: Soft ambient glow, no harsh shadows
Elements: Clean geometric shapes, floating UI elements, glass-morphism
Quality: 4K, ultra-clean, no artifacts, no text, no logos
Negative: text, letters, numbers, logos, branding, busy compositions,
         realistic humans, corporate clipart, stock photo feel
```

---

## Phase 1: Discovery Call

**Accent Color: Teal (#21808D)**

### Minimal Abstract Version

```
Ultra-minimal dark illustration of connection and conversation.
Two abstract circular avatars connected by a glowing teal line.
Floating speech bubble shapes (no text inside).
Dark charcoal background with soft teal ambient glow.
Glass-morphism panels with subtle blur.
Clean, geometric, premium SaaS aesthetic.
Teal (#21808D) as primary accent color.
Aspect ratio 3:2. 4K resolution.
--style raw --stylize 100
```

### Photo-Realistic Alternative

```
Top-down flatlay of a modern desk setup for a video call.
MacBook with blurred video call interface on screen.
Teal coffee mug, minimal notebook, wireless earbuds.
Dark wood or slate desk surface.
Soft natural window light from one side.
Shallow depth of field, cinematic color grading.
Muted tones with teal accents. Aspect ratio 3:2.
```

---

## Phase 2: Design & Prototype

**Accent Color: Purple (#8B5CF6)**

### Minimal Abstract Version

```
Ultra-minimal dark illustration of UI design process.
Floating wireframe rectangles and abstract component blocks.
Color palette circles: purple, teal, orange as accents.
Isometric device silhouettes (no screens visible).
Dark charcoal background with soft purple ambient glow.
Clean geometric shapes, no text or realistic UI elements.
Purple (#8B5CF6) as primary accent color.
Aspect ratio 3:2. 4K resolution.
--style raw --stylize 100
```

### Photo-Realistic Alternative

```
Overhead shot of design process materials on dark desk.
Color swatches, printed wireframes, stylus on tablet.
Purple highlighter and sticky notes as accent items.
Soft directional lighting, shallow depth of field.
Dark moody aesthetic with purple color accents.
Minimal clutter, intentional negative space.
Aspect ratio 3:2.
```

---

## Phase 3: Development

**Accent Color: Green (#22C55E)**

### Minimal Abstract Version

```
Ultra-minimal dark illustration of code and development.
Abstract floating code editor shapes (no readable text).
Glowing green checkmarks and node connection lines.
Terminal window silhouettes with green cursor glow.
Dark charcoal background (#262828) with green ambient lighting.
Matrix-inspired subtle particle effects.
Green (#22C55E) as primary accent color.
Aspect ratio 3:2. 4K resolution.
--style raw --stylize 100
```

### Photo-Realistic Alternative

```
Close-up of mechanical keyboard with green LED backlight.
Monitor edge visible showing blurred dark code editor.
Coffee cup with steam, dark desk environment.
Moody ambient lighting with green accent glow.
Cinematic shallow depth of field.
Professional developer workspace aesthetic.
Aspect ratio 3:2.
```

---

## Phase 4: Launch & Handoff

**Accent Color: Amber/Gold (#FBB724)**

### Minimal Abstract Version

```
Ultra-minimal dark illustration of successful launch.
Abstract rocket silhouette or upward arrow in teal.
Floating confetti shapes in gold and amber tones.
Glowing checkmark badge in golden light.
Abstract analytics graph trending upward (no numbers).
Dark charcoal background with warm amber ambient glow.
Amber/Gold (#FBB724) as primary accent color.
Aspect ratio 3:2. 4K resolution.
--style raw --stylize 100
```

### Photo-Realistic Alternative

```
Celebration moment captured - champagne glass clinking edge.
Laptop in background showing abstract dashboard (blurred).
Golden confetti on dark surface, sparkler light trails.
Warm celebratory lighting with amber/gold tones.
Shallow depth of field, cinematic quality.
Premium dark aesthetic with celebration vibes.
Aspect ratio 3:2.
```

---

## Alternative: Pure Geometric Abstract

If AI-generated images continue to look "sloppy", consider pure geometric
abstractions:

### Discovery (Teal)

```
Abstract geometric composition on dark background.
Two interconnected circles with teal gradient fill.
Connecting lines and nodes in teal (#21808D).
Minimal, clean, vector-style aesthetic.
No realistic elements. Pure shapes and gradients.
Aspect ratio 3:2.
```

### Design (Purple)

```
Abstract geometric composition on dark background.
Overlapping rectangles and squares with purple gradients.
Grid lines and measurement marks in subtle gray.
Purple (#8B5CF6) as primary color.
Minimal, clean, vector-style aesthetic.
Aspect ratio 3:2.
```

### Development (Green)

```
Abstract geometric composition on dark background.
Flowing lines and nodes connected in network pattern.
Green (#22C55E) glowing accents and terminal-style brackets.
Binary-inspired subtle pattern elements.
Minimal, clean, vector-style aesthetic.
Aspect ratio 3:2.
```

### Launch (Amber)

```
Abstract geometric composition on dark background.
Upward diagonal lines and arrow shapes.
Starburst pattern with amber/gold (#FBB724) gradient.
Celebration-inspired sparkle elements.
Minimal, clean, vector-style aesthetic.
Aspect ratio 3:2.
```

---

## File Naming Convention

```
assets/stack/
├── discovery_call.png      (Teal theme)
├── design.png              (Purple theme)
├── development.png         (Green theme)
└── launch.png              (Amber theme)
```

## Image Specifications

| Property      | Value                                       |
| ------------- | ------------------------------------------- |
| Dimensions    | 960×640px (3:2 ratio)                       |
| Format        | PNG (for quality) or WebP (for performance) |
| File Size     | < 150KB each                                |
| Color Profile | sRGB                                        |
| Background    | Dark charcoal matching site theme           |

---

## Best Tools for Non-AI-Look Results

1. **Midjourney v6** with `--style raw --stylize 50-100`
2. **DALL-E 3** with explicit "minimal, abstract" instructions
3. **Figma + Plugins** - Design custom abstract graphics
4. **Blender** - Create clean 3D geometric renders
5. **Unsplash/Pexels** - Curated dark-theme stock photos + color grading
