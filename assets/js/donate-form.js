
    const amountButtons = document.querySelectorAll(".amounts button");
    const amountInput = document.getElementById("customAmount");
    const form = document.getElementById("donationForm");

  const showError = (input, message) => {
    const errorEl = input.parentElement.querySelector(".error-msg");
    errorEl.textContent = message;
    input.classList.add("error");
  };

  const clearError = (input) => {
    const errorEl = input.parentElement.querySelector(".error-msg");
    errorEl.textContent = "";
    input.classList.remove("error");
  };

  // Handle preset amount buttons
  amountButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            amountButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            amountInput.value = btn.dataset.amount;
            clearError(amountInput);
        });
  });

  // Validate amount input
  amountInput.addEventListener("input", () => {
    const value = parseInt(amountInput.value, 10);
    amountButtons.forEach((b) => b.classList.remove("active"));

    if (!value || value < 1) {
        showError(amountInput, "Amount must be at least ₹1");
    } else {
        clearError(amountInput);
    }
  });

  // Log data on submit
  form.addEventListener("submit", (e) => {
        e.preventDefault(); // prevent actual submit for testing

    const amount = parseInt(amountInput.value, 10);
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!amount || amount < 1) {
        showError(amountInput, "Amount must be at least ₹1");
    return;
    }

    //  Console output
    console.log("Donation Data:");
    console.log({
        amount: amount,
    name: name,
    email: email
    });

  });


