import React from 'react';

const useTitle = (title) => {
  document.title = `proFast | ${title}`;
};

export default useTitle;