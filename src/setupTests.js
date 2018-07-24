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

/*
class StorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new StorageMock();
global.sessionStorage = new LocalStorageMock();
*/
