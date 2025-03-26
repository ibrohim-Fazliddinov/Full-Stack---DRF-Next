document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form")
  const firstNameInput = document.getElementById("first_name")
  const lastNameInput = document.getElementById("last_name")
  const emailInput = document.getElementById("email")
  const passwordInput = document.getElementById("password")
  const confirmPasswordInput = document.getElementById("confirm_password")
  const termsCheckbox = document.getElementById("terms")

  const firstNameError = document.getElementById("first-name-error")
  const lastNameError = document.getElementById("last-name-error")
  const emailError = document.getElementById("email-error")
  const passwordError = document.getElementById("password-error")
  const confirmPasswordError = document.getElementById("confirm-password-error")
  const termsError = document.getElementById("terms-error")

  const strengthSegments = document.querySelectorAll(".strength-segment")
  const strengthText = document.querySelector(".strength-text")

  if (registerForm) {
    // Password strength meter
    passwordInput.addEventListener("input", function () {
      const password = this.value
      const strength = checkPasswordStrength(password)

      // Reset all segments
      strengthSegments.forEach((segment) => {
        segment.className = "strength-segment"
      })

      // Update strength meter
      if (password) {
        if (strength >= 1) {
          strengthSegments[0].classList.add("weak")
        }
        if (strength >= 2) {
          strengthSegments[1].classList.add("medium")
        }
        if (strength >= 3) {
          strengthSegments[2].classList.add("medium")
        }
        if (strength >= 4) {
          strengthSegments[3].classList.add("strong")
        }

        // Update text
        if (strength < 2) {
          strengthText.textContent = "Weak password"
        } else if (strength < 4) {
          strengthText.textContent = "Medium password"
        } else {
          strengthText.textContent = "Strong password"
        }
      } else {
        strengthText.textContent = "Password strength"
      }
    })

    // Form validation
    registerForm.addEventListener("submit", (event) => {
      let isValid = true

      // Reset error messages
      firstNameError.textContent = ""
      lastNameError.textContent = ""
      emailError.textContent = ""
      passwordError.textContent = ""
      confirmPasswordError.textContent = ""
      termsError.textContent = ""

      // Validate first name
      if (!firstNameInput.value.trim()) {
        firstNameError.textContent = "First name is required"
        isValid = false
      }

      // Validate last name
      if (!lastNameInput.value.trim()) {
        lastNameError.textContent = "Last name is required"
        isValid = false
      }

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
      } else if (passwordInput.value.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters"
        isValid = false
      } else if (checkPasswordStrength(passwordInput.value) < 2) {
        passwordError.textContent = "Password is too weak"
        isValid = false
      }

      // Validate confirm password
      if (!confirmPasswordInput.value) {
        confirmPasswordError.textContent = "Please confirm your password"
        isValid = false
      } else if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.textContent = "Passwords do not match"
        isValid = false
      }

      // Validate terms
      if (!termsCheckbox.checked) {
        termsError.textContent = "You must agree to the terms"
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

  // Password strength checker
  function checkPasswordStrength(password) {
    let strength = 0

    // Length check
    if (password.length >= 8) {
      strength += 1
    }

    // Contains lowercase
    if (/[a-z]/.test(password)) {
      strength += 1
    }

    // Contains uppercase
    if (/[A-Z]/.test(password)) {
      strength += 1
    }

    // Contains number
    if (/[0-9]/.test(password)) {
      strength += 1
    }

    // Contains special character
    if (/[^a-zA-Z0-9]/.test(password)) {
      strength += 1
    }

    return Math.min(strength, 4)
  }
})

