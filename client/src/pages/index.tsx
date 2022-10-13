import AboutMe from '@/components/AboutMe';
import Header from '@/components/Header';
import Posts from '@/components/Posts';
import { IPost } from '@/types';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [postsData, setPostData] = useState<IPost[]>();

  const callAPI = async () => {};

  useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await fetch(`http://localhost:3000/blog`);
        const data = await res.json();
        console.log(data);
        setPostData(data);
      } catch (err) {
        console.log(err);
      }
    };
    callAPI();
  }, []);

  return (
    <>
      
      <AboutMe></AboutMe>
      <main>
        <Posts postsData={postsData} />
      </main>
    </>
  );
}
