document.addEventListener("DOMContentLoaded", () => {

    document.body.addEventListener("click", (e) => {
        const link = e.target.closest("a");

        // Only track internal page clicks
        if (!link || !link.href) return;

        const url = link.getAttribute("href");

        // Ignore external links
        if (
            url.startsWith("http") ||
            url.startsWith("https") ||
            url.startsWith("#")
        ) return;

        const title =
            link.textContent.trim() ||
            document.title ||
            "CyberWatch Page";

        saveToHistory(title, url);
    });

});

function saveToHistory(title, url) {
    let history = JSON.parse(localStorage.getItem("cyberwatchHistory")) || [];

    const entry = {
        title,
        url,
        date: new Date().toLocaleDateString()
    };

    // Remove duplicates
    history = history.filter(item => item.url !== url);

    history.unshift(entry);

    // Limit history size (optional)
    history = history.slice(0, 10);

    localStorage.setItem("cyberwatchHistory", JSON.stringify(history));
}
