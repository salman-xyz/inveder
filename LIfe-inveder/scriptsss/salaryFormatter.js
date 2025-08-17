const salaryInput = document.getElementById('salary');

function formatSalary(value) {
  if (!value) return '';
  
  // Remove any existing formatting
  value = value.replace(/[^0-9k]/gi, '');
  
  // Convert 'k' notation to full number
  if (value.toLowerCase().includes('k')) {
    value = value.toLowerCase().replace('k', '');
    value = parseFloat(value) * 1000;
  }
  
  // Format with dots for thousands separator and add $ sign
  return '$' + new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

salaryInput.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/[^0-9k]/gi, '');
});

salaryInput.addEventListener('blur', (e) => {
  if (e.target.value) {
    e.target.value = formatSalary(e.target.value);
  }
});