
class FormValidator {
    constructor(form) {
        this.form = form;
        this.fields = form.querySelectorAll(
            "input:not([type='checkbox']), select, textarea"
        );
        this.checkbox = form.querySelector("input[type='checkbox'][required]");
        this.init();
    }

    init() {
        this.form.addEventListener("submit", e => this.handleSubmit(e));

        this.fields.forEach(field => {
            field.addEventListener("input", () => this.clearError(field));
            field.addEventListener("change", () => this.clearError(field));
        });

        if (this.checkbox) {
            this.checkbox.addEventListener("change", () =>
                this.clearCheckboxError()
            );
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let isValid = true;

        this.fields.forEach(field => {
            if (!this.validateField(field)) isValid = false;
        });

        if (this.checkbox && !this.checkbox.checked) {
            const msg =
                this.checkbox.dataset.errorRequired ||
                "This field is required";
            this.setCheckboxError(msg);
            isValid = false;
        }

        if (!isValid) {
            this.shakeForm();
            return;
        }

        console.log("Form valid, ready to submit");
        this.form.reset();
    }

    validateField(field) {
        const value = field.value.trim();
        const required = field.hasAttribute("required");
        const type = field.type;
        const pattern = field.getAttribute("pattern");

        if (required && !value) {
            const msg =
                field.dataset.errorRequired ||
                "This field is required";
            this.setError(field, msg);
            return false;
        }

        if (type === "email" && value && !this.isValidEmail(value)) {
            const msg =
                field.dataset.errorEmail ||
                "Enter a valid email address";
            this.setError(field, msg);
            return false;
        }

        if (pattern && value && !new RegExp(pattern).test(value)) {
            const msg =
                field.dataset.errorPattern ||
                "Invalid format";
            this.setError(field, msg);
            return false;
        }

        return true;
    }

    setError(field, message) {
        const group = field.closest(".form-group");
        if (!group) return;
        group.classList.add("error");
        group.querySelector(".error-msg").textContent = message;
    }

    clearError(field) {
        const group = field.closest(".form-group");
        if (!group) return;
        group.classList.remove("error");
        group.querySelector(".error-msg").textContent = "";
    }

    setCheckboxError(message) {
        const error = this.form.querySelector(".checkbox-error");
        if (!error) return;
        error.textContent = message;
        error.style.display = "block";
    }

    clearCheckboxError() {
        const error = this.form.querySelector(".checkbox-error");
        if (!error) return;
        error.textContent = "";
        error.style.display = "none";
    }

    shakeForm() {
        this.form.classList.add("shake");
        setTimeout(() => this.form.classList.remove("shake"), 400);
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("form").forEach(form => {
        new FormValidator(form);
    });
});

