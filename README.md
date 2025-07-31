```markdown
# EcoOilApp

## Introduction
**EcoOilApp** is a mobile application built with **React Native** and **Expo** that empowers users to engage in eco-friendly waste oil recycling. The app simplifies the process of scheduling waste oil pickups, submitting recycling forms, and redeeming rewards through a points system. By combining sleek visual elements with an intuitive multi-step registration and login flow, EcoOilApp aims to promote sustainability while offering practical benefits to its community. The repository contains well-organized components, screens, and assets that together create a professional and user-friendly recycling platform fileciteturn0file1, fileciteturn0file3.

## Usage
After installing the application, users can:
- Register and log in using a simple guided multi-step form.
- Submit recycling requests through dedicated forms for waste oil delivery.
- Review and manage appointments for waste oil pickups.
- Browse a rewards screen to exchange accumulated points for attractive gifts.
- Enjoy a dynamic home screen with carousel banners and interactive icons.

Developers can also use the built-in navigation to traverse between login, registration, form submission, and reward screens. The app leverages components like custom icons, collapsible sections, and animated headers for a polished user experience fileciteturn0file7.

## Features
- **User Authentication:** Secure login and registration flows with input masking and multi-step indicators.
- **Waste Oil Form Submission:** A detailed form for entering personal information, oil quantity, and contact details to schedule a waste oil pickup fileciteturn0file3.
- **Rewards System:** Earn points by recycling and redeem those for exciting prizes such as bicycles, t-shirts, and more fileciteturn0file2.
- **Dynamic Home Screen:** A carousel that displays promotional messages, encourages recycling actions, and highlights rewards.
- **Responsive Design:** Custom components and styles ensure consistency across different device sizes using Expo and React Native’s built-in utilities.
- **Real-time Updates:** Integration with a backend API for handling login, transactions, and appointment management as seen in the LoginScreen and FormScreen implementations fileciteturn0file10.

## Configuration
The application uses configuration settings from Expo’s constants and environment settings. For example:
- **API URL:** The backend endpoint is configured in the Login screen using Expo Constants. Developers can override the default API URL by modifying the configuration in the environment settings.
- **Themes and Styles:** Style guides are embedded directly within component files, with colors and fonts defined consistently across the application for a cohesive look.

Configure the API endpoint for development or production via environment variables before deploying the app.

## Requirements
- **Node.js** (version 12 or above)
- **Expo CLI**: Used for building and running the application on both iOS and Android.
- **Yarn or npm**: Dependency management.
- **React Native**: The framework used to build the mobile application.
- Additional native modules as specified in the package configuration from Expo (e.g., vector icons, async storage, and date picker libraries).

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/aselturatbek/EcoOilApp.git
   cd EcoOilApp
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the Expo development server:**
   ```bash
   expo start
   ```
4. Use the Expo app on your mobile device or an emulator to run the application.

## Contributing
Contributions are welcome, and we encourage you to help improve EcoOilApp. To contribute:
- Fork the repository and create your branch:  
  ```bash
  git checkout -b feature/my-new-feature
  ```
- Make your changes and commit them with clear messages.
- Push your branch and open a pull request.
- Ensure your code follows the established coding conventions and includes comments where necessary.
- For any major changes, please open an issue first to discuss what you would like to change.

Please follow a clear commit message guideline and ensure that new features include tests and documentation where applicable.

## License
This project is licensed under the **MIT License**. The rights to use, modify, and distribute this software are granted under the terms of the MIT License, as detailed in the LICENSE file.

--------------------------------------------------

EcoOilApp is designed with professionalism in mind, providing a comprehensive solution for eco-friendly waste oil management while maintaining clean, modular, and maintainable code throughout the repository fileciteturn0file0.
```
