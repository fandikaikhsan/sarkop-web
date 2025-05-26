document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (e) {
    const item = e.target.closest(".menu-item")
    if (item) {
      const existingOverlay = document.querySelector(".detailed-menu-card")
      if (existingOverlay) existingOverlay.remove()

      const description = item.dataset.description
      const menuData = JSON.parse(item.dataset.menu || "[]")
      const headerImage = item.dataset.header
      const category = item.querySelector("h3").textContent

      const overlay = document.createElement("div")
      overlay.className = "detailed-menu-card"
      overlay.innerHTML = `
        <div class="detailed-menu-content">
          <button class="close-button">&times;</button>
          <div class="detailed-header" style="background-image: linear-gradient(rgba(123,30,30,0.8),rgba(123,30,30,0.8)), url('${headerImage}')">
            <h2>${category}</h2>
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
        </div>
      `
      overlay.addEventListener("click", function (evt) {
        if (
          evt.target === overlay ||
          evt.target.classList.contains("close-button")
        ) {
          overlay.remove()
        }
      })
      document.body.appendChild(overlay)
    }
  })
})
