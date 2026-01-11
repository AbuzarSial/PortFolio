# Premium 3D Portfolio Website

A production-ready, award-winning portfolio website featuring advanced 3D animations, glassmorphism effects, and smooth cinematic transitions. Built with modern web technologies for optimal performance.

## 🚀 Features

- **Full-Screen 3D Hero Section** - Interactive 3D scene with scroll-controlled camera and mouse parallax
- **Premium Glassmorphism UI** - Modern glassmorphism design with soft glows and depth
- **3D Animated Sections** - Floating geometries, rotating spheres, and interactive elements
- **Smooth Scroll Animations** - GSAP ScrollTrigger powered animations throughout
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Performance Optimized** - GPU-accelerated animations and optimized 3D rendering

## 🛠️ Tech Stack

- **React 19** - Latest React with modern hooks
- **Vite** - Fast build tool and dev server
- **Three.js / React Three Fiber** - 3D graphics and WebGL
- **GSAP + ScrollTrigger** - Professional scroll animations
- **Framer Motion** - Micro-interactions and UI animations
- **Tailwind CSS v4** - Utility-first styling
- **Lenis** - Smooth scrolling

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── SectionHeader.jsx
│   │   └── Textarea.jsx
│   ├── Hero.jsx         # Hero section with 3D scene
│   ├── Hero3D.jsx       # 3D hero scene component
│   ├── About.jsx         # About section
│   ├── Projects.jsx     # Projects carousel
│   ├── Skills.jsx       # Skills with 3D spheres
│   ├── Skills3D.jsx     # 3D skills scene
│   ├── Process.jsx      # Development process timeline
│   ├── Contact.jsx      # Contact form
│   └── Navigation.jsx   # Navigation bar
├── utils/
│   └── performance.js   # Performance optimization utilities
├── App.jsx              # Main app component
├── index.css            # Global styles and Tailwind
└── main.jsx             # Entry point
```

## 🎨 Sections

1. **Hero** - Full-screen 3D scene with floating geometries
2. **About** - Professional bio with 3D floating cards
3. **Projects** - Horizontal scroll carousel with 3D tilt effects
4. **Skills** - Interactive 3D rotating spheres
5. **Process** - Timeline animation showing development workflow
6. **Contact** - Minimal futuristic contact form

## 📱 Responsive Design

- **Mobile** (< 768px): Optimized particle counts, reduced geometry detail
- **Tablet** (768px - 1024px): Balanced performance and quality
- **Desktop** (> 1024px): Full 3D experience with maximum detail

## ⚡ Performance Optimizations

- Adaptive particle counts based on device
- Reduced geometry detail on mobile
- GPU-accelerated animations
- Code splitting ready
- Optimized 3D rendering

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Customization

### Update Content

Edit the data in each component:
- `Hero.jsx` - Update headline and sub-headline
- `About.jsx` - Update bio and stats
- `Projects.jsx` - Update project data
- `Skills.jsx` - Update technologies
- `Contact.jsx` - Update form handling

### Colors

Modify color variables in `src/index.css`:
```css
--color-primary: #00d4ff;
--color-secondary: #7b2cbf;
--color-accent: #ff006e;
```

## 🚢 Deployment

Build the project:
```bash
npm run build
```

The `dist` folder contains the production-ready files. Deploy to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 📄 License

Private project - All rights reserved

## 👨‍💻 Development

Built with attention to:
- Clean, maintainable code
- Performance optimization
- Accessibility
- Modern best practices
- Production-ready architecture
