// src/components/CkEditorComponent.tsx
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MyCustomUploadAdapter } from './MyCustomUploadAdapter';

interface CkEditorComponentProps {
  onHandleDescription: (value: string) => void;
  description: string;
}

const CkEditorComponent: React.FC<CkEditorComponentProps> = ({ onHandleDescription, description }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={description}
      onChange={(event: any, editor: any) => {
        const data = editor.getData();
        onHandleDescription(data);
      }}
      onReady={editor => {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
          return new MyCustomUploadAdapter(loader);
        };
      }}
      config={{

        image: {
            toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
            upload: {
              types: ['jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff'],
            },
        }
      }}
    />
  );
};

export default CkEditorComponent;