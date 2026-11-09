
// ========================================
// 1. SELECT HTML ELEMENTS
// ========================================

const form = document.getElementById("registration-form");

const nameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

const messageInput = document.getElementById("message");
const agreementInput = document.getElementById("agreement");

const submitButton = document.getElementById("submit-button");
const resetButton = document.getElementById("reset-button");

const successMessage = document.getElementById("success-message");

const skillsSelect = document.getElementById("skill-select");
const addSkillButton = document.getElementById("add-skill");
const skillsList = document.getElementById("skills-list");

const characterCount = document.getElementById("character-count");

const strengthFill = document.getElementById("strength-fill");
const strengthText = document.getElementById("strength-text");


// ========================================
// 2. DISPLAY ERROR MESSAGES
// ========================================

function showError(input, message) {

    const errorElement = document.getElementById(
        input.id + "-error"
    );

    errorElement.textContent = message;

    input.classList.add("input-error");
    input.classList.remove("input-success");
}


function clearError(input) {

    const errorElement = document.getElementById(
        input.id + "-error"
    );

    errorElement.textContent = "";

    input.classList.remove("input-error");
    input.classList.remove("input-success");
}


function showSuccess(input) {

    clearError(input);

    input.classList.add("input-success");
}


// ========================================
// 3. VALIDATE INDIVIDUAL FIELDS
// ========================================

function validateName() {

    const value = nameInput.value.trim();

    if (value === "") {
        showError(nameInput, "Name is required.");
        return false;
    }

    if (value.length < 3) {
        showError(nameInput, "Name must contain at least 3 characters.");
        return false;
    }

    showSuccess(nameInput);
    return true;
}


function validateEmail() {

    if (emailInput.value.trim() === "") {
        showError(emailInput, "Email is required.");
        return false;
    }

    if (!emailInput.validity.valid) {
        showError(emailInput, "Please enter a valid email address.");
        return false;
    }

    showSuccess(emailInput);
    return true;
}


function validatePhone() {

    if (phoneInput.value.trim() === "") {
        showError(phoneInput, "Phone number is required.");
        return false;
    }

    if (!phoneInput.validity.valid) {
        showError(phoneInput, "Enter an 11-digit phone number.");
        return false;
    }

    showSuccess(phoneInput);
    return true;
}


function validatePassword() {

    const password = passwordInput.value;

    if (password.length === 0) {
        showError(passwordInput, "Password is required.");
        return false;
    }

    if (password.length < 8) {
        showError(passwordInput, "Password must contain at least 8 characters.");
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        showError(passwordInput, "Add at least one uppercase letter.");
        return false;
    }

    if (!/[0-9]/.test(password)) {
        showError(passwordInput, "Add at least one number.");
        return false;
    }

    showSuccess(passwordInput);
    return true;
}


function validateConfirmPassword() {

    if (confirmPasswordInput.value === "") {
        showError(confirmPasswordInput, "Please confirm your password.");
        return false;
    }

    if (confirmPasswordInput.value !== passwordInput.value) {
        showError(confirmPasswordInput, "Passwords do not match.");
        return false;
    }

    showSuccess(confirmPasswordInput);
    return true;
}


function validateMessage() {

    const value = messageInput.value.trim();

    if (value.length < 10) {
        showError(messageInput, "Please write at least 10 characters.");
        return false;
    }

    showSuccess(messageInput);
    return true;
}


function validateAgreement() {

    const errorElement = document.getElementById("agreement-error");

    if (!agreementInput.checked) {
        errorElement.textContent = "You must accept the agreement.";
        return false;
    }

    errorElement.textContent = "";
    return true;
}


// ========================================
// 4. VALIDATE COMPLETE FORM
// ========================================

function validateForm() {

    const results = [
        validateName(),
        validateEmail(),
        validatePhone(),
        validatePassword(),
        validateConfirmPassword(),
        validateMessage(),
        validateAgreement()
    ];

    return results.every(result => result === true);
}


// ========================================
// 5. UPDATE SUBMIT BUTTON
// ========================================

function updateSubmitButton() {

    const valid = validateForm();

    submitButton.disabled = !valid;

}


// ========================================
// 6. LIVE VALIDATION
// ========================================

nameInput.addEventListener("input", () => {

    validateName();
    updateSubmitButton();

});


emailInput.addEventListener("input", () => {

    validateEmail();
    updateSubmitButton();

});


phoneInput.addEventListener("input", () => {

    validatePhone();
    updateSubmitButton();

});


passwordInput.addEventListener("input", () => {

    validatePassword();
    updatePasswordStrength();
    validateConfirmPassword();
    updateSubmitButton();

});


confirmPasswordInput.addEventListener("input", () => {

    validateConfirmPassword();
    updateSubmitButton();

});


messageInput.addEventListener("input", () => {

    validateMessage();
    updateCharacterCounter();
    updateSubmitButton();

});


agreementInput.addEventListener("change", () => {

    validateAgreement();
    updateSubmitButton();

});


// ========================================
// 7. PASSWORD STRENGTH
// ========================================

function updatePasswordStrength() {

    const password = passwordInput.value;

    let score = 0;

    if (password.length >= 8) score++;

    if (/[A-Z]/.test(password)) score++;

    if (/[0-9]/.test(password)) score++;

    if (/[^A-Za-z0-9]/.test(password)) score++;


    const levels = [
        {
            text: "Weak",
            width: "25%",
            color: "#dc2626"
        },
        {
            text: "Fair",
            width: "50%",
            color: "#ea580c"
        },
        {
            text: "Good",
            width: "75%",
            color: "#ca8a04"
        },
        {
            text: "Strong",
            width: "100%",
            color: "#16a34a"
        }
    ];


    if (password.length === 0) {

        strengthFill.style.width = "0";

        strengthText.textContent = "Password strength: Not entered";

        return;
    }


    const level = Math.max(0, score - 1);

    strengthFill.style.width = levels[level].width;

    strengthFill.style.backgroundColor = levels[level].color;

    strengthText.textContent =
        "Password strength: " + levels[level].text;

}


// ========================================
// 8. CHARACTER COUNTER
// ========================================

function updateCharacterCounter() {

    const currentLength = messageInput.value.length;

    const maximumLength = messageInput.maxLength;

    characterCount.textContent =
        `${currentLength} / ${maximumLength} characters`;

}


// ========================================
// 9. DYNAMIC SKILLS LIST
// ========================================

addSkillButton.addEventListener("click", () => {

    const selectedSkill = skillsSelect.value;

    if (selectedSkill === "") {
        showTemporaryMessage("Please select a skill first.");
        return;
    }

    // Check for duplicate skills
    const existingSkills = [...skillsList.querySelectorAll("[data-skill]")];

    const alreadyExists = existingSkills.some(
        item => item.dataset.skill === selectedSkill
    );

    if (alreadyExists) {
        showTemporaryMessage("This skill is already selected.");
        return;
    }

    const emptyMessage = skillsList.querySelector(".empty-skills");

    if (emptyMessage) {
        emptyMessage.remove();
    }

    const listItem = document.createElement("li");

    listItem.classList.add("skill-item");

    listItem.dataset.skill = selectedSkill;

    const skillName = document.createElement("span");

    skillName.textContent = selectedSkill;

    const removeButton = document.createElement("button");

    removeButton.type = "button";

    removeButton.classList.add("remove-skill");

    removeButton.textContent = "×";

    removeButton.setAttribute("aria-label", `Remove ${selectedSkill}`);

    listItem.append(skillName, removeButton);

    skillsList.append(listItem);

    skillsSelect.value = "";

});


// ========================================
// 10. EVENT DELEGATION
// ========================================

skillsList.addEventListener("click", event => {

    const removeButton = event.target.closest(".remove-skill");

    if (!removeButton) return;

    const listItem = removeButton.closest(".skill-item");

    listItem.remove();

    if (skillsList.children.length === 0) {

        const emptyMessage = document.createElement("li");

        emptyMessage.classList.add("empty-skills");

        emptyMessage.textContent = "No skills selected yet.";

        skillsList.append(emptyMessage);

    }

});


// ========================================
// 11. TEMPORARY NOTIFICATION
// ========================================

let notificationTimer;

function showTemporaryMessage(message) {

    let notification = document.getElementById("notification");

    if (!notification) {

        notification = document.createElement("div");

        notification.id = "notification";

        notification.setAttribute("role", "status");

        notification.setAttribute("aria-live", "polite");

        document.body.append(notification);

    }

    notification.textContent = message;

    notification.classList.remove("hidden");

    clearTimeout(notificationTimer);

    notificationTimer = setTimeout(() => {

        notification.remove();

    }, 2500);

}


// ========================================
// 12. TAB FUNCTIONALITY
// ========================================

const tabContainer = document.querySelector('[data-component="tabs"]');

tabContainer.addEventListener("click", event => {

    const clickedButton = event.target.closest("[data-tab]");

    if (!clickedButton) return;

    const targetId = clickedButton.dataset.tab;

    const allButtons = tabContainer.querySelectorAll("[data-tab]");

    const allPanels = tabContainer.querySelectorAll(".tab-panel");

    allButtons.forEach(button => {

        button.classList.remove("active");

    });

    allPanels.forEach(panel => {

        panel.classList.add("hidden");

    });

    clickedButton.classList.add("active");

    document.getElementById(targetId).classList.remove("hidden");

});


// ========================================
// 13. MODAL CONFIRMATION
// ========================================

function openConfirmationModal() {

    const overlay = document.createElement("div");

    overlay.classList.add("modal-overlay");

    overlay.dataset.component = "confirmation-modal";

    overlay.innerHTML = `
        <div class="modal" role="dialog" aria-modal="true"
             aria-labelledby="modal-title">

            <h2 id="modal-title">Confirm Registration</h2>

            <p>Are you sure you want to submit this registration?</p>

            <div class="modal-actions">

                <button type="button" class="button button--primary"
                        data-action="confirm">
                    Confirm
                </button>

                <button type="button" class="button button--secondary"
                        data-action="cancel">
                    Cancel
                </button>

            </div>

        </div>
    `;

    document.body.append(overlay);

    overlay.querySelector('[data-action="confirm"]').focus();

    // Store the modal for other functions
    return overlay;

}


// ========================================
// 14. FORM SUBMISSION
// ========================================

form.addEventListener("submit", event => {

    event.preventDefault();

    if (!validateForm()) {

        form.querySelector(":invalid")?.focus();

        return;

    }

    const modal = openConfirmationModal();

    modal.addEventListener("click", modalEvent => {

        const actionButton = modalEvent.target.closest("[data-action]");

        if (!actionButton) return;

        const action = actionButton.dataset.action;

        if (action === "confirm") {

            const formData = new FormData(form);

            const applicant = Object.fromEntries(formData.entries());

            console.log("Registration Details:", applicant);

            modal.remove();

            successMessage.textContent =
                "Registration completed successfully!";

            successMessage.classList.remove("hidden");

            successMessage.focus();

            form.reset();

            resetGeneratedUI();

            submitButton.disabled = true;

        }

        if (action === "cancel") {

            modal.remove();

            submitButton.focus();

        }

    });


    modal.addEventListener("click", modalEvent => {

        if (modalEvent.target === modal) {

            modal.remove();

            submitButton.focus();

        }

    });

});


// ========================================
// 15. RESET FORM
// ========================================

function resetGeneratedUI() {

    // Clear all field errors
    document.querySelectorAll(".error-message").forEach(error => {

        error.textContent = "";

    });

    // Remove success and error styles
    document.querySelectorAll(".input-error, .input-success").forEach(input => {

        input.classList.remove("input-error", "input-success");

    });

    // Reset password strength
    strengthFill.style.width = "0";

    strengthText.textContent = "Password strength: Not entered";

    // Reset character counter
    updateCharacterCounter();

    // Reset skills list
    skillsList.innerHTML = `
        <li class="empty-skills">No skills selected yet.</li>
    `;

    // Reset tabs
    tabContainer.querySelectorAll(".tab-button").forEach(button => {

        button.classList.toggle("active", button.dataset.tab === "education");

    });

    tabContainer.querySelectorAll(".tab-panel").forEach(panel => {

        panel.classList.toggle("hidden", panel.id !== "education");

    });

    // Clear success message
    successMessage.textContent = "";

    successMessage.classList.add("hidden");

    // Remove any notification
    document.getElementById("notification")?.remove();

    clearTimeout(notificationTimer);

}


resetButton.addEventListener("click", () => {

    const confirmReset = window.confirm(
        "Are you sure you want to clear the entire form?"
    );

    if (!confirmReset) return;

    form.reset();

    resetGeneratedUI();

    submitButton.disabled = true;

});


// ========================================
// 16. INITIALIZE FORM
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    updateCharacterCounter();

    updatePasswordStrength();

    submitButton.disabled = true;

});


// ========================================
// 17. BROWSER EVENTS
// ========================================

// Demonstrate window resize event
window.addEventListener("resize", () => {

    console.log("Window width:", window.innerWidth);

});

// Demonstrate scroll event
window.addEventListener("scroll", () => {

    console.log("Page scroll position:", window.scrollY);

});
