const apiKey = 'AI6aQidzmbxGR7vBteKAv7szfc1gyRjrzGJbX9me';  // Replace with your real NASA API key

const spaceFacts = [
    "A day on Venus is longer than its year!",
    "Neutron stars can spin at 600 rotations per second.",
    "One spoonful of a neutron star would weigh a billion tons.",
    "There are more stars in the universe than grains of sand on Earth.",
    "The footprints on the Moon will stay there for millions of years.",
    "Saturn could float in water because it's mostly gas."
];

function getPicture() {
    const date = document.getElementById('date').value;
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    
    if (date) {
        url += `&date=${date}`;
    }

    document.getElementById('loading').style.display = 'block';
    document.getElementById('content').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('space-fact').textContent = '';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.media_type !== 'image') {
                throw new Error('Media is not an image.');
            }

            document.getElementById('title').textContent = data.title;
            document.getElementById('image').src = data.url;
            document.getElementById('description').textContent = data.explanation;

            document.getElementById('loading').style.display = 'none';
            document.getElementById('content').style.display = 'block';

            const fact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
            document.getElementById('space-fact').textContent = fact;
        })
        .catch(error => {
            console.log('Error:', error);
            document.getElementById('loading').style.display = 'none';
            document.getElementById('error-message').textContent = 'Oops! Something went wrong. Please try another date.';
            document.getElementById('error-message').style.display = 'block';
        });
}

function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
}

function saveToFavorites() {
    const title = document.getElementById('title').textContent;
    const image = document.getElementById('image').src;

    if (title && image) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.push({ title, image });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        displayFavorites();
        alert('Saved to Favorites!');
    }
}

function displayFavorites() {
    const favoritesDiv = document.getElementById('favorites');
    favoritesDiv.innerHTML = '';

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.forEach(fav => {
        const img = document.createElement('img');
        img.src = fav.image;
        img.alt = fav.title;
        img.style.width = '150px';
        img.style.margin = '10px';
        favoritesDiv.appendChild(img);
    });
}

function downloadImage() {
    const imageUrl = document.getElementById('image').src;
    const imageTitle = document.getElementById('title').textContent || "NASA_Image";

    if (imageUrl) {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = imageTitle.replace(/\s+/g, '_') + ".jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("No image available to download.");
    }
}

getPicture();
displayFavorites();
