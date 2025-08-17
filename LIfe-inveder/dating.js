const SEARCH_INTENT_OPTIONS = [
  'Looking for a specific person.',
  'Looking for a family.',
  'Looking for family members.',
  'Looking for family friends.',
  'Looking for friends.',
  'Looking for a friend.',
  'Looking for a wife.',
  'Looking for a husband.',
  'Looking for a girlfriend.',
  'Looking for a boyfriend.',
  'Looking for a date.'
];

// DOM Elements
const dropdownButton = document.getElementById('dropdownButton');
const dropdownMenu = document.getElementById('dropdownMenu');
const chevronIcon = document.getElementById('chevronIcon');
const selectedOptionText = document.getElementById('selectedOptionText');
const fullNameInput = document.getElementById('fullNameInput');
const fullNameField = document.getElementById('fullName');
const resultText = document.getElementById('resultText');
const copyButton = document.getElementById('copyButton');

let selectedOption = '';
let isOpen = false;

// Filter options based on search input
function filterOptions(searchText) {
  const searchLower = searchText.toLowerCase();
  return SEARCH_INTENT_OPTIONS.filter(option => 
    option.toLowerCase().includes(searchLower)
  );
}

// Update dropdown menu with filtered options
function updateDropdownOptions(searchText = '') {
  dropdownMenu.innerHTML = '';
  const filteredOptions = searchText ? filterOptions(searchText) : SEARCH_INTENT_OPTIONS;
  
  filteredOptions.forEach(option => {
    const li = document.createElement('li');
    li.className = 'dropdown-item cursor-pointer';
    li.role = 'option';
    li.textContent = option;
    li.onclick = () => handleOptionSelect(option);
    dropdownMenu.appendChild(li);
  });
}

// Toggle dropdown
function toggleDropdown() {
  isOpen = !isOpen;
  dropdownMenu.style.display = isOpen ? 'block' : 'none';
  chevronIcon.style.transform = isOpen ? 'rotate(180deg)' : '';
  
  if (isOpen) {
    selectedOptionText.contentEditable = true;
    selectedOptionText.focus();
    if (selectedOptionText.textContent === 'Select a dating option...') {
      selectedOptionText.textContent = '';
    }
  } else {
    selectedOptionText.contentEditable = false;
    if (!selectedOption) {
      selectedOptionText.textContent = 'Select a dating option...';
      selectedOptionText.className = 'text-muted';
    }
  }
}

// Handle option selection
function handleOptionSelect(option) {
  selectedOption = option;
  selectedOptionText.textContent = option;
  selectedOptionText.className = 'text-dark';
  toggleDropdown();
  
  // Show/hide full name input
  fullNameInput.style.display = option === 'Looking for a specific person.' ? 'block' : 'none';
  fullNameField.value = '';
  
  updateResult();
}

// Update result text and copy button
function updateResult() {
  let finalText = selectedOption;
  if (selectedOption === 'Looking for a specific person.' && fullNameField.value.trim()) {
    finalText = `Looking for ${fullNameField.value.trim()}.`;
  }
  resultText.textContent = finalText || 'No selection yet';
  copyButton.disabled = !finalText;
  copyButton.className = `btn w-100 mt-3 d-flex align-items-center justify-content-center gap-2 ${finalText ? 'btn-dark' : 'btn-disabled'}`;
}

// Handle copy button
function handleCopy() {
  navigator.clipboard.writeText(resultText.textContent)
    .then(() => {
      const copyIcon = copyButton.querySelector('svg');
      copyIcon.style.stroke = '#22c55e';
      copyButton.querySelector('span').textContent = 'Copied!';
      
      // Reset form
      selectedOption = '';
      selectedOptionText.textContent = 'Select a dating option...';
      selectedOptionText.className = 'text-muted';
      fullNameInput.style.display = 'none';
      fullNameField.value = '';
      resultText.textContent = 'No selection yet';
      copyButton.disabled = true;
      copyButton.className = 'btn w-100 mt-3 d-flex align-items-center justify-content-center gap-2 btn-disabled';
      
      // Reset copy button after delay
      setTimeout(() => {
        copyIcon.style.stroke = '';
        copyButton.querySelector('span').textContent = 'Copy';
      }, 800);
    })
    .catch(err => console.error('Failed to copy text: ', err));
}

// Event listeners
dropdownButton.addEventListener('click', toggleDropdown);
fullNameField.addEventListener('input', updateResult);
copyButton.addEventListener('click', handleCopy);

// Handle search input
selectedOptionText.addEventListener('input', (e) => {
  if (isOpen) {
    updateDropdownOptions(e.target.textContent);
  }
});

// Handle keyboard events for dropdown
selectedOptionText.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const firstOption = dropdownMenu.querySelector('.dropdown-item');
    if (firstOption) {
      handleOptionSelect(firstOption.textContent);
    }
  }
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (isOpen && !dropdownButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
    toggleDropdown();
  }
});

// Wait for DOM to load completely
document.addEventListener('DOMContentLoaded', function() {
  // Initial dropdown population
  updateDropdownOptions();
  console.log('Dating page loaded successfully');
});
