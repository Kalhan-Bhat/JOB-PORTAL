// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBepM9m1EgxFYAtHnp-_uPYPSpNPT-8fCs",
    authDomain: "job-portal-56cf5.firebaseapp.com",
    projectId: "job-portal-56cf5",
    storageBucket: "job-portal-56cf5.appspot.com",
    messagingSenderId: "158380212010",
    appId: "1:158380212010:web:9dd40736216e0cfa3c6853",
    measurementId: "G-C8TJ19X321"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('job-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log("Form submitted");

    // Get form values
    const jobTitle = document.getElementById('job-title').value;
    const companyName = document.getElementById('company-name').value;
    const location = document.getElementById('location').value;
    const requirements = document.getElementById('requirements').value;
    const contactInfo = document.getElementById('contact-info').value;

    console.log("Job details:", { jobTitle, companyName, location, requirements, contactInfo });

    // Save job to Firestore
    try {
        await addDoc(collection(db, "jobs"), {
            jobTitle,
            companyName,
            location,
            requirements,
            contactInfo
        });
        console.log("Job opportunity submitted successfully!");
        alert("Job opportunity submitted successfully!");
        document.getElementById('job-form').reset();
        fetchJobs(); // Refresh job listings
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});

async function fetchJobs() {
    document.getElementById('jobs-container').innerHTML = "";
    try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        querySnapshot.forEach((doc) => {
            const job = doc.data();
            console.log("Fetched job:", job);
            const jobItem = document.createElement('div');
            jobItem.classList.add('job-item');
            jobItem.innerHTML = `
                <h3>${job.jobTitle}</h3>
                <p><strong>Company:</strong> ${job.companyName}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Requirements:</strong> ${job.requirements}</p>
                <p><strong>Contact:</strong> ${job.contactInfo}</p>
            `;
            document.getElementById('jobs-container').appendChild(jobItem);
        });
    } catch (error) {
        console.error("Error fetching jobs: ", error);
    }
}

// Fetch jobs on load
fetchJobs();
