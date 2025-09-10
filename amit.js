// Global variables to track state
let selectedSeason = null; // 'summer' or 'winter'
let currentTotalCloth = 0;
let currentTotalPrice = 0;

// Get elements for main app
const mainApp = document.getElementById('mainApp');
const summerBtn = document.getElementById('summerBtn');
const winterBtn = document.getElementById('winterBtn');
const addClothBtn = document.getElementById('addClothBtn');

// Get elements for Summer details
const summerDetails = document.getElementById('summerDetails');
const kidsClothInputSummer = document.getElementById('kidsClothSummer');
const womenClothInputSummer = document.getElementById('womenClothSummer');
const menClothInputSummer = document.getElementById('menClothSummer');
const totalClothSummerSpan = document.getElementById('totalClothSummer');
const totalPriceSummerSpan = document.getElementById('totalPriceSummer');
const confirmDetailsBtnSummer = document.getElementById('confirmDetailsBtnSummer');
const backToMainBtnSummer = document.getElementById('backToMainBtnSummer');

// Get elements for Winter details
const winterDetails = document.getElementById('winterDetails');
const kidsClothInputWinter = document.getElementById('kidsClothWinter');
const womenClothInputWinter = document.getElementById('womenClothWinter');
const menClothInputWinter = document.getElementById('menClothWinter');
const totalClothWinterSpan = document.getElementById('totalClothWinter');
const totalPriceWinterSpan = document.getElementById('totalPriceWinter');
const confirmDetailsBtnWinter = document.getElementById('confirmDetailsBtnWinter');
const backToMainBtnWinter = document.getElementById('backToMainBtnWinter');

// Get elements for Final Order details
const finalOrderDetails = document.getElementById('finalOrderDetails');
const finalSeasonSpan = document.getElementById('finalSeason');
const finalTotalClothSpan = document.getElementById('finalTotalCloth');
const finalTotalPriceSpan = document.getElementById('finalTotalPrice');
const locationInput = document.getElementById('locationInput');
const proceedToPaymentBtn = document.getElementById('proceedToPaymentBtn');
const submitOrderBtn = document.getElementById('submitOrderBtn');
const backFromFinalBtn = document.getElementById('backFromFinalBtn');


// Get elements for message box
const messageBoxOverlay = document.getElementById('messageBoxOverlay');
const messageBoxTitle = document.getElementById('messageBoxTitle');
const messageBoxText = document.getElementById('messageBoxText');
const messageBoxCloseBtn = document.getElementById('messageBoxCloseBtn');

// Function to display a custom message box
// It now accepts an optional callback to execute when the message box is closed
function showMessageBox(title, message, callback = null) {
    messageBoxTitle.textContent = title;
    messageBoxText.textContent = message;
    messageBoxOverlay.classList.remove('hidden');

    // Set the onclick handler for the close button
    // If a callback is provided, it will be executed after closing the message box.
    messageBoxCloseBtn.onclick = () => {
        messageBoxOverlay.classList.add('hidden');
        if (callback) {
            callback();
        }
        // Reset the onclick handler to default behavior after execution to avoid unintended re-triggers
        messageBoxCloseBtn.onclick = () => {
            messageBoxOverlay.classList.add('hidden');
        };
    };
}

// Event listener for message box close button (default behavior, ensures it's always set)
messageBoxCloseBtn.addEventListener('click', () => {
    messageBoxOverlay.classList.add('hidden');
});

// Function to hide all detail sections to ensure only one is visible at a time
function hideAllDetails() {
    summerDetails.classList.add('hidden', 'opacity-0', 'scale-95');
    winterDetails.classList.add('hidden', 'opacity-0', 'scale-95');
    finalOrderDetails.classList.add('hidden', 'opacity-0', 'scale-95');
}

// Function to transition to a new section with animation for a smoother user experience
function transitionToSection(hideElement, showElement) {
    hideElement.classList.add('opacity-0', 'scale-95'); // Start fade out and shrink
    hideElement.classList.remove('opacity-100', 'scale-100'); // Ensure full visibility is removed
    setTimeout(() => {
        hideElement.classList.add('hidden'); // Hide after transition
        showElement.classList.remove('hidden', 'opacity-0', 'scale-95'); // Show and reset animation classes
        showElement.classList.add('opacity-100', 'scale-100'); // Start fade in and grow
    }, 300); // Duration matches CSS transition
}

// Event listener for Summer button: sets season and updates button styling
summerBtn.addEventListener('click', () => {
    selectedSeason = 'summer';
    // Visually indicate selected season by changing button colors
    summerBtn.classList.remove('bg-blue-600');
    summerBtn.classList.add('bg-blue-800');
    winterBtn.classList.remove('bg-green-800');
    winterBtn.classList.add('bg-green-600');
    showMessageBox('Season Selected', 'Summer season selected. Now click "Add cloth"!');
});

// Event listener for Winter button: sets season and updates button styling
winterBtn.addEventListener('click', () => {
    selectedSeason = 'winter';
    // Visually indicate selected season by changing button colors
    winterBtn.classList.remove('bg-green-600');
    winterBtn.classList.add('bg-green-800');
    summerBtn.classList.remove('bg-blue-800');
    summerBtn.classList.add('bg-blue-600');
    showMessageBox('Season Selected', 'Winter season selected. Now click "Add cloth"!');
});

// Event listener for Add Cloth button: navigates to the appropriate detail screen
addClothBtn.addEventListener('click', () => {
    if (selectedSeason === 'summer') {
        transitionToSection(mainApp, summerDetails);
    } else if (selectedSeason === 'winter') {
        transitionToSection(mainApp, winterDetails);
    } else {
        showMessageBox('No Season Selected', 'Please select a season (Summer or Winter) first!');
    }
});

// Function to calculate and update totals based on the active section (summer or winter)
function updateTotals(season) {
    let kidsCount = 0;
    let womenCount = 0;
    let menCount = 0;
    let totalClothSpanElement;
    let totalPriceSpanElement;
    let kidsPrice = 0;
    let womenPrice = 0;
    let menPrice = 0;

    if (season === 'summer') {
        kidsCount = parseInt(kidsClothInputSummer.value) || 0;
        womenCount = parseInt(womenClothInputSummer.value) || 0;
        menCount = parseInt(menClothInputSummer.value) || 0;
        totalClothSpanElement = totalClothSummerSpan;
        totalPriceSpanElement = totalPriceSummerSpan;
        kidsPrice = 0.5;
        womenPrice = 1.5;
        menPrice = 2.2;
    } else if (season === 'winter') {
        kidsCount = parseInt(kidsClothInputWinter.value) || 0;
        womenCount = parseInt(womenClothInputWinter.value) || 0;
        menCount = parseInt(menClothInputWinter.value) || 0;
        totalClothSpanElement = totalClothWinterSpan;
        totalPriceSpanElement = totalPriceWinterSpan;
        kidsPrice = 1.0;
        womenPrice = 2.5;
        menPrice = 3.5;
    }

    const totalCloth = kidsCount + womenCount + menCount;
    const totalPrice = (kidsCount * kidsPrice) + (womenCount * womenPrice) + (menCount * menPrice);

    // Update the spans in the current section (e.g., Summer or Winter details)
    totalClothSpanElement.textContent = totalCloth;
    totalPriceSpanElement.textContent = `₹${totalPrice.toFixed(2)}`;

    // Store current totals in global variables for transfer to the final order page
    currentTotalCloth = totalCloth;
    currentTotalPrice = totalPrice;
}

// Event listeners for Summer input changes (recalculate totals on input)
kidsClothInputSummer.addEventListener('input', () => updateTotals('summer'));
womenClothInputSummer.addEventListener('input', () => updateTotals('summer'));
menClothInputSummer.addEventListener('input', () => updateTotals('summer'));

// Event listeners for Winter input changes (recalculate totals on input)
kidsClothInputWinter.addEventListener('input', () => updateTotals('winter'));
womenClothInputWinter.addEventListener('input', () => updateTotals('winter'));
menClothInputWinter.addEventListener('input', () => updateTotals('winter'));


// Function to reset all input fields and state variables to their initial values
function resetInputsAndState() {
    kidsClothInputSummer.value = '';
    womenClothInputSummer.value = '';
    menClothInputSummer.value = '';
    totalClothSummerSpan.textContent = '0';
    totalPriceSummerSpan.textContent = '₹0.00';

    kidsClothInputWinter.value = '';
    womenClothInputWinter.value = '';
    menClothInputWinter.value = '';
    totalClothWinterSpan.textContent = '0';
    totalPriceWinterSpan.textContent = '₹0.00';

    locationInput.value = ''; // Clear location input field

    selectedSeason = null;
    currentTotalCloth = 0;
    currentTotalPrice = 0;
    // Reset button visual states to their default colors
    summerBtn.classList.remove('bg-blue-800');
    summerBtn.classList.add('bg-blue-600');
    winterBtn.classList.remove('bg-green-800');
    winterBtn.classList.add('bg-green-600');
}

// Event listener for Summer Confirm Details button: validates and proceeds to final order
confirmDetailsBtnSummer.addEventListener('click', () => {
    updateTotals('summer'); // Ensure totals are up-to-date before proceeding
    if (currentTotalCloth > 0) {
        // Populate final order details and transition to the final order section
        finalSeasonSpan.textContent = selectedSeason;
        finalTotalClothSpan.textContent = currentTotalCloth;
        finalTotalPriceSpan.textContent = `₹${currentTotalPrice.toFixed(2)}`;
        transitionToSection(summerDetails, finalOrderDetails);
    } else {
        showMessageBox('Input Required', 'Please enter the number of clothes for at least one category.');
    }
});

// Event listener for Winter Confirm Details button: validates and proceeds to final order
confirmDetailsBtnWinter.addEventListener('click', () => {
    updateTotals('winter'); // Ensure totals are up-to-date before proceeding
    if (currentTotalCloth > 0) {
        // Populate final order details and transition to the final order section
        finalSeasonSpan.textContent = selectedSeason;
        finalTotalClothSpan.textContent = currentTotalCloth;
        finalTotalPriceSpan.textContent = `₹${currentTotalPrice.toFixed(2)}`;
        transitionToSection(winterDetails, finalOrderDetails);
    } else {
        showMessageBox('Input Required', 'Please enter the number of clothes for at least one category.');
    }
});

// Event listener for Summer Back button (returns to main app)
backToMainBtnSummer.addEventListener('click', () => {
    resetInputsAndState();
    transitionToSection(summerDetails, mainApp);
});

// Event listener for Winter Back button (returns to main app)
backToMainBtnWinter.addEventListener('click', () => {
    resetInputsAndState();
    transitionToSection(winterDetails, mainApp);
});

// Event listener for Proceed to Payment button (placeholder for actual payment integration)
proceedToPaymentBtn.addEventListener('click', () => {
    showMessageBox('Payment Gateway', 'Simulating payment processing... (This is a placeholder, no actual payment is made).');
});

// Event listener for Submit Order button: final validation and success messages
submitOrderBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        // First, show the detailed order submitted message
        showMessageBox(
            'Order Submitted!',
            `Your ${finalSeasonSpan.textContent} order for ${finalTotalClothSpan.textContent} clothes, totaling ${finalTotalPriceSpan.textContent}, has been submitted to "${location}". We will contact you shortly!`,
            () => {
                // This callback runs AFTER the user clicks 'OK' on the first message.
                // Then, show the final "Order Successfully Done" message.
                showMessageBox(
                    'Process Complete',
                    'Order Successfully Done.',
                    () => {
                        // This callback runs AFTER the user clicks 'OK' on the second message.
                        // Reset all inputs/state and return to the main application view.
                        resetInputsAndState();
                        transitionToSection(finalOrderDetails, mainApp);
                    }
                );
            }
        );
    } else {
        showMessageBox('Location Required', 'Please enter your location before submitting the order.');
    }
});

// Event listener for Back from Final Details button (returns to main app)
backFromFinalBtn.addEventListener('click', () => {
    resetInputsAndState();
    transitionToSection(finalOrderDetails, mainApp);
});

// Initial update of totals when the page loads (ensures spans are initialized to 0)
// This is important even if sections are hidden, to ensure correct initial display when they become visible.
document.addEventListener('DOMContentLoaded', () => {
    updateTotals('summer');
    updateTotals('winter');
});
