import { previewRunner } from 'src/utils/testHelpers'

Math.random = jest.fn(() => 0.1)
previewRunner(__dirname)
