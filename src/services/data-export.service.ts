import APIUrl from '../constants/apiUrl';
import httpClient from '../utils/httpClient';

class DataExportService {
  async exportAllData(): Promise<Blob> {
    const response = await httpClient.get(APIUrl.dataExport.exportAll(), {
      responseType: 'blob',
    });
    return response.data;
  }
}

export default new DataExportService();
