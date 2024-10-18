import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadPackages();
    } catch (error) {
        console.error("Error fetching packages:", error);
    }

    document.getElementById('package-form').addEventListener('submit', handleFormSubmit);
});

async function loadPackages() {
    const packages = await backend.listPackages();
    displayPackages(packages);
}

function displayPackages(packages) {
    const packageList = document.getElementById('package-list');
    packageList.innerHTML = '';

    packages.forEach(pkg => {
        const packageElement = document.createElement('div');
        packageElement.className = 'package';
        packageElement.innerHTML = `
            <h3>${pkg.name}</h3>
            <p>${pkg.description}</p>
            <p>Price: $${pkg.price}</p>
            <p>Duration: ${pkg.duration} days</p>
            <p>Clubs included: ${pkg.clubsIncluded.join(', ')}</p>
            <button onclick="requestInfo(${pkg.id})">Request Info</button>
        `;
        packageList.appendChild(packageElement);
    });
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('package-name').value;
    const description = document.getElementById('package-description').value;
    const price = parseInt(document.getElementById('package-price').value);
    const duration = parseInt(document.getElementById('package-duration').value);
    const clubsIncluded = document.getElementById('package-clubs').value.split(',').map(club => club.trim());

    try {
        await backend.addPackage(name, description, price, duration, clubsIncluded);
        alert('Package added successfully!');
        event.target.reset();
        await loadPackages();
    } catch (error) {
        console.error("Error adding package:", error);
        alert('Failed to add package. Please try again.');
    }
}

window.requestInfo = function(packageId) {
    alert(`Thank you for your interest in package ${packageId}. We'll contact you soon with more information!`);
};
