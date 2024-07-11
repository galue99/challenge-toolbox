const initialState = {
  files: [],
  loading: false,
  error: null
};

const filesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_FILES_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_FILES_SUCCESS':
      return { ...state, loading: false, files: action.payload };
    case 'FETCH_FILES_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default filesReducer;
