const localStorageMock = {
  getItem: jest.fn(() => {
    data: {
    }
  }),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;
global.sessionStorage = localStorageMock;
