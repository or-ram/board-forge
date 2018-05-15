import { Application } from 'spectron';
import path from 'path';

const baseDir = path.join(__dirname, '..');

const app = new Application({
  path: path.join(baseDir, 'node_modules', '.bin', 'electron'),
  args: [ baseDir ],
});

describe('Basic app test', () => {
  beforeEach(() => app.start());

  afterEach(() => app.stop());

  test('Is opened', async () => {
    await app.client.waitUntilWindowLoaded();

    const count = await app.client.getWindowCount();

    expect(count).toEqual(1);
  });

  test('Window contains appRoot div', async () => {
    await app.client.waitUntilWindowLoaded();

    const isVisible = await app.client.isExisting('#appRoot');

    expect(isVisible).toBeTruthy();
  });
});
