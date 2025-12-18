let pages = [];

// Load search index
fetch("search-data.json")
    .then(res => res.json())
    .then(data => pages = data)
    .catch(err => console.error("Search index error:", err));

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("search-input");
    const resultsBox = document.getElementById("search-results");

    if (!input || !resultsBox) return;

    let currentResults = [];

    input.addEventListener("input", () => {
        const query = input.value.trim().toLowerCase();

        if (query.length < 2) {
            resultsBox.style.display = "none";
            resultsBox.innerHTML = "";
            currentResults = [];
            return;
        }

        currentResults = pages.filter(page =>
            page.title.toLowerCase().includes(query) ||
            page.content.toLowerCase().includes(query)
        );

        if (currentResults.length === 0) {
            resultsBox.innerHTML =
                `<div style="padding:8px;color:#aaa;">No results found</div>`;
        } else {
            resultsBox.innerHTML = currentResults.map(page =>
                `<a href="${page.url}">${page.title}</a>`
            ).join("");
        }

        resultsBox.style.display = "block";
    });

    // ✅ ENTER KEY HANDLER
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && currentResults.length > 0) {
            window.location.href = currentResults[0].url;
        }
    });

    // Hide results when clicking elsewhere
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-container")) {
            resultsBox.style.display = "none";
        }
    });
});
