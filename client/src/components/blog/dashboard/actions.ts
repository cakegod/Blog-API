'use server';

export async function handlePublishToggle(formData: FormData, hey) {
  console.log(Object.fromEntries(formData));
  console.log(hey);
  // e.preventDefault();
  // await fetch(`http://localhost:3000/posts/${slug}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZha2VAZmFrZS5jb20iLCJhZG1pbiI6ZmFsc2UsImlkIjoiNjU2M2M0NTEwYmE4MzU3Mzk5ZDYwY2RmIiwiaWF0IjoxNzAxMTI2MzM2fQ.LvNCDjsKPpTk3jNLAPjUvtBnCB-F0jksL-uHz9-otzw`,
  //   },
  //   body: JSON.stringify({
  //     status,
  //   }),
  // });
}
