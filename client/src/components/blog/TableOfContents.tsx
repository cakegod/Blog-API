import React, { useEffect, useState } from 'react';

function TableOfContents() {
  const [headings, setHeadings] = useState<string[]>();
  useEffect(() => {
    const query = document.querySelectorAll('h3');
    if (query.length) {
      query.forEach((heading) =>
        heading.setAttribute('id', `${heading.textContent}`)
      );
      const createArray = Array.from(query);
      const getHeadings = createArray.map(
        (heading) => heading.textContent
      ) as string[];
      setHeadings(getHeadings);
    }
  }, []);

  return (
    <>
      {headings && (
        <div className='px-4 py-1'>
          <h3 className='uppercase'>Table of Contents</h3>
          <ul>
            {headings.map((heading) => (
              <li className='text-base' key={heading}>
                <a href={`#${heading}`}>{heading}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default TableOfContents;
