# Turborepo Monorepo

This is a Turborepo monorepo setup designed for building and publishing multiple vanilla JavaScript-based UI components, a Tailwind theme, a Storybook app for testing components, and a documentation site.

## Project Structure

```
turborepo-monorepo
├── apps
│   ├── storybook          # Storybook application for UI components
│   └── docs               # Documentation site
├── packages
│   ├── components         # UI components package
│   └── theme              # Tailwind theme package
├── package.json           # Root configuration for the monorepo
├── turbo.json             # Turborepo configuration
└── README.md              # Monorepo documentation
```

## Getting Started

To get started with this monorepo, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd turborepo-monorepo
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the Storybook app:**
   ```
   cd apps/storybook
   npm run storybook
   ```

4. **Build the documentation site:**
   ```
   cd apps/docs
   npm run build
   ```

5. **Publish components and theme:**
   ```
   cd packages/components
   npm publish

   cd ../theme
   npm publish
   ```

## Features

- **UI Components:** A collection of reusable UI components built with vanilla JavaScript.
- **Tailwind Theme:** A customizable Tailwind CSS theme for styling components.
- **Storybook:** An interactive environment for developing and testing UI components.
- **Documentation Site:** A dedicated site for documenting the components and theme usage.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.