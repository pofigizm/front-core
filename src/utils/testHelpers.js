import React from 'react'
import renderer from 'react-test-renderer'
import { JssProvider, SheetsRegistry } from 'react-jss'

global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0)
}
Date.now = jest.fn(() => 1000000000000)
Math.random = jest.fn(() => 0.1)
const genName = (rule, sheet) => {
  const m = (sheet && sheet.options.name) || 'm'
  return `${m}-${rule.key}`
}

const defaultFn = Component => (name, props) => {
  describe(`snapshot: ${name}`, () => {
    const sheets = new SheetsRegistry()
    const snap = renderer.create(
      <JssProvider generateClassName={genName} registry={sheets}>
        <Component {...props} />
      </JssProvider>
    )
    it('css', () => {
      expect(sheets.toString()).toMatchSnapshot()
    })
    it('html', () => {
      expect(snap.toJSON()).toMatchSnapshot()
    })
  })
}
const action = () => Function.prototype

const previewRunner = (dir, fn) => {
  jest.mock('react-dom')

  // https://github.com/facebook/react/issues/11565
  const ReactDOM = require('react-dom')
  ReactDOM.createPortal = node => node

  let previewDataLoaded
  try {
    previewDataLoaded = require(`${dir}/index.preview.js`).default
  } catch (_) {
    previewDataLoaded = [() => ({
      _preview: 'empty',
    })]
  }
  const previewData = [
    () => ({
      _preview: 'className',
      className: 'test-class',
    }),
    ...previewDataLoaded,
  ]

  let runner
  if (fn) {
    runner = fn
  } else {
    runner = defaultFn(require(dir).default)
  }

  previewData.forEach((getter) => {
    const { _preview, ...props } = getter({ action })
    runner(_preview, props)
  })
}

const root = `${__ROOT__.replace(/\//g, '-')}-`
const reducerRunner = ({ list, reducer, mock }) => {
  const all = ['fc-not-exist-type'].concat(list)
  let state
  all.forEach((type) => {
    const clientType = type.replace(root, '')
    test(`snapshot: ${clientType}`, () => {
      const payload = mock[clientType] || {}
      state = reducer(state, { ...payload, type })
      expect(state).toMatchSnapshot()
    })
  })
}

export {
  previewRunner,
  reducerRunner,
}
