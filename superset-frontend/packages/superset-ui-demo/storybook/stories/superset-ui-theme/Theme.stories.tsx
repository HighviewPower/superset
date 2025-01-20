/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { supersetTheme } from '@superset-ui/core';

const colorTypes = ['primary', 'error', 'warning', 'success', 'info'];

const AntDFunctionalColors = ({ antdTheme }) => {
  const { antd } = supersetTheme;

  // Define color types and variations dynamically
  const variations = [
    'base',
    'active',
    'textActive',
    'text',
    'textHover',
    'hover',
    'borderHover',
    'border',
    'bgHover',
    'bg',
  ];

  const { colors } = supersetTheme;
  return (
    <table
      style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left' }}
    >
      <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Type</th>
          {variations.map(variation => (
            <th
              key={variation}
              style={{ border: '1px solid #ddd', padding: '8px' }}
            >
              {variation}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...colorTypes, 'gray'].map(type => {
          const typeKey = `color${type}`;
          return (
            <tr key={type}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <strong>{type}</strong>
              </td>
              {variations.map(variation => {
                const color = colors[type][variation];
                return (
                  <td
                    key={variation}
                    style={{
                      border: '1px solid #ddd',
                      padding: '8px',
                      backgroundColor: color || 'transparent',
                      color: [`color${type}${variation}`],
                    }}
                  >
                    {color ? <code>{color}</code> : '-'}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export const ThemeColors = () => {
  const { colors } = supersetTheme;

  // Define tones to be displayed in columns
  const tones = [
    'dark5',
    'dark4',
    'dark3',
    'dark1',
    'base',
    'light1',
    'light2',
    'light3',
    'light4',
    'light5',
  ];
  return (
    <div>
      <h1>Theme Colors</h1>
      <h2>Legacy Theme Colors</h2>
      <table
        style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left' }}
      >
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>
              Category
            </th>
            {tones.map(tone => (
              <th
                key={tone}
                style={{ border: '1px solid #ddd', padding: '8px' }}
              >
                {tone}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...colorTypes, 'grayscale'].map(category => (
            <tr key={category}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <strong>{category}</strong>
              </td>
              {tones.map(tone => {
                const color = colors[category][tone];
                return (
                  <td
                    key={tone}
                    style={{
                      border: '1px solid #ddd',
                      padding: '8px',
                      backgroundColor: color || '#fff',
                    }}
                  >
                    {color ? <code>{color}</code> : '-'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Ant Design Theme Colors</h2>
      <h3>Functional Colors</h3>
      <AntDFunctionalColors antdTheme={supersetTheme.antd} />
      <h2>The supersetTheme object</h2>
      <code>
        <pre>{JSON.stringify(supersetTheme, null, 2)}</pre>
      </code>
    </div>
  );
};
/*
 * */
export default {
  title: 'Core Packages/@superset-ui-theme',
};

export const Default = () => <ThemeColors />;
