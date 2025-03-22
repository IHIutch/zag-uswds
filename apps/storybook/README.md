# Storybook App

This directory contains the Storybook application for showcasing and testing UI components.

## Getting Started

To get started with the Storybook app, follow these steps:

1. **Install Dependencies**: Navigate to the Storybook app directory and install the necessary dependencies.

   ```bash
   cd apps/storybook
   npm install
   ```

2. **Run Storybook**: Start the Storybook development server to view your components in isolation.

   ```bash
   npm run storybook
   ```

3. **Create Stories**: Add your component stories in the `src/stories` directory. Each story file should follow the naming convention `<ComponentName>.stories.js`.

## Folder Structure

- **.storybook**: Contains configuration files for Storybook.
  - `main.js`: Main configuration file for Storybook.
  - `preview.js`: Global parameters and decorators for rendering stories.
  - `manager.js`: Customizations for the Storybook UI.

- **src/stories**: Directory for your component stories.

## Building Storybook

To build a static version of your Storybook for deployment, run:

```bash
npm run build
```

The built files will be located in the `storybook-static` directory.

## Contributing

If you would like to contribute to this project, please follow the standard contribution guidelines and ensure that your code adheres to the project's coding standards.

## License

This project is licensed under the MIT License. See the LICENSE file for details.