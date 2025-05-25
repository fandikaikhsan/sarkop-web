document.addEventListener("DOMContentLoaded", async () => {
  // Fetch and render menu items
  const menuGrid = document.querySelector(".menu-grid")
  if (menuGrid) {
    try {
      const response = await fetch("/menu-data.json")
      const menuData = await response.json()

      menuGrid.innerHTML = menuData
        .map(
          (item) => `
          <div
            class="menu-item"
            data-description="${item.description}"
            data-menu='${JSON.stringify(item.menuItems)}'
            style="background-image: url('${item.cardImage}')"
          >
            <div class="menu-overlay">
              <h3>${item.category}</h3>
              <p>Start from: ${item.startPrice}</p>
            </div>
          </div>
        `
        )
        .join("")
    } catch (error) {
      console.error("Failed to load menu data:", error)
    }
  }

  // Handle menu item click for detailed view
  document.body.addEventListener("click", function (e) {
    const item = e.target.closest(".menu-item")
    if (item) {
      const existingOverlay = document.querySelector(".detailed-menu-card")
      if (existingOverlay) {
        existingOverlay.remove()
      }

      const description = item.dataset.description
      const menuData = JSON.parse(item.dataset.menu || "[]")

      const overlay = document.createElement("div")
      overlay.className = "detailed-menu-card"
      overlay.innerHTML = `
        <div class="detailed-menu-content">
          <div class="detailed-header" style="background-image: url('${item.style.backgroundImage.slice(
            5,
            -2
          )}')">
            <h2>${item.querySelector("h3").textContent}</h2>
          </div>
          <div class="detailed-description">
            <p>${description}</p>
            <table class="detailed-table">
              <thead>
                <tr>
                  <th>Menu Item</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${menuData
                  .map(
                    (menuItem) =>
                      `<tr><td>${menuItem.name}</td><td>${menuItem.price}</td></tr>`
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
          <button onclick="this.closest('.detailed-menu-card').remove()">Close</button>
        </div>
      `

      document.body.appendChild(overlay)
    }
  })
})
