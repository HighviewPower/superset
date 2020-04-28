/**
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
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// helper functions for select controls

export type Formattable = string | number;

export type Formatted = [Formattable, string];

/** Turns an array of string/number options into options for a select input */
export function formatSelectOptions(options: Formattable[]): Formatted[] {
  return options.map(opt => [opt, opt.toString()]);
}

/**
 * outputs array of arrays
 * formatSelectOptionsForRange(1, 5)
 * returns [[1,'1'], [2,'2'], [3,'3'], [4,'4'], [5,'5']]
 */
export function formatSelectOptionsForRange(start: number, end: number) {
  const options: Formatted[] = [];
  for (let i = start; i <= end; i++) {
    options.push([i, i.toString()]);
  }
  return options;
}
