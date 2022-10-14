import AboutMe from '@/components/AboutMe';
import Header from '@/components/Header';
import Posts from '@/components/Posts';
import { IPost } from '@/types';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [postsData, setPostData] = useState<IPost[]>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`http://localhost:3000/blog`);
        const data = await res.json();
        console.log(data);
        setPostData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <AboutMe></AboutMe>
      <main className='flex flex-col gap-10 grow'>
        <Posts postsData={postsData} />
      </main>
    </>
  );
}
