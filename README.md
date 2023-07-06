# EduScout ✨📚🎓

EduScout-chan is a super kawaii web application that scrapes educational course information from an amazing website. It uses AI-driven smart scraping techniques to extract relevant data from the course pages and provides an API endpoint to check for new courses periodically. 😄🌟

## Requirements 🛠️

- Node.js 🚀
- Express.js ⚡
- Axios 🌐
- Cheerio 🍀
- Cors 🌈

## Installation 💻

1. Clone the repository: 📥

```bash
git clone https://github.com/well300/EduScout/
```

2. Navigate to the project directory: 📂

```bash
cd EduScout
```

3. Install the dependencies: ⚙️

```bash
npm install
```

## Usage 🚀

1. Start the application: 🌟

```bash
node app.js
```

2. The application will start a sugoi server on `http://localhost:3000`. 🎉🎊

3. To check for new courses, make a GET request to `https://eduscout.vercel.app/api/courses`. ✨📝

Example Syntax for using the API Endpoint:

```javascript
const axios = require('axios');

axios.get('https://eduscout.vercel.app/api/courses')
  .then(response => {
    if (response.data.newCourses) {
      const courses = response.data.courses;
      console.log('New courses available:');
      courses.forEach(course => {
        console.log('Name:', course.name);
        console.log('Udemy Link:', course.udemyLink);
        console.log('Image URL:', course.image);
        console.log('----------------------');
      });
    } else {
      console.log('No new courses available.');
    }
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
```

This code makes a GET request to the API endpoint `https://eduscout.vercel.app/api/courses` and retrieves the response. If new courses are available (`response.data.newCourses` is `true`), it iterates over the courses array (`response.data.courses`) and logs the course name, Udemy link, and image URL. If no new courses are available, it logs a message indicating that.

## API Endpoint 🌐

### Check for New Courses 🆕

- Endpoint: `/api/courses`
- Method: GET

This sugoi endpoint checks for new courses on an amazing website. It returns a super kawaii JSON response indicating whether new courses are available and provides information about the new courses, including the course name, Udemy link, and course image URL. 🎉💖

Example response when new courses are available:

```json
{
  "newCourses": true,
  "courses": [
    {
      "name": "Course 1",
      "udemyLink": "https://www.udemy.com/course/course-1",
      "image": "https://www.example.com/image1.jpg"
    },
    {
      "name": "Course 2",
      "udemyLink": "https://www.udemy.com/course/course-2",
      "image": "https://www.example.com/image2.jpg"
    }
  ]
}
```

Example response when no new courses are available:

```json
{
  "newCourses": false
}
```

## Configuration ⚙️

The following variables can be configured in the

Apologies for the incomplete response. Here's the continuation of the Configuration section in the README:

- `DOMAIN`: The base URL of the website to scrape (default: `<website_url>`).
- `AD_DOMAINS`: An array of ad domains to ignore when fetching course links (default: `['https://amzn', 'https://bit.ly']`).
- `maxPages`: The maximum number of pages to scrape (default: `null`).

## Notes 📝

- The application uses AI-driven smart scraping techniques to extract data from course pages. Additional AI algorithms and logic can be added as needed in the `aiDrivenScraping` function. 🤖🧠
- The application fetches course links and checks for new courses periodically using the `checkForNewCourses` function. The interval for checking new courses is set to every 30 minutes by default (can be modified in `setInterval`). ⏰
- The application supports CORS (Cross-Origin Resource Sharing) to allow requests from different domains. CORS can be enabled or disabled by modifying the `app.use(cors())` line. 🌍🔒

## License 📄

This project is licensed under the super sugoi [MIT License](LICENSE). ❤️🌟
