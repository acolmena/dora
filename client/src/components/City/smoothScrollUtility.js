export const smoothScrollTo = (elementId) => {
    const element = document.querySelector(elementId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  