'use client';

import { IPost } from '@/types';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

interface Props {
  post: IPost;
}

function CommentSytem({ post }: Props) {
  const { resolvedTheme } = useTheme();
  return (
    <Giscus
      repo='cakegod/Blog-API'
      repoId='R_kgDOINOBJQ'
      category='General'
      categoryId='DIC_kwDOINOBJc4CSHm3'
      mapping='specific'
      term={post.title}
      strict='0'
      reactions-enabled='1'
      emitMetadata='0'
      inputPosition='top'
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      lang='en'
      loading='lazy'
    />
  );
}

export default CommentSytem;
