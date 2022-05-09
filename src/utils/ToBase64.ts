import { RcFile } from 'antd/es/upload';

export type ReaderResult = string | ArrayBuffer | null;

function createBase64Url(readerResult: any) {
  // .replace(/^.*,/, '');
  return readerResult;
}

export function toBase64Url(file: RcFile, base64: (result: string) => void) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    base64(createBase64Url(reader.result));
  };
}
