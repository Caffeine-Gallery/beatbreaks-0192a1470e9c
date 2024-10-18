import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const packages = await backend.listPackages();
        displayPackages(packages);
    } catch (error) {
        console.error("Error fetching packages:", error);
    }
});

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

window.requestInfo = function(packageId) {
    alert(`Thank you for your interest in package ${packageId}. We'll contact you soon with more information!`);
};
