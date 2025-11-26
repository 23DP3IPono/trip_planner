document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  const body = document.body;
  const learnMoreButtons = document.querySelectorAll('.learn-more');
  const modal = document.getElementById('infoModal');
  const modalText = document.getElementById('modal-text');
  const closeBtn = document.querySelector('.close-btn');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    darkModeToggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
  });

  learnMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
      modalText.textContent = button.dataset.info;
      modal.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const successMessage = document.getElementById('successMessage');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    [nameError, emailError, messageError].forEach(err => {
      err.classList.remove('active');
      err.textContent = '';
    });
    successMessage.style.display = 'none';

    if (nameInput.value.trim() === "") {
      nameError.textContent = "Please enter your name.";
      nameError.classList.add('active');
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "") {
      emailError.textContent = "Please enter your email.";
      emailError.classList.add('active');
      valid = false;
    } else if (!emailPattern.test(emailInput.value)) {
      emailError.textContent = "Invalid email format.";
      emailError.classList.add('active');
      valid = false;
    }

    if (messageInput.value.trim() === "") {
      messageError.textContent = "Please enter your message.";
      messageError.classList.add('active');
      valid = false;
    }

    if (valid) {
      successMessage.textContent = "Message sent successfully!";
      successMessage.style.display = 'block';
      contactForm.reset();
      successMessage.animate([{ opacity: 0, transform: 'scale(0.8)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 400, easing: 'ease-out' });
    }
  });

  const searchInput = document.getElementById('searchInput');
  const cards = document.querySelectorAll('.card');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const text = card.querySelector('p').textContent.toLowerCase();
        if (title.includes(searchTerm) || text.includes(searchTerm)) {
          card.style.display = 'block';
          card.animate([{ opacity: 0, transform: 'scale(0.95)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 300, easing: 'ease-out' });
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
  const weatherInput = document.getElementById("weatherSearch");
  const weatherBtn = document.getElementById("weatherBtn");
  const results = document.getElementById("weatherResults");
  const errorMsg = document.getElementById("weatherError");
  const historyBox = document.getElementById("history");

  const HISTORY_KEY = "weatherHistory_v1";
  let searchHistory = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

  function saveHistory(city) {
    city = city.trim();
    searchHistory = searchHistory.filter(c => c.toLowerCase() !== city.toLowerCase());
    searchHistory.unshift(city);
    searchHistory = searchHistory.slice(0, 5);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory));
    showHistory();
  }

  function showHistory() {
    historyBox.innerHTML = "";
    if (!searchHistory.length) {
      historyBox.textContent = "Search history will appear here.";
      return;
    }
    searchHistory.forEach(city => {
      const tag = document.createElement("span");
      tag.textContent = city;
      tag.addEventListener('click', () => fetchWeather(city));
      historyBox.appendChild(tag);
    });
  }
  const weatherCodeMap = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  async function fetchWeather(city) {
    if (!city || !city.trim()) return;
    errorMsg.textContent = "";
    results.innerHTML = "";

    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
      const geoRes = await fetch(geoUrl);
      if (!geoRes.ok) throw new Error("Geocoding error");
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        errorMsg.textContent = "Dati nav pieejami (pilsētu nevar atrast).";
        return;
      }

      const place = geoData.results[0];
      const lat = place.latitude;
      const lon = place.longitude;
      const displayName = place.name + (place.country ? ", " + place.country : "");

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
      const weatherRes = await fetch(weatherUrl);
      if (!weatherRes.ok) throw new Error("Weather fetch error");
      const weatherData = await weatherRes.json();
      const w = weatherData.current_weather;

      if (!w) {
        errorMsg.textContent = "Dati nav pieejami (laikapstākļi nav pieejami).";
        return;
      }

      const codeText = weatherCodeMap[w.weathercode] || `Code ${w.weathercode}`;
      const card = document.createElement('div');
      card.className = 'weather-card';
      card.innerHTML = `
        <h3>${displayName}</h3>
        <p><strong>Temperature:</strong> ${w.temperature}°C</p>
        <p><strong>Wind Speed:</strong> ${w.windspeed} km/h</p>
        <p><strong>Wind Dir:</strong> ${w.winddirection}°</p>
        <p><strong>Condition:</strong> ${codeText}</p>
        <p style="font-size:0.85rem;color:#666;margin-top:0.6rem;">Data timezone: ${weatherData.timezone || 'auto'}</p>
      `;

      results.appendChild(card);

      saveHistory(displayName);

    } catch (err) {
      console.error(err);
      errorMsg.textContent = "Dati nav pieejami!";
    }
  }

  if (weatherBtn) {
    weatherBtn.addEventListener('click', () => {
      const val = weatherInput.value.trim();
      if (val) fetchWeather(val);
    });

    weatherInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = weatherInput.value.trim();
        if (val) fetchWeather(val);
      }
    });
  }

  showHistory();
});
