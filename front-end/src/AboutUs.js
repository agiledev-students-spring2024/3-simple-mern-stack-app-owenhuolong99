// import React, { useState, useEffect } from 'react';

// const AboutUs = () => {
//   const [aboutUsData, setAboutUsData] = useState({ title: '', content: [], image: '' });

//   useEffect(() => {
//     fetch('/api/about-us')
//       .then(response => response.json())
//       .then(data => setAboutUsData(data))
//       .catch(error => console.error('Error fetching About Us data:', error));
//   }, []);

//   return (
//     <div>
//       <h1>{aboutUsData.title}</h1>
//       {aboutUsData.content.map((paragraph, index) => (
//         <p key={index}>{paragraph}</p>
//       ))}
//       <img src={aboutUsData.image} alt="About Us" style={{ maxWidth: '100%' }} />
//     </div>
//   );
// };

// export default AboutUs;
import React, { useEffect } from 'react';

function AboutUs() {
  // Hardcoded URL for our API endpoint
  const apiUrl = "http://localhost:5002/about_us";

  function fetchData() {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Displaying our data
        document.getElementById("profile-pic").src = data.image;
        document.getElementById("student-description").innerText = data.content;
      });
  }

  // Call the fetchData function when our component is displayed
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="student-profile">
      <img id="profile-pic" alt="Student Profile" />
      <p id="student-description"></p>
    </div>
  );
}

export default AboutUs;
