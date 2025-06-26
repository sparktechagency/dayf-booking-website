const sectionScrollWithOffset = (sectionId, offset = 100) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = offset; // adjust this offset as needed
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

export default sectionScrollWithOffset;
