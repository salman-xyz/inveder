const form = document.getElementById('jobPostingForm');
const outputBox = document.getElementById('outputBox');
const copyButton = document.getElementById('copyButton');
const perDayCheckbox = document.getElementById('perDay');
const perHourCheckbox = document.getElementById('perHour');

// Ensure only one checkbox can be checked at a time
perDayCheckbox.addEventListener('change', () => {
  if (perDayCheckbox.checked) {
    perHourCheckbox.checked = false;
  }
});

perHourCheckbox.addEventListener('change', () => {
  if (perHourCheckbox.checked) {
    perDayCheckbox.checked = false;
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const workCategory = workCategoryInput.value.trim();
  const salary = salaryInput.value.trim();
  
  if (!workCategory) {
    alert('Please enter a work category');
    return;
  }
  
  // Add salary information
  let salaryText = '';
  if (salary) {
    const paymentType = perDayCheckbox.checked ? 'per day.' : 
                       perHourCheckbox.checked ? 'per hour.' : '';
    salaryText = `Salary: ${salary}${paymentType ? ` ${paymentType}` : ''}`;
    outputBox.textContent = `${workCategory}. ${salaryText}`;
  } else {
    salaryText = 'Salary: Negotiable.';
    outputBox.textContent = `${workCategory}. ${salaryText}`;
  }
});

copyButton.addEventListener('click', async () => {
  const output = outputBox.textContent;
  
  if (output) {
    try {
      await navigator.clipboard.writeText(output);
      
      // Clear form and output
      form.reset();
      outputBox.textContent = '';
      
      // Remove suggestions
      suggestionsContainer.classList.remove('show');
      
    } catch (err) {
      alert('Failed to copy text to clipboard');
    }
  }
});