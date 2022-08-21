const intersectionObserverMock = () => ({
  observe: () => null,
  unobserve: () => null,
});
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock);

// https://stackoverflow.com/questions/58884397/jest-mock-intersectionobserver
// https://stackoverflow.com/questions/57008341/jest-testing-react-component-with-react-intersection-observer
