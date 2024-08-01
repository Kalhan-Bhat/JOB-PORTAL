document.getElementById('job-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const jobTitle = document.getElementById('job-title').value;
    const companyName = document.getElementById('company-name').value;
    const location = document.getElementById('location').value;
    const requirements = document.getElementById('requirements').value;
    const contactInfo = document.getElementById('contact-info').value;

    // Create job item
    const jobItem = document.createElement('div');
    jobItem.classList.add('job-item');
    jobItem.innerHTML = `
        <h3>${jobTitle}</h3>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Requirements:</strong> ${requirements}</p>
        <p><strong>Contact:</strong> ${contactInfo}</p>
    `;

    // Append job item to job listings
    document.getElementById('jobs-container').appendChild(jobItem);

    // Clear form
    document.getElementById('job-form').reset();
});
