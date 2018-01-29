/* eslint-disable prefer-template */
/* eslint-disable jsx-quotes */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { configure, storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { create } from 'jss'
import preset from 'jss-preset-default'
import JssProvider from 'react-jss/lib/JssProvider'
import { createGenerateClassName } from 'material-ui/styles'
import Reboot from 'material-ui/Reboot'

const generateClassName = createGenerateClassName()
const jss = create(preset())

const Render = ({ children }) => (
  <div>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <Reboot>
        { children }
      </Reboot>
    </JssProvider>
  </div>
)

const components = require.context(
  '../src/components',
  true,
  /(.*)\/index\.js$/
)

const componentsPreview = require.context(
  '../src/components',
  true,
  /(.*)\/index\.preview\.js$/
)

// const coreComponents = require.context(
//   '../node_modules/front-core/src/components',
//   true,
//   /(.*)\/index\.js$/
// )

// const coreComponentsPreview = require.context(
//   '../node_modules/front-core/src/components',
//   true,
//   /(.*)\/index\.preview\.js$/
// )

const getData = (prefix, comps, pres) => {
  const list = comps.keys()
    .map(f => [f, f.slice(2, -9)])
  const preList = pres.keys()
    .map(f => [f, f.slice(2, -17)])
  return list
    .map(([file, folder]) => {
      const pre = preList.find(([, f]) => f === folder)
      return {
        component: comps(file),
        folder,
        name: prefix + folder,
        preview: pre ? pres(pre[0]) : null,
      }
    })
    .filter(({ folder }) => folder)
}

const datas = []
//  .concat(getData('core/', coreComponents, coreComponentsPreview))
  .concat(getData('app/', components, componentsPreview))

const loadStories = () => {
  datas
    .forEach(({ component, name, preview }) => {
      const st = storiesOf(name, module)
      const Story = component.default
      const wrap = (getProps, ix) => {
        // eslint-disable-next-line
        const { _preview, ...props } = getProps({ action })
        return (
          <Render key={ix}>
            <Story {...props} />
          </Render>
        )
      }

      if (preview) {
        const data = preview.default

        if (preview.State) {
          st.add('State', () => (
            <div className='storybook-all-wrapper'>
              <Render>
                <preview.State Target={Story} action={action} />
              </Render>
            </div>
          ))
        }

        st.add('all', () => (
          <div className='storybook-all-wrapper'>
            { data.filter(p => !p({ action })._skip).map(wrap) }
          </div>
        ))

        data.forEach((getProps, ix) => {
          st.add(`${ix}: ${getProps({ action })._preview}`, () => wrap(getProps, ix))
        })
      } else {
        st.add('empty', () => (<Render> <Story /> </Render>))
      }
    })
}

configure(loadStories, module)
