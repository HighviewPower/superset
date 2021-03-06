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
import React from 'react';
import PropTypes from 'prop-types';

import BootstrapSliderWrapper from 'src/components/BootstrapSliderWrapper';
import ControlHeader from 'src/explore/components/ControlHeader';

const propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const defaultProps = {
  onChange: () => {},
};

export default function SliderControl(props) {
  // This wouldn't be necessary but might as well
  return (
    <div>
      <ControlHeader {...props} />
      <BootstrapSliderWrapper
        {...props}
        change={obj => {
          props.onChange(obj.target.value);
        }}
      />
    </div>
  );
}

SliderControl.propTypes = propTypes;
SliderControl.defaultProps = defaultProps;
