const callback = (entries, io) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry.target);
    }
  });
};

const options = {
  // rootMargin: '100px',
  // threshold: 0.5,
};

