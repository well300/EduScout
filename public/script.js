function refreshCourses() {
  const coursesContainer = document.getElementById('courses-container');
  coursesContainer.innerHTML = ''; // Clear the courses container

  fetch('https://eduscout.vercel.app/api/courses')
    .then(response => response.json())
    .then(data => {
      if (data.newCourses) {
        data.courses.forEach((course, index) => {
          const courseCard = document.createElement('div');
          courseCard.classList.add('course-card');

          const courseImage = document.createElement('img');
          courseImage.classList.add('course-image');
          courseImage.src = course.image; // Replace with local image URL or correct image URL

          const courseName = document.createElement('div');
          courseName.classList.add('course-name');
          courseName.textContent = course.name;

          const courseLink = document.createElement('a');
          courseLink.classList.add('course-link');
          courseLink.href = course.udemyLink;
          courseLink.target = '_blank';
          courseLink.textContent = 'Go to Udemy';

          courseCard.appendChild(courseImage);
          courseCard.appendChild(courseName);
          courseCard.appendChild(courseLink);
          coursesContainer.appendChild(courseCard);

          // Add fade-in animation to each course card
          setTimeout(() => {
            courseCard.style.opacity = 1;
            courseCard.style.transform = 'translateY(0)';
            courseCard.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
          }, index * 200); // Delay each card's fade-in by 200ms
        });
      } else {
        console.log('No new courses available.');
      }
    })
    .catch(error => {
      console.error('An error occurred:', error);
    });
}

// Initial load of courses
refreshCourses();

// Add event listener to refresh button
const refreshButton = document.querySelector('.refresh-button');
refreshButton.addEventListener('click', refreshCourses);

// Prevent anchor links from triggering default behavior on mobile
const courseLinks = document.querySelectorAll('.course-link');
courseLinks.forEach(link => {
  link.addEventListener('click', e => {
    if (window.innerWidth <= 600) {
      e.preventDefault();
    }
  });
});
