document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form")
  const emailInput = document.getElementById("email")
  const passwordInput = document.getElementById("password")
  const emailError = document.getElementById("email-error")
  const passwordError = document.getElementById("password-error")

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      let isValid = true

      // Reset error messages
      emailError.textContent = ""
      passwordError.textContent = ""

      // Validate email
      if (!emailInput.value.trim()) {
        emailError.textContent = "Email is required"
        isValid = false
      } else if (!isValidEmail(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address"
        isValid = false
      }

      // Validate password
      if (!passwordInput.value) {
        passwordError.textContent = "Password is required"
        isValid = false
      }

      if (!isValid) {
        event.preventDefault()
      }
    })
  }

  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
})

