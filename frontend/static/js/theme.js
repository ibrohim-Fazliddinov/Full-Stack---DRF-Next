document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle")
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

  // Check for saved theme preference or use the system preference
  const currentTheme = localStorage.getItem("theme") || (prefersDarkScheme.matches ? "dark" : "light")

  // Apply the current theme
  if (currentTheme === "dark") {
    document.body.classList.add("dark-theme")
  } else {
    document.body.classList.remove("dark-theme")
  }

  // Toggle theme when button is clicked
  themeToggle.addEventListener("click", () => {
    let theme

    if (document.body.classList.contains("dark-theme")) {
      document.body.classList.remove("dark-theme")
      theme = "light"
    } else {
      document.body.classList.add("dark-theme")
      theme = "dark"
    }

    // Save the preference
    localStorage.setItem("theme", theme)
  })
})

