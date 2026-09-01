import * as fs from 'fs';
import * as path from 'path';

export function loadFixture<T>(fileName: string): T {
  const fixturePath = path.resolve(__dirname, '..', 'fixtures', fileName);
  return JSON.parse(fs.readFileSync(fixturePath, 'utf-8')) as T;
}
