export const ScrollToTop = () => {
  document.body.style.height = 'fit-content';
  window.scrollTo({ top: 0 });
  document.body.style.height = '100%';
};
