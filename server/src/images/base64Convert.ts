import { Buffer } from 'buffer';
export function bufferToBase64(buffer: Buffer): string {
    return buffer.toString('base64');
  }