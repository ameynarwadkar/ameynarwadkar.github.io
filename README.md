# Amey Narwadkar - Portfolio Website

A modern, responsive portfolio website showcasing AI and machine learning projects with beautiful particle.js animations.

## 🌟 Features

- **Interactive Particle Background**: Dynamic particle system using particles.js
- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Project Showcase**: Detailed presentation of AI/ML projects
- **Skills Section**: Visual representation of technical expertise
- **Contact Form**: Interactive contact form with validation
- **Smooth Animations**: Scroll-triggered animations and hover effects
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 🚀 Technologies Used

- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Modern styling with Flexbox, Grid, and animations
- **JavaScript**: Interactive features and animations
- **Particles.js**: Dynamic particle background effects
- **Font Awesome**: Professional icons
- **Google Fonts**: Poppins font family for modern typography

## 📁 Project Structure

```
Portfolio Website/
├── index.html              # Main homepage
├── about.html              # About page
├── contact.html            # Contact page
├── assets/
│   ├── css/
│   │   ├── main.css        # Main stylesheet
│   │   ├── portfolio.css   # All custom styles and animations
│   │   └── fontawesome-all.min.css
│   └── js/
│       ├── main.js         # Main JavaScript functionality
│       └── portfolio.js    # All custom interactive features (particles.js config, animations, etc.)
├── particles.js-master/    # Particles.js library
├── images/                 # Project images and assets
└── README.md              # Project documentation
```

## 🎨 Design Features

### Color Palette
- Primary: Linear gradient from #667eea to #764ba2
- Background: #f8f9fa
- Text: #333 (dark gray)
- Accent: #667eea (blue-purple)

### Typography
- Font Family: Poppins (Google Fonts)
- Weights: 300 (light), 400 (regular), 600 (semi-bold), 700 (bold)

### Animations
- Scroll-triggered animations using Intersection Observer API
- Hover effects on cards and buttons
- Smooth scrolling navigation
- Particle interaction effects
- Typing animation for hero text
- Ripple effects on button clicks

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px

## 🔧 Setup and Installation

1. **Clone or download** the repository
2. **Open** `index.html` in a web browser
3. **For development**: Use a local server (like Live Server in VS Code)

### Local Development
```bash
# If you have Python installed
python -m http.server 8000

# If you have Node.js installed
npx serve .

# Or use any other local server solution
```

## 🌐 Pages Overview

### Homepage (index.html)
- Hero section with particles background
- Featured projects grid
- Skills and expertise section
- Social media links
- Smooth navigation

### About Page (about.html)
- Personal introduction
- Statistics and achievements
- Education background
- Interests and passions
- Professional experience highlights

### Contact Page (contact.html)
- Contact form with validation
- Contact information
- Social media links
- Interactive design elements

## 💼 Projects Featured

1. **Tennis Analysis System**
   - Computer vision for sports analytics
   - Player movement tracking
   - Performance insights

2. **Text to Image Generation**
   - Stable Diffusion implementation
   - Deep learning model
   - High-quality image generation

3. **Food Ordering Chatbot**
   - Natural language processing
   - Conversational AI
   - Live demo available

4. **AI Trading Bot**
   - Sentiment analysis
   - Automated trading decisions
   - Market data processing

5. **ML Algorithms from Scratch**
   - Mathematical implementations
   - Educational purpose
   - Algorithm understanding

## 🛠️ Customization

### Changing Colors
Edit the CSS variables in `assets/css/portfolio.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --background-color: #f8f9fa;
  --text-color: #333;
}
```

### Modifying Particles
Edit the particles configuration in `index.html`:
```javascript
particlesJS('particles-js', {
  // Modify particle settings here
});
```

### Adding New Projects
Add project cards in the projects section of `index.html`:
```html
<div class="project-card slide-up">
  <!-- Project content -->
</div>
```

## 🔍 SEO Features

- Semantic HTML structure
- Meta descriptions and keywords
- Open Graph tags for social sharing
- Structured data markup
- Optimized images with alt text
- Fast loading times

## 📈 Performance Optimizations

- Minified CSS and JavaScript
- Optimized images
- Lazy loading for images
- Efficient animations using CSS transforms
- Minimal external dependencies

## 🌍 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👨‍💻 Author

**Amey Narwadkar**
- LinkedIn: [amey-narwadkar](https://www.linkedin.com/in/amey-narwadkar-474332231/)
- GitHub: [ameynarwadkar](https://github.com/ameynarwadkar)
- Kaggle: [ameynarwadkar](https://www.kaggle.com/ameynarwadkar)
- Email: amey.narwadkar1729@gmail.com

## 📝 Changelog

### Version 1.0.0 (2025)
- Initial release
- Responsive design implementation
- Particles.js integration
- Contact form functionality
- Project showcase
- Skills section
- About page
- Interactive animations

---

⭐ Star this repository if you found it helpful!
