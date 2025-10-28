# Arpon Saha — Professional Interactive Portfolio (v2)

This package contains a modern, animated, and interactive portfolio website tailored for **Arpon Saha**.  
It is ready to publish on **GitHub Pages**.

## What's included
- `index.html` — single-page portfolio with hero, about, projects, gallery, contact
- `styles.css` — polished styles and animations
- `script.js` — interactions: mobile menu, reveal on scroll, gallery filters, lightbox, profile preview
- `assets/` — placeholder profile image and sample gallery image paths (replace with your images)
- `assets/gallery/` — folder to place gallery images
- `Arpon_Saha_Resume.pdf` — **(not included)**: add your resume file here

## How to use
1. Extract the folder.
2. Replace images in `assets/` and `assets/gallery/` with your real photos. Maintain filenames or update `index.html`.
   - Profile image: `assets/placeholder-profile.jpg` or change `id="profilePhoto"` src to your file.
   - Gallery: `assets/gallery/*.jpg` — replace with your photos. You can create new subcategories by editing `data-category` attributes.
3. Optional: Update project images `assets/sample-project-1.jpg` etc.

## Deploy to GitHub Pages
1. Create repo named `<your-username>.github.io`
2. Push the folder contents to the repo (see previous README for exact git commands).
3. Visit `https://<your-username>.github.io` after a minute.

## Gallery: How to add more photos and categories
- Each gallery item is a div like:
```html
<div class="gallery-item" data-category="internship">
  <img src="assets/gallery/intern-1.jpg" alt="...">
  <div class="caption">Caption text</div>
</div>
```
- `data-category` must match one of the filter button values (internship, events, art, samples). Add a new filter button and use that value if you want a new category.

## Making the contact form functional
Options:
- Netlify Forms: Deploy to Netlify and add `data-netlify="true"` to the `<form>` element.
- Formspree / Getform: Set `action="https://formspree.io/f/your-id"` and `method="POST"`.
- Serverless function: connect to an API endpoint.

## Notes
- All interactivity is client-side; uploading images via the "Upload Photo" button in the profile section only updates the preview locally (not saved to server). To permanently change the profile photo, upload the file to the repo and commit.

---

If you want, I can:
- Replace placeholder images with images you upload here.
- Create a GitHub Actions workflow that automatically commits & deploys when you push images to a specific branch.
- Convert this into a React + Tailwind site or add multi-language support (Bangla + English).
