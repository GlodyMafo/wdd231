const courseDetails = document.getElementById('course-details');

const courses = {
  cse110: {
    subject: "Computer Science",
    number: "110",
    title: "Introduction to Programming",
    credits: "3",
    certificate: "Yes",
    description: "Learn the fundamentals of programming with an introduction to C++.",
    technology: ["C++", "Algorithms"]
  },
  wdd130: {
    subject: "Web Development",
    number: "130",
    title: "HTML & CSS",
    credits: "3",
    certificate: "Yes",
    description: "Learn to build static websites with HTML and CSS.",
    technology: ["HTML", "CSS"]
  },
  cse111: {
    subject: "Computer Science",
    number: "111",
    title: "Data Structures",
    credits: "4",
    certificate: "Yes",
    description: "Learn essential data structures like arrays, linked lists, and trees.",
    technology: ["C++", "Algorithms"]
  },

  cse210: {
    subject: "Computer Science",
    number: "210",
    title: "Data Structures",
    credits: "5",
    certificate: "Yes",
    description: "Learn essential data structures like arrays, linked lists, and trees.",
    technology: ["C++", "Algorithms"]
  },

  wdd131: {
    subject: "Computer Science",
    number: "131",
    title: "Data Structures",
    credits: "6",
    certificate: "Yes",
    description: "Learn essential data structures like arrays, linked lists, and trees.",
    technology: ["C++", "Algorithms"]
  },

  wdd231: {
    subject: "Computer Science",
    number: "231",
    title: "Data Structures",
    credits: "7",
    certificate: "Yes",
    description: "Learn essential data structures like arrays, linked lists, and trees.",
    technology: ["C++", "Algorithms"]
  },
 
};

function displayCourseDetails(course) {
  const courseData = courses[course];
  
  courseDetails.innerHTML = '';
  courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${courseData.subject} ${courseData.number}</h2>
    <h3>${courseData.title}</h3>
    <p><strong>Credits</strong>: ${courseData.credits}</p>
    <p><strong>Certificate</strong>: ${courseData.certificate}</p>
    <p>${courseData.description}</p>
    <p><strong>Technologies</strong>: ${courseData.technology.join(', ')}</p>
  `;

  courseDetails.showModal();

  const closeModal = document.getElementById('closeModal');
  closeModal.addEventListener("click", () => {
    courseDetails.close();
  });

  courseDetails.addEventListener("click", (event) => {
    if (event.target === courseDetails) {
      courseDetails.close();
    }
  });
}

document.querySelectorAll('.course-card').forEach((button) => {
  button.addEventListener('click', () => {
    displayCourseDetails(button.dataset.course);
  });
});
