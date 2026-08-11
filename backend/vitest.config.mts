import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Resolves @shared/*, @identity/*, @importer/* straight from tsconfig.json
  // `paths` — no per-runner module mapping to keep in sync.
  resolve: { tsconfigPaths: true },
  plugins: [
    // esbuild (vitest's default transform) cannot emit decorator metadata,
    // which nest's DI needs to resolve constructor params by type. swc can.
    swc.vite({
      module: { type: 'es6' },
      jsc: {
        target: 'es2022',
        parser: { syntax: 'typescript', decorators: true },
        transform: { legacyDecorator: true, decoratorMetadata: true },
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./test/setup-env.ts'],
    projects: [
      {
        extends: true,
        test: { name: 'unit', include: ['src/**/*.spec.ts'] },
      },
      {
        extends: true,
        test: { name: 'e2e', include: ['test/**/*.e2e-spec.ts'] },
      },
    ],
    coverage: {
      include: ['src/**/*.ts'],
      reportsDirectory: './coverage',
    },
  },
});
