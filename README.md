# Kanto Mindscape

Act as a Senior Frontend Engineer and UI/UX Designer. Build a highly interactive, ultra-minimalist web interface for the "Kanto Empire Brain OS". Use React, Tailwind CSS, and Framer Motion for fluid animations.

### VISUAL IDENTITY & THEME (CRITICAL):

- Background Colors: Use strictly Kanto Cream (#F5F5DC), Kanto White (#FFFFFF), and subtle light grey shades for depth. NEVER use black backgrounds.

- Text & Iconography: Strictly Kanto Black (#000000).

- UI Archetype: "Dynamic Flat UI". Use 8px border radius for any visible containers, solid flat fills (no glassmorphism, no drop shadows), and crisp 1px borders (#E5E5D8) where separation is needed.

- Typography: Use "Inter" or clean sans-serif for UI elements, and a Serif Italic (like Playfair Display) for the "Kanto" brand mark.

### LAYOUT & COMPONENTS:

1. The Main View (Zero Distractions):

- The screen must be entirely clean. NO chat history sidebar. NO text input fields. 

- In the absolute center of the screen, build a "Particle Sphere" (a 3D-like ball made of many small dots). Use CSS/Framer Motion to make these dots float and rotate continuously. This represents the AI's "Brain".

- Top Header: A very subtle, elegant serif text saying "Kanto Brain OS" in the top center.

2. Walkie-Talkie Push-to-Talk Button:

- Place a prominent, beautifully designed microphone button at the bottom center of the screen.

- Interaction: It must act like a walkie-talkie. When the user clicks and HOLDS the button down, the Particle Sphere should pulse rapidly and change its animation state (indicating "Listening"). When the user releases the button, it returns to a calm state (indicating "Processing" or "Speaking").

3. The Hidden Asset Canvas (Conditional UI):

- By default, there is no place for images or documents on the screen.

- Create a hidden overlay or a sleek side-panel that ONLY slides in or fades in when an asset is generated.

- Inside this hidden canvas, create a mockup view for two types of assets:

  A) An Image preview container (for when the AI generates a picture).

  B) A Document preview card (representing a generated PDF or Word file).

- Add a simple "Close" (X) button to this canvas so the user can dismiss it and return to the pure voice interface.

### FUNCTIONALITY MOCKUP:

Ensure the UI feels alive. Make the Walkie-Talkie button interactive (onMouseDown / onMouseUp events) to trigger the sphere's animations. Add a dummy button in the top right corner (very subtle) named "Test Asset Render" just to toggle the "Hidden Asset Canvas" so I can see how it looks.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/781a16f3-fd02-4c02-bc4e-068c7f81f6c2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
