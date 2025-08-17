const jobSuggestions = [
	"Looking for a job as a driver",
	"Hiring workers at construction site №1, on Vespucci Boulevard",
	"Hiring workers at construction site №2, on Calais Avenue",
	"Hiring workers at construction site №3, in Pillbox Hill",
	"Hiring workers at construction site №4, in Mirror Park",
	"Looking for a job",
	"Hiring workers at construction site",
	"Looking for work as a trucker with 3 years of experience",
	"Looking for work as a driver with 2 years of experience",
	"Hiring a driver with 3 years of experience",
	"Hiring a gardener",
	"Hiring a bodyguard",
	"Hiring a firefighter",
	"Pilot looking for a job",
	"Lawyer looking for work",
	"Hiring professional dancers",
	"Hiring workers for solar panel plantation",
	"Hiring workers for collector job",
	"Looking for a job to plant a solar panel",
	"Looking for a job at the construction site",
	"Looking for work as a lawyer",
	"Hiring a DJ",
	"Hiring a personal assistant",
	"Hiring a DJ",
	"Hiring a bodyguard",
];

const workCategoryInput = document.getElementById("workCategory");
const suggestionsContainer = document.getElementById("suggestions");

function showSuggestions(searchText) {
	const matchingSuggestions = jobSuggestions.filter((suggestion) =>
		suggestion.toLowerCase().includes(searchText.toLowerCase())
	);

	suggestionsContainer.innerHTML = "";

	if (searchText && matchingSuggestions.length > 0) {
		matchingSuggestions.forEach((suggestion) => {
			const div = document.createElement("div");
			div.className = "suggestion-item";
			div.textContent = suggestion;
			div.addEventListener("click", () => {
				workCategoryInput.value = suggestion;
				suggestionsContainer.classList.remove("show");
			});
			suggestionsContainer.appendChild(div);
		});
		suggestionsContainer.classList.add("show");
	} else {
		suggestionsContainer.classList.remove("show");
	}
}

workCategoryInput.addEventListener("input", (e) => {
	showSuggestions(e.target.value);
});

document.addEventListener("click", (e) => {
	if (
		!workCategoryInput.contains(e.target) &&
		!suggestionsContainer.contains(e.target)
	) {
		suggestionsContainer.classList.remove("show");
	}
});
