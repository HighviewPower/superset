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
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { shallow } from 'enzyme';
import ChartClient from '../../../src/chart/clients/ChartClient';
import ChartDataProvider, {
  ChartDataProviderProps,
} from '../../../src/chart/components/ChartDataProvider';
import { bigNumberFormData } from '../fixtures/formData';

// Note: the mock implementation of these function directly affects the expected results below
const defaultMockLoadFormData = jest.fn(({ formData }: { formData: unknown }) =>
  Promise.resolve(formData),
);

type MockLoadFormData =
  | typeof defaultMockLoadFormData
  | jest.Mock<Promise<unknown>, unknown[]>;

let mockLoadFormData: MockLoadFormData = defaultMockLoadFormData;

function createPromise<T>(input: T) {
  return Promise.resolve(input);
}

function createArrayPromise<T>(input: T) {
  return Promise.resolve([input]);
}

const mockLoadDatasource = jest.fn<Promise<unknown>, unknown[]>(createPromise);
const mockLoadQueryData = jest.fn<Promise<unknown>, unknown[]>(
  createArrayPromise,
);

const actual = jest.requireActual('../../../src/chart/clients/ChartClient');
// ChartClient is now a mock
jest.spyOn(actual, 'default').mockImplementation(() => ({
  loadDatasource: mockLoadDatasource,
  loadFormData: mockLoadFormData,
  loadQueryData: mockLoadQueryData,
}));

const ChartClientMock = ChartClient as jest.Mock<ChartClient>;

describe('ChartDataProvider', () => {
  beforeEach(() => {
    ChartClientMock.mockClear();

    mockLoadFormData = defaultMockLoadFormData;
    mockLoadFormData.mockClear();
    mockLoadDatasource.mockClear();
    mockLoadQueryData.mockClear();
  });

  const props: ChartDataProviderProps = {
    formData: { ...bigNumberFormData },
    children: () => <div />,
  };

  function setup(overrideProps?: Partial<ChartDataProviderProps>) {
    return shallow(<ChartDataProvider {...props} {...overrideProps} />);
  }

  it('instantiates a new ChartClient()', () => {
    setup();
    expect(ChartClientMock).toHaveBeenCalledTimes(1);
  });

  describe('ChartClient.loadFormData', () => {
    it('calls method on mount', () => {
      setup();
      expect(mockLoadFormData.mock.calls).toHaveLength(1);
      expect(mockLoadFormData.mock.calls[0][0]).toEqual({
        sliceId: props.sliceId,
        formData: props.formData,
      });
    });

    it('should pass formDataRequestOptions to ChartClient.loadFormData', () => {
      const options = { host: 'override' };
      setup({ formDataRequestOptions: options });
      expect(mockLoadFormData.mock.calls).toHaveLength(1);
      expect(mockLoadFormData.mock.calls[0][1]).toEqual(options);
    });

    it('calls ChartClient.loadFormData when formData or sliceId change', () => {
      const wrapper = setup();
      const newProps = { sliceId: 123, formData: undefined };
      expect(mockLoadFormData.mock.calls).toHaveLength(1);

      wrapper.setProps(newProps);
      expect(mockLoadFormData.mock.calls).toHaveLength(2);
      expect(mockLoadFormData.mock.calls[1][0]).toEqual(newProps);
    });
  });

  describe('ChartClient.loadDatasource', () => {
    it('does not method if loadDatasource is false', () =>
      new Promise(done => {
        expect.assertions(1);
        setup({ loadDatasource: false });
        setTimeout(() => {
          expect(mockLoadDatasource.mock.calls).toHaveLength(0);
          done(undefined);
        }, 0);
      }));

    it('calls method on mount if loadDatasource is true', () =>
      new Promise(done => {
        expect.assertions(2);
        setup({ loadDatasource: true });
        setTimeout(() => {
          expect(mockLoadDatasource.mock.calls).toHaveLength(1);
          expect(mockLoadDatasource.mock.calls[0][0]).toEqual(
            props.formData.datasource,
          );
          done(undefined);
        }, 0);
      }));

    it('should pass datasourceRequestOptions to ChartClient.loadDatasource', () =>
      new Promise(done => {
        expect.assertions(2);
        const options = { host: 'override' };
        setup({ loadDatasource: true, datasourceRequestOptions: options });
        setTimeout(() => {
          expect(mockLoadDatasource.mock.calls).toHaveLength(1);
          expect(mockLoadDatasource.mock.calls[0][1]).toEqual(options);
          done(undefined);
        }, 0);
      }));

    it('calls ChartClient.loadDatasource if loadDatasource is true and formData or sliceId change', () =>
      new Promise(done => {
        expect.assertions(3);
        const newDatasource = 'test';
        const wrapper = setup({ loadDatasource: true });
        wrapper.setProps({
          formData: { datasource: newDatasource },
          sliceId: undefined,
        });

        setTimeout(() => {
          expect(mockLoadDatasource.mock.calls).toHaveLength(2);
          expect(mockLoadDatasource.mock.calls[0][0]).toEqual(
            props.formData.datasource,
          );
          expect(mockLoadDatasource.mock.calls[1][0]).toEqual(newDatasource);
          done(undefined);
        }, 0);
      }));
  });

  describe('ChartClient.loadQueryData', () => {
    it('calls method on mount', () =>
      new Promise(done => {
        expect.assertions(2);
        setup();
        setTimeout(() => {
          expect(mockLoadQueryData.mock.calls).toHaveLength(1);
          expect(mockLoadQueryData.mock.calls[0][0]).toEqual(props.formData);
          done(undefined);
        }, 0);
      }));

    it('should pass queryDataRequestOptions to ChartClient.loadQueryData', () =>
      new Promise(done => {
        expect.assertions(2);
        const options = { host: 'override' };
        setup({ queryRequestOptions: options });
        setTimeout(() => {
          expect(mockLoadQueryData.mock.calls).toHaveLength(1);
          expect(mockLoadQueryData.mock.calls[0][1]).toEqual(options);
          done(undefined);
        }, 0);
      }));

    it('calls ChartClient.loadQueryData when formData or sliceId change', () =>
      new Promise(done => {
        expect.assertions(3);
        const newFormData = { key: 'test' };
        const wrapper = setup();
        wrapper.setProps({ formData: newFormData, sliceId: undefined });

        setTimeout(() => {
          expect(mockLoadQueryData.mock.calls).toHaveLength(2);
          expect(mockLoadQueryData.mock.calls[0][0]).toEqual(props.formData);
          expect(mockLoadQueryData.mock.calls[1][0]).toEqual(newFormData);
          done(undefined);
        }, 0);
      }));
  });

  describe('children', () => {
    it('calls children({ loading: true }) when loading', () => {
      const children = jest.fn<React.ReactNode, unknown[]>();
      setup({ children });

      // during the first tick (before more promises resolve) loading is true
      expect(children.mock.calls).toHaveLength(1);
      expect(children.mock.calls[0][0]).toEqual({ loading: true });
    });

    it('calls children({ payload }) when loaded', () =>
      new Promise(done => {
        expect.assertions(2);
        const children = jest.fn<React.ReactNode, unknown[]>();
        setup({ children, loadDatasource: true });

        setTimeout(() => {
          expect(children.mock.calls).toHaveLength(2);
          expect(children.mock.calls[1][0]).toEqual({
            payload: {
              formData: props.formData,
              datasource: props.formData.datasource,
              queriesData: [props.formData],
            },
          });
          done(undefined);
        }, 0);
      }));

    it('calls children({ error }) upon request error', () =>
      new Promise(done => {
        expect.assertions(2);
        const children = jest.fn<React.ReactNode, unknown[]>();
        mockLoadFormData = jest.fn(() => Promise.reject(new Error('error')));

        setup({ children });

        setTimeout(() => {
          expect(children.mock.calls).toHaveLength(2); // loading + error
          expect(children.mock.calls[1][0]).toEqual({
            error: new Error('error'),
          });
          done(undefined);
        }, 0);
      }));

    it('calls children({ error }) upon JS error', () =>
      new Promise(done => {
        expect.assertions(2);
        const children = jest.fn<React.ReactNode, unknown[]>();

        mockLoadFormData = jest.fn(() => {
          throw new Error('non-async error');
        });

        setup({ children });

        setTimeout(() => {
          expect(children.mock.calls).toHaveLength(2); // loading + error
          expect(children.mock.calls[1][0]).toEqual({
            error: new Error('non-async error'),
          });
          done(undefined);
        }, 0);
      }));
  });

  describe('callbacks', () => {
    it('calls onLoad(payload) when loaded', () =>
      new Promise(done => {
        expect.assertions(2);
        const onLoaded = jest.fn<void, unknown[]>();
        setup({ onLoaded, loadDatasource: true });

        setTimeout(() => {
          expect(onLoaded.mock.calls).toHaveLength(1);
          expect(onLoaded.mock.calls[0][0]).toEqual({
            formData: props.formData,
            datasource: props.formData.datasource,
            queriesData: [props.formData],
          });
          done(undefined);
        }, 0);
      }));

    it('calls onError(error) upon request error', () =>
      new Promise(done => {
        expect.assertions(2);
        const onError = jest.fn<void, unknown[]>();
        mockLoadFormData = jest.fn(() => Promise.reject(new Error('error')));

        setup({ onError });
        setTimeout(() => {
          expect(onError.mock.calls).toHaveLength(1);
          expect(onError.mock.calls[0][0]).toEqual(new Error('error'));
          done(undefined);
        }, 0);
      }));

    it('calls onError(error) upon JS error', () =>
      new Promise(done => {
        expect.assertions(2);
        const onError = jest.fn<void, unknown[]>();

        mockLoadFormData = jest.fn(() => {
          throw new Error('non-async error');
        });

        setup({ onError });
        setTimeout(() => {
          expect(onError.mock.calls).toHaveLength(1);
          expect(onError.mock.calls[0][0]).toEqual(
            new Error('non-async error'),
          );
          done(undefined);
        }, 0);
      }));
  });
});
