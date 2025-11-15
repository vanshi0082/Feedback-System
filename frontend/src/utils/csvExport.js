export const exportToCSV = (feedbacks, filename = 'feedbacks') => {
  if (!feedbacks || feedbacks.length === 0) {
    return;
  }

  // CSV Headers
  const headers = ['Name', 'Email', 'Rating', 'Message', 'Created At'];
  
  // Convert feedbacks to CSV rows
  const rows = feedbacks.map((feedback) => {
    const date = new Date(feedback.createdAt);
    // Format: DD-MM-YYYY HH:MM (wrapped in quotes for Excel compatibility)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedDate = `"${day}-${month}-${year} ${hours}:${minutes}"`;
    
    return [
      feedback.name || '',
      feedback.email || 'N/A',
      feedback.rating || '',
      `"${(feedback.message || '').replace(/"/g, '""')}"`, // Escape quotes in message
      formattedDate,
    ];
  });

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  // Add UTF-8 BOM for Excel compatibility
  const BOM = '\uFEFF';
  const csvWithBOM = BOM + csvContent;

  // Create blob and download
  const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

