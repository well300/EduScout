# 👨‍🏫 AI-Driven Course Scraper

This is a Node.js application that performs AI-driven scraping of a website to fetch course information. The application periodically checks for new courses and extracts relevant data using AI algorithms. It also provides an API endpoint to fetch the latest courses.

## Prerequisites ✅

Before running the application, ensure that you have the following installed:

- Node.js (version >= 12.0.0)
- npm (Node Package Manager)

## Installation 🚀

1. Clone the repository or download the code files.
2. Navigate to the project directory using the command line.
3. Run the following command to install the required dependencies:

   ```bash
   npm install
   ```

## Usage 📝

To start the AI-driven course scraper, use the following command:

```bash
node index.js
```

This will start the Express server on `http://localhost:3000`.

## API Endpoint 🌐

### Check for New Courses

- **URL:** `/`
- **Method:** GET
- **Description:** Fetches the latest courses and their Udemy links (if available).
- **Response Format:**

  ```json
  {
    "newCourses": true|false,
    "courses": [
      {
        "name": "Course Name",
        "udemyLink": "https://www.udemy.com/course/course-slug"
      },
      // ...
    ]
  }
  ```

  - `newCourses`: A boolean value indicating whether new courses are available.
  - `courses`: An array of objects containing the name of the course and its Udemy link.

**Example:**

To interact with the API and fetch the latest courses, you can make a GET request to the following endpoint:

```
GET https://eduscout.vercel.app/
```

Here's an example in JavaScript using `fetch`:

```javascript
fetch('https://eduscout.vercel.app/')
  .then(response => response.json())
  .then(data => {
    if (data.newCourses) {
      console.log('New courses available:');
      data.courses.forEach(course => {
        console.log('Name:', course.name);
        console.log('Udemy Link:', course.udemyLink);
      });
    } else {
      console.log('No new courses available.');
    }
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
```

Feel free to adapt the code snippet to your preferred programming language or tool.

## Configuration ⚙️

The following variables can be configured in the code:

- `PORT`: The port on which the Express server listens (default: 3000).
- `DOMAIN`: The base URL of the website to scrape.
- `AD_DOMAINS`: An array of domain URLs considered as ads and excluded from scraping.
- `maxPages`: The maximum number of pages to scrape (set to `null` for unlimited scraping).

## AI-Driven Scraping 🤖

The application uses AI algorithms to extract relevant data from the course pages. The `aiDrivenScraping` function performs the AI-driven data extraction using specific selectors and logic. You can modify this function to customize the scraping logic based on your requirements.

## Notes 📝

- The application uses the `cheerio` library for parsing HTML and extracting data.
- The `axios` library is used for making HTTP requests.
- CORS is enabled to allow cross-origin requests.
- The application periodically checks for new courses every 30 minutes using the `checkForNewCourses` function.
- Error handling is implemented for handling errors during scraping

 and HTTP requests.

## License 📄

This project is licensed under the [MIT License](LICENSE).
```
