const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

const DOMAIN = 'https://www.tutorialbar.com';
const AD_DOMAINS = ['https://amzn', 'https://bit.ly'];

let previousLinks = new Set();
let currentPage = 0;
let lastPage = null;
const maxPages = null; // Set the maximum number of pages to scrape if needed

// AI-Driven Smart Scraping function
async function aiDrivenScraping(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Perform AI-driven data extraction using specific selectors and logic
    const scrapedData = {};

    // Extract relevant data using AI algorithms
    scrapedData.title = $('h1').text();
    scrapedData.description = $('p').text();
    scrapedData.price = 'Free';

    // Extract the image URL
    scrapedData.image = $('img.attachment-full.size-full.wp-post-image').attr('src');

    // Additional AI-driven data extraction logic...

    return scrapedData;
  } catch (error) {
    console.error('An error occurred while AI-driven scraping:', error);
    return null;
  }
}

async function fetchCourseLinks(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const courseLinks = [];
    $('h3').each((index, element) => {
      const link = $(element).find('a').attr('href');
      const name = $(element).find('a').text();
      courseLinks.push({ name, link });
    });

    lastPage = $('.next_paginate_link')
      .prev()
      .text();

    return courseLinks;
  } catch (error) {
    console.error('An error occurred while fetching course links:', error);
    return [];
  }
}

async function getUdemyCourseLink(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const udemyLink = $('.rh_button_wrapper a').attr('href');

    return udemyLink;
  } catch (error) {
    console.error('An error occurred while getting the Udemy course link:', error);
    return null;
  }
}

async function checkForNewCourses() {
  try {
    currentPage++;
    const url = `${DOMAIN}/all-courses/page/${currentPage}/`;
    const courseLinks = await fetchCourseLinks(url);
    const currentLinks = new Set(courseLinks.map(course => course.link));
    const newLinks = courseLinks.filter(course => !previousLinks.has(course.link));

    if (newLinks.length > 0) {
      console.log('New courses added:');
      const lastCourse = [...previousLinks].pop();
      newLinks.forEach(course => console.log(course.name));
      console.log(lastCourse.name);
      previousLinks = currentLinks;

      // AI-Driven Smart Scraping for new courses
      for (const course of newLinks) {
        const scrapedData = await aiDrivenScraping(course.link);
        if (scrapedData) {
          console.log('Results:');
          console.log('Title:', scrapedData.title);
          console.log('Description:', scrapedData.description);
          console.log('Price:', scrapedData.price);
          console.log('Image URL:', scrapedData.image);
          // Additional AI-Driven Smart Scraping logic...
        }
      }
    } else {
      const allLinks = [...previousLinks].map(link => ({ name: link.name, link: link }));

      const lastTwoCourses = allLinks.slice(-2);
      console.log('Last two courses:');
      lastTwoCourses.forEach(course => console.log(course.name));
    }
  } catch (error) {
    console.error('An error occurred while fetching course links:', error);
  }
}

// Endpoint to check for new courses
app.get('/api/courses', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page number from the request query parameters

    const url = `${DOMAIN}/all-courses/page/${page}/`;
    const courseLinks = await fetchCourseLinks(url);
    const currentLinks = new Set(courseLinks.map(course => course.link));
    const newLinks = courseLinks.filter(course => !previousLinks.has(course.link));

    if (newLinks.length > 0) {
      previousLinks = currentLinks;
      const coursesWithUdemyLinks = [];
      for (const course of newLinks) {
        const udemyLink = await getUdemyCourseLink(course.link);
        const scrapedData = await aiDrivenScraping(course.link);
        if (scrapedData) {
          coursesWithUdemyLinks.push({ name: course.name, udemyLink, image: scrapedData.image });
        }
      }
      res.json({ newCourses: true, courses: coursesWithUdemyLinks });
    } else {
      res.json({ newCourses: false });
    }
  } catch (error) {
    console.error('An error occurred while fetching course links:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to search for courses
app.get('/api/courses/search', async (req, res) => {
  try {
    const query = req.query.q; // Get the search query from the request query parameters

    // Construct the search URL
    const searchUrl = `${DOMAIN}/all-courses/page/1/?s=${encodeURIComponent(query)}`;

    // Fetch the course links from the search results page
    const courseLinks = await fetchCourseLinks(searchUrl);

    // Perform AI-driven scraping for the search results
    const courses = [];
    for (const course of courseLinks) {
      const scrapedData = await aiDrivenScraping(course.link);
      if (scrapedData) {
        const udemyLink = await getUdemyCourseLink(course.link);
        courses.push({ name: course.name, udemyLink, image: scrapedData.image });
      }
    }

    res.json({ courses });
  } catch (error) {
    console.error('An error occurred while searching for courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the periodic check for new courses every 30 minutes
setInterval(checkForNewCourses, 1800000); // Check every 30 minutes

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
