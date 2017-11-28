import React from 'react'
import { configure, storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { MuiThemeProvider, createMuiTheme } from 'src/components/origin'

const theme = createMuiTheme({
  spacing: {
    unit: 8,
  },
})

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
  .concat(getData('core/', components, componentsPreview))

const loadStories = () => {
  datas
    .forEach(({ component, name, preview }) => {
      const st = storiesOf(name, module)
      const Story = component.default
      const wrap = (getProps, ix) => {
        // eslint-disable-next-line
        const { _preview, ...props } = getProps({ action })
        return (
          <div key={ix}>
            <MuiThemeProvider theme={theme}>
              <Story {...props} />
            </MuiThemeProvider>
          </div>
        )
      }

      if (preview) {
        const data = preview.default

        if (preview.State) {
          st.add('State', () => (
            <div className="storybook-all-wrapper">
              <div>
                <MuiThemeProvider theme={theme}>
                  <preview.State Target={Story} action={action} />
                </MuiThemeProvider>
              </div>
            </div>
          ))
        }

        st.add('all', () => (
          <div className="storybook-all-wrapper">
            { data.filter(p => !p({ action })._skip).map(wrap) }
          </div>
        ))

        data.forEach((getProps, ix) => {
          st.add(`${ix}: ${getProps({ action })._preview}`, () => wrap(getProps, ix))
        })
      } else {
        st.add('empty', () => (<div> <Story /> </div>))
      }
    })
}

configure(loadStories, module)
