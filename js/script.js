async function displayJsonCount() {
  try {
    // 1. Fetch your JSON file
    const response = await fetch("../db/games.json");
    const data = await response.json();

    // 2. Count the items (assuming the JSON is an array)
    const count = data.length;

    // 3. Update the first list item
    document.getElementById("librarytotal").textContent = `${count}`;
  } catch (error) {
    console.error("Error fetching JSON:", error);
    document.getElementById("item-count").textContent = "Error loading count";
  }
}

displayJsonCount();
