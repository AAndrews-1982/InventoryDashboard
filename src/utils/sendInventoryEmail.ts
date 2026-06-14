export const sendInventoryEmail = async (
  pdfBase64: string,
  timestamp: string,
  teamLeadName: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  const WEBHOOK_URL =
    'https://script.google.com/macros/s/AKfycbwDURvlzmmr03gRpuuqV7u9KYqEors-bpTl9yDTZYXpmV_avBQRwKb2906xW0-qdZitWQ/exec'

  const cleanTimestamp = timestamp.replace(/[/:]/g, '-');
  const cleanTeamLeadName = teamLeadName.replace(/\s+/g, '-');

  console.log('Sending Report:', {
  timestamp,
  teamLeadName,
});

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      pdfBase64,
      timestamp,
      teamLeadName,
      fileName: `InventoryReport-${cleanTeamLeadName}-${cleanTimestamp}.pdf`,
    }),
  });

  const result = await response.json();
  console.log('Webhook Response:', result);

  if (!result.success) {
    throw new Error(
      result.message || 'Failed to email inventory report.'
    );
  }

  return result;
};