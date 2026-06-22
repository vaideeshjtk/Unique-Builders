# Unique Builders Website

## Project Overview

This is a static landing page for a construction and real estate brand called **Unique Builders**. It is a modern marketing website built with:
- `index.html` for content and layout
- `css/styles.css` for styling and responsive design
- `js/main.js` for interactive behaviors and animations
- `assets/images/` for visuals used across the page

The site showcases sections such as hero, about, services, featured projects, testimonials, and contact.

## What This Project Is

The project is a **static brochure website** designed to promote a construction company. It is not a web application with a backend; instead, it is a frontend portfolio-style page that presents the company's:
- branding and hero messaging
- services and project examples
- client testimonials
- contact form and newsletter interaction

Interactive elements are powered by vanilla JavaScript, including:
- responsive navigation and mobile menu toggling
- scroll-triggered reveal animations
- animated counters for stats
- project category filtering
- testimonial carousel with autoplay and swipe support
- simple contact/newsletter form behavior

## Project Structure

- `index.html` — main page markup
- `css/styles.css` — all styling, layout, typography, and responsive rules
- `js/main.js` — JavaScript functionality for navigation, animations, filters, form handling, and carousel
- `assets/images/` — images used by the website

## How to Run Locally

### Option 1: Open directly

1. Open `index.html` in your browser.

### Option 2: Use a local server

From the project folder (`UQ Builders\UQ Builders`):

```bash
python3 -m http.server 8000
```

Then open:

```
http://localhost:8000
```

> If `python3` is not available, use whatever Python launcher is installed on your system.

## Notes for Editing

- `index.html` contains the page structure and content for each section.
- `css/styles.css` controls the styling, colors, layout, and responsive behavior.
- `js/main.js` handles interactive features like the mobile menu, animations, filters, and forms.

If you want to update a section or add a new project, edit the HTML in the corresponding section and adjust the CSS as needed.
