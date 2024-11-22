# Infinite Image Scroll

An interactive web application that dynamically fetches and displays images using Unsplash's API. Infinite scrolling ensures that new images are loaded automatically as the user scrolls down. This application is built using React and Tailwind CSS for a seamless and responsive experience.

🌐 **[Live Demo](https://infinite-image-scroll.vercel.app/)**

---

## 📌 Features

1. **Infinite Scrolling:** Automatically loads more images when you reach the bottom of the page.
2. **Search Functionality:** Search for images based on keywords.
3. **Lazy Loading:** Images load only when they come into view, optimizing performance.
4. **Responsive Design:** Works beautifully across desktops, tablets, and mobile devices.
5. **Error Handling:** Displays appropriate messages in case of API errors or invalid inputs.

---

## 🚀 Technologies Used

### **Frontend**
- **React**: For building a responsive and dynamic user interface.
- **JavaScript**: Core logic and functionality.
- **Tailwind CSS**: Styling and responsive design.

### **API**
- **Unsplash API**: For fetching high-quality images.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v14 or higher)
- An Unsplash API Key (You can get one by creating a developer account on [Unsplash](https://unsplash.com/developers)).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/infinite-image-scroll.git
   cd infinite-image-scroll

   
2. **Install Dependencies**
   ```bash
   npm install
3. **Set Up Environment Variables** : Create a .env file in the root directory and add your Unsplash API key:
   ```env
   VITE_UNSPLASH_API_KEY=your_unsplash_api_key
   
4. **Run the Application**
   - For Development
     
        ```bash
        npm run dev
   
    - Open your browser and visit:
         ```bash
         http://localhost:5173
5. **Build for Prodction**
    ```bash
    npm run build
    npm run preview

## 📄 API Details
## Unsplash API
This application uses the Unsplash API to fetch images dynamically.

1. **Endpoint**: https://api.unsplash.com/photos/
2. **Search Endpoint**: https://api.unsplash.com/search/photos/
3. **Authentication**: Requires a valid API key.

## Example Request:
    ```bash
    GET https://api.unsplash.com/photos/?client_id=your_api_key&page=1
  
  - Parameters:
  1. **query**: Search keyword.
  2. **page**: Page number for pagination.

