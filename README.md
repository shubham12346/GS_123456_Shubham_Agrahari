## **Overview**

This project is a **React** application built with **TypeScript** and **Vite**. It is deployed on **Netlify**, ensuring that every commit to the `master` branch automatically triggers a deployment of the latest code.

Additionally, an **Excel file** is stored in the `public` folder, and all data is fetched from this public asset.

### **Implemented Pages**

The application includes the following pages:

- **DataStore**
- **Skus**
- **Planning**

## **Live Demo**

- **Application:** [https://asses.netlify.app/](https://asses.netlify.app/)
- **Video Explanation:** [https://asses.netlify.app/](https://asses.netlify.app/)

## **Tech Stack & Libraries**

- **Frontend**: React, TypeScript, Vite
- **State Management**: Redux Toolkit
- **UI Styling**: Tailwind CSS
- **UI Components**: Material UI (MUI)
- **Icons**: MUI Icons
- **Routing**: React Router DOM
- **Tables**: AG Grid
- **Deployment**: Netlify
- **Version Control**: Git (GitHub)
- **Data Source**: Excel file stored in the `public` folder

## **Features**

- **Fast builds and optimized development** with Vite
- **Global state management** using Redux Toolkit
- **Feature-rich tables** with AG Grid
- **Modern UI components** with MUI
- **Utility-first styling** with Tailwind CSS
- **Icon integration** with MUI Icons
- **Seamless navigation** using React Router DOM
- **Excel file data handling** from the `public` folder
- **Continuous Deployment (CD) via Netlify**

## **Run Locally**

### **Prerequisites**

Ensure you have the following installed:

- **Node.js** (Recommended: v16 or later)
- **Git**
- **Netlify CLI** (if deploying locally)

### **Installation**

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The application will be available at `http://localhost:5173/` (or another available port).

## **Fetching Data from Public Assets (Excel File)**

- The **Excel file** is stored in the `public` folder (e.g., `public/data.xlsx`).
- It is accessed using the browser’s `fetch` API or a library like `xlsx`.
- The Excel file is **not bundled** in the build but remains accessible as a public asset.

## **Deployment Process**

- The project is connected to **Netlify** for automatic deployments.
- **Every push to the `master` branch** triggers a deployment.
- Netlify automatically builds the project and deploys the latest version.

### **Manual Deployment (Optional)**

If needed, you can manually deploy using Netlify CLI:

```sh
netlify deploy --prod
```

---
