// Business types data
const businessTypes = [
	// Basic business types
	"Ammunition Store",
	"ATM",
	"Bar",
	"Burger Shop",
	"Chip Tuning",
	"Car Wash",
	"Car Sharing",
	"Clothing Shop",
	"Cowshed",
	"Electric Charging Station",
	"Farm",
	"Fight Club",
	"Freight Train",
	"Gas Station",
	"Grand Elite Clothing Shop",
	"Hair Salon",
	"Jewellery Store",
	"Juice Shop",
	"Oil Well",
	"Parking",
	"Pet Shop",
	"Plantation",
	"Service Station",
	"State Object",
	"Tattoo Studio",
	"Taxi Company",
	"Warehouse",
	"24/7 Store",

	// Plantation varieties
	"10-Bed Plantation",
	"15-Bed Plantation",
	"20-Bed Plantation",
	"10-Bed Cabbage Plantation",
	"10-Bed Pineapple Plantation",
	"10-Bed Pumpkin Plantation",
	"10-Bed Mandarin Plantation",
	"15-Bed Cabbage Plantation",
	"15-Bed Pineapple Plantation",
	"15-Bed Pumpkin Plantation",
	"15-Bed Mandarin Plantation",
	"20-Bed Cabbage Plantation",
	"20-Bed Pineapple Plantation",
	"20-Bed Pumpkin Plantation",
	"20-Bed Mandarin Plantation",
	"Cabbage Plantation",
	"Pineapple Plantation",
	"Pumpkin Plantation",
	"Mandarin Plantation",
	"Cowshed",
];

// DOM Elements
const form = document.getElementById("businessForm");
const toggleBtns = document.querySelectorAll(".toggle-btn");
const isPrivateCheckbox = document.getElementById("isPrivate");
const isFamilyCheckbox = document.getElementById("isFamily");
const businessTypeInput = document.getElementById("businessType");
const suggestionsDiv = document.getElementById("suggestions");
const businessNumberInput = document.getElementById("businessNumber");
const priceInput = document.getElementById("price");
const priceLabel = document.getElementById("priceLabel");
const outputDiv = document.getElementById("output");
const copyBtn = document.querySelector(".copy-btn");

const locationOptions = [
	"in Vespucci Canals",
	"in Vinewood Hills",
	"in Rancho",
	"in Sandy Shores",
	"in Vanilla Unicorn Bar",
	"in Vespucci Canals",
	"in Vinewood Hills",
	"in Richman",
	"in Rockford Hills",
	"in Paleto Bay",
	"in Pillbox Hill",
	"in West Vinewood",
	"in Bahama Mamas",
	"in Banham Canyon",
	"in Cayo Perico Island",
	"in ghetto",
	"in Eclipse Tower",
	"in Del Perro",
	"in Bahama Mamas",
	"in Banham Canyon",
	"in Downtown Vinewood",
	"in El Burro Heights",
	"in city",
	"in Mirror Park",
	"near beach",
	"near beach market",
	"near stadium",
	"near fire station",
	"near train station",
	"near post office",
	"near airport",
	"near mall",
	"near Stock Exchange",
	"near Residential complex",
	"near Auto Salon",
	"near Fight Club",
	"near Hospital",
	"near Sandy Hospital",
	"near Diamond Bar",
	"near LifeInvader",
];

const locationInput = document.getElementById("location");
const locationSuggestionsDiv = document.getElementById("locationSuggestions");

let currentTransactionType = "buy";

// Event Listeners
toggleBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		toggleBtns.forEach((b) => b.classList.remove("active"));
		btn.classList.add("active");
		currentTransactionType = btn.dataset.type;
		priceLabel.textContent = `${
			currentTransactionType === "buy" ? "Budget" : "Price"
		} (Optional)`;
	});
});

// Disable right-click context menu
document.addEventListener("contextmenu", function (e) {
	e.preventDefault();
});

// Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, etc.
document.addEventListener("keydown", function (e) {
	// F12
	if (e.key === "F12") {
		e.preventDefault();
	}
	// Ctrl+Shift+I/J/C/U
	if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) {
		e.preventDefault();
	}
	// Ctrl+U
	if (e.ctrlKey && e.key === "u") {
		e.preventDefault();
	}
});

// Checkbox mutual exclusivity
isPrivateCheckbox.addEventListener("change", () => {
	if (isPrivateCheckbox.checked) {
		isFamilyCheckbox.checked = false;
	}
});

isFamilyCheckbox.addEventListener("change", () => {
	if (isFamilyCheckbox.checked) {
		isPrivateCheckbox.checked = false;
	}
});

// Business type search functionality
businessTypeInput.addEventListener("input", () => {
	const searchTerm = businessTypeInput.value.toLowerCase();
	const filteredTypes = businessTypes.filter((type) =>
		type.toLowerCase().includes(searchTerm)
	);

	suggestionsDiv.innerHTML = "";

	if (searchTerm && filteredTypes.length > 0) {
		suggestionsDiv.style.display = "block";
		filteredTypes.forEach((type) => {
			const div = document.createElement("div");
			div.className = "suggestion-item";
			div.textContent = type;
			div.addEventListener("click", () => {
				businessTypeInput.value = type;
				suggestionsDiv.style.display = "none";
			});
			suggestionsDiv.appendChild(div);
		});
	} else {
		suggestionsDiv.style.display = "none";
	}
});

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
	if (!businessTypeInput.contains(e.target)) {
		suggestionsDiv.style.display = "none";
	}
});

// Location autocomplete
locationInput.addEventListener("input", () => {
	const searchTerm = locationInput.value.toLowerCase();
	const filteredLocations = locationOptions.filter((loc) =>
		loc.toLowerCase().includes(searchTerm)
	);

	locationSuggestionsDiv.innerHTML = "";

	if (searchTerm && filteredLocations.length > 0) {
		locationSuggestionsDiv.style.display = "block";
		filteredLocations.forEach((loc) => {
			const div = document.createElement("div");
			div.className = "suggestion-item";
			div.textContent = loc;
			div.addEventListener("click", () => {
				locationInput.value = loc;
				locationSuggestionsDiv.style.display = "none";
			});
			locationSuggestionsDiv.appendChild(div);
		});
	} else {
		locationSuggestionsDiv.style.display = "none";
	}
});

// Hide location suggestions when clicking outside
document.addEventListener("click", (e) => {
	if (!locationInput.contains(e.target)) {
		locationSuggestionsDiv.style.display = "none";
	}
});

// Format price function
function formatPrice(price) {
	if (!price) return "Negotiable.";

	price = price.toLowerCase().trim();

	if (price.endsWith("k")) {
		const value = parseFloat(price.slice(0, -1));
		return `$${value.toFixed(3)}`.replace(",", ".");
	}

	if (price.endsWith("m")) {
		const value = parseFloat(price.slice(0, -1));
		return `$${value} Million.`;
	}

	if (price.endsWith("b")) {
		const value = parseFloat(price.slice(0, -1));
		return `$${value} Billion.`;
	}

	return `$${price}`;
}

// Generate output function
function generateOutput() {
	const action = currentTransactionType === "buy" ? "Buying" : "Selling";

	let businessText = "";
	if (isPrivateCheckbox.checked) {
		businessText = "a private business";
	} else if (isFamilyCheckbox.checked) {
		businessText = "a family business";
	} else {
		businessText =
			businessTypeInput.value +
			(businessNumberInput.value
				? ` №${businessNumberInput.value}`
				: " business");
	}

	let output = `${action} ${businessText}`;
	if (locationInput.value) {
		output += ` ${locationInput.value}`;
	}

	const priceText =
		currentTransactionType === "buy"
			? `Budget: ${formatPrice(priceInput.value)}`
			: `Price: ${formatPrice(priceInput.value)}`;

	return `${output}. ${priceText}`;
}

// Form submission
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const generatedOutput = generateOutput();
	outputDiv.innerHTML = generatedOutput;
	outputDiv.classList.add("fade-in");
	copyBtn.disabled = false;
});

// Copy functionality
copyBtn.addEventListener("click", () => {
	const output = outputDiv.textContent;
	if (!output || output.includes("Output will appear here")) return;

	navigator.clipboard
		.writeText(output)
		.then(() => {
			// Reset form
			form.reset();
			toggleBtns[0].click(); // Reset to 'buy'
			outputDiv.innerHTML =
				'<span class="placeholder">Output will appear here after submission</span>';
			copyBtn.disabled = true;
		})
		.catch((err) => {
			console.error("Failed to copy text: ", err);
		});
});
