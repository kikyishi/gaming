let games = [];
let currentSort = "playtime";

async function loadGames() {
  try {
    const response = await fetch("../db/games.json");
    if (!response.ok) throw new Error("Network response was not ok");
    games = await response.json();
    renderCards();
  } catch (error) {
    console.error("Error fetching JSON:", error);
    const container = document.getElementById("cards");
    if (container) container.innerHTML = "<p>Error loading data.</p>";
  }
}

function setSort(type) {
  currentSort = type;

  document
    .querySelectorAll(".sortbutton")
    .forEach((btn) => btn.classList.remove("active"));
  event.currentTarget.classList.add("active");

  renderCards();
}

function renderCards() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const cardsContainer = document.getElementById("cards");

  let filteredData = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm),
  );

  filteredData.sort((a, b) => {
    if (currentSort === "playtime") return b.playtime - a.playtime;

    if (currentSort === "achievements") {
      const getPercent = (g) =>
        g.total && g.total > 0 ? g.achieved / g.total : -1;
      return getPercent(b) - getPercent(a);
    }
    return 0;
  });

  cardsContainer.innerHTML = filteredData
    .map((game) => {
      let displayTime =
        game.playtime < 60
          ? `${game.playtime} mins`
          : `${(game.playtime / 60).toFixed(1).replace(".0", "")}h`;

      let achievementHTML =
        game.total && game.total > 0
          ? `${game.achieved}/${game.total}`
          : `<span style="color: #666; font-style: italic;">No achievements</span>`;

      return `
          <div class="card">
            <img src="${game.icon}" alt="" />
            <h2>${game.title}</h2>
            <ul>
              <li>Playtime: ${displayTime}</li>
              <li>Achievements: ${achievementHTML}</li>
            </ul>
            <label>${game.platform}</label>
          </div>
        `;
    })
    .join("");
}

loadGames();
