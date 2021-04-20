const rovers = [
  'curiosity',
  'spirit',
  'opportunity',
  'perseverance'
];

const defaultRover = 'curiosity';

async function fetchPhotos(rover = 'curiosity') {
  const latestSol = {
    curiosity: 3090,
    spirit: 499,
    opportunity: 2000
  };
  const url = new URL(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`);
  url.search = new URLSearchParams({
    api_key: 'KyptxXQj6v0702PSOScMDeGgMPjfbOGWW7uX3Vtp',
    sol: latestSol[rover] || 55,
    page: '1'
  }).toString();
  const result = await fetch(url);
  const { photos } = await result.json();
  return photos;
}

async function renderPhotos(rover) {
  const el = document.querySelector('#Gallery');
  el.innerHTML = `
    <svg class="spinner my-4 mx-auto" viewBox="0 0 50 50">
      <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    </svg>
  `;
  const photos = await fetchPhotos(rover);
  el.innerHTML = `
    ${photos.map((photo, i) => `
      <figure class=”gallery-item gallery-item--${i}">
        <img src="${photo.img_src}" alt="${photo.earth_date}" width="300" height="300" />
      </figure>
    `).join('')}
  `;
}

function renderButtons() {
  const el = document.querySelector('#Buttons');
  el.innerHTML = `
    <div class="row align-items-center">
      ${rovers.map(rover => `
        <button
          type="button"
          class="col btn btn-primary btn-lg px-4 me-sm-3"
          onclick="renderPhotos('${rover}')"
        >
          ${rover.charAt(0).toUpperCase() + rover.slice(1)}
        </button>
      `).join('')}
    </div>
  `;
}

window.addEventListener('DOMContentLoaded', () => {
  renderButtons();
  renderPhotos(defaultRover);
});