import '@testing-library/jest-dom';
import React from 'react';
import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import TableFile from '../../components/TableFile';
import { configureStore } from '@reduxjs/toolkit';
import filesReducer from '../../redux/reducers/filesReducer';

const mockStore = (initialState) => configureStore({
  reducer: {
    files: filesReducer
  },
  preloadedState: {
    files: initialState
  }
});

test('renders component properly', async () => {
  const initialState = {
    files: [{
      file: 'test2.csv',
      lines: [
        { text: 'HRalrvvmdCuHqGCnuMnMA', number: 2, hex: '46f5cd560ed6905a3f1148a7d5a1f0ab\n' }
      ]
    }],
    loading: false,
    error: null
  };

  const store = mockStore(initialState);

  jest.spyOn(axios, 'get').mockResolvedValueOnce({
    data: [{
      file: 'test2.csv',
      lines: [
        { text: 'HRalrvvmdCuHqGCnuMnMA', number: 2, hex: '46f5cd560ed6905a3f1148a7d5a1f0ab\n' }
      ]
    }]
  });

  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  await React.act(async () => {
    render(
      <Provider store={store}>
        <TableFile />
      </Provider>
    );
  });

  await waitFor(() => {
    expect(screen.getByText('File Name')).toBeInTheDocument();
    expect(screen.getByText('test2.csv')).toBeInTheDocument();
    expect(screen.getByText('HRalrvvmdCuHqGCnuMnMA')).toBeInTheDocument();
    expect(screen.getByText('46f5cd560ed6905a3f1148a7d5a1f0ab')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  consoleErrorSpy.mockRestore();

});
