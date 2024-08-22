// src/MyCustomUploadAdapter.ts
import { apiUrl } from '../../../../../config';
import requestApi from '../../../../../helper/api';

// src/MyCustomUploadAdapter.ts

export class MyCustomUploadAdapter {
  private loader: any;
  constructor(loader: any) {
    console.log(loader);

    this.loader = loader;
  }

  public upload(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loader.file
        .then((file: File) => {
          console.log('File to upload:', file); // Log file details
          const formData = new FormData();
          formData.append('files', file);

          requestApi('upload/files', 'POST', formData, 'multipart/form-data')
            .then((response) => {
              console.log('Upload response:', response); // Log response from server
              resolve({ default: `${apiUrl}uploads/${response.data.filenames[0]}`,  }); // Adjust according to response structure
            })
            .catch((error) => {
              console.error('Upload error:', error); // Log error if upload fails
              reject(error);
            });
        })
        .catch((error: any) => {
          console.error('File handling error:', error); // Log error if file handling fails
          reject(error);
        });
    });
  }

  public abort(): void {
    // Handle abort
  }
}


export default function MyCustomUploadAdapterPlugin(editor: any): void {
  console.log('MyCustomUploadAdapterPlugin is called'); // Log to check if plugin function is executed
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    console.log('Create Upload Adapter is called'); // Log to check if upload adapter is being created
    return new MyCustomUploadAdapter(loader);
  };
}