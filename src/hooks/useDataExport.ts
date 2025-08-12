import dataExportService from '@/services/data-export.service';
import { format } from 'date-fns';
import { useState } from 'react';

const useDataExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportAllData = async () => {
    try {
      setIsExporting(true);
      setError(null);
      const blob = await dataExportService.exportAllData();

      // Create a download link and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const dateStr = format(new Date(), 'yyyyMMdd');
      link.setAttribute('download', `OS_DB_${dateStr}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportAllData,
    isExporting,
    error,
  };
};

export default useDataExport;
