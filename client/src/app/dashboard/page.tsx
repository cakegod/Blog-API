"use client"
import { PostProps } from "@/types";
import React, { useEffect } from "react";


async function fetchPosts(): Promise<PostProps> {
  const url = `${process.env.URL}/dashboard/`;
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

async function Dashboard() {
  const posts = await fetchPosts()

  useEffect(() => {
    console.log(posts);;
  
 
  }, [posts]);
  

  return (<div className='py-12'></div>);
}

export default Dashboard;
