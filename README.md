# 📝 Excel do Branco

An app to split gig money.
Made specifically to stop Branco from creating more annoying Excel files that make everything more complicated.

## 🔗 Check it out

The app is available through GitHub pages, on the following link:
https://kyntaz.github.io/excel-do-branco/

## 🔧 Set Up

To set up the project on your local machine clone the repository and install the dependencies.

```bash
git clone https://github.com/Kyntaz/excel-do-branco.git
cd excel-do-branco
npm install
```

## 📜 NPM Scripts

While in the root directory of the project the following NPM Scripts are available to aide in the development process.

```bash
npm run start # Starts a development server with real-time refresh
npm run build # Builds the project, updating the ./build folder
npm run deploy # Deploys the currently committed ./build folder to production
```

## 📦 Deploying a new version

To deploy a new version just build the project, commit the new build and run the deploy script.

```bash
npm run build
git add .
git commit -m "Build"
npm run deploy
```

## 💻 Requirements

This project requires Node and NPM to run.
If you have Volta installed it will automagically run the recommended versions of these tools.
