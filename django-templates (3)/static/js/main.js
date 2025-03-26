document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mainNav = document.querySelector(".main-nav")

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener("click", function () {
      mainNav.style.display = mainNav.style.display === "flex" ? "none" : "flex"

      // Toggle hamburger icon animation
      const spans = this.querySelectorAll("span")
      if (mainNav.style.display === "flex") {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })

    // Close mobile menu on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        mainNav.style.display = ""
        const spans = mobileMenuToggle.querySelectorAll("span")
        spans.forEach((span) => (span.style = ""))
      }
    })
  }
})

