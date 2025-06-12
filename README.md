
# 📰 React News App

A simple React-based news application that fetches and displays top headlines using the [NewsAPI](https://newsapi.org/).

## 🚀 Features

* News by categories (General, Business, Entertainment, Health, Science, Sports, Technology)
* Loading progress bar
* Pagination (Previous / Next)
* Responsive layout using Bootstrap

## ⚙️ Setup Instructions

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Add your NewsAPI key**
   In `News.js`, replace the placeholder with your own API key:

   ```js
   const url = `https://newsapi.org/v2/top-headlines?...&apiKey=YOUR_API_KEY`;
   ```

3. **Start the app**

   ```bash
   npm start
   ```

## 🛠 Tech Stack

* React
* React Router
* Bootstrap
* NewsAPI

