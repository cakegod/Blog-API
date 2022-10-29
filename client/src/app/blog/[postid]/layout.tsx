interface Props {
  children: React.ReactNode;
}

async function Post({ children }: Props) {
  return (
    <div className='py-12'>
      <article className='dark: prose prose-violet max-w-[100%] hover:prose-a:text-pink-500 hover:prose-a:transition-colors prose-pre:p-3 prose-pre:text-lg prose-pre:contrast-[1.05] dark:prose-invert dark:contrast-[.85] dark:prose-a:text-violet-400 dark:hover:prose-a:text-pink-400 dark:prose-pre:contrast-125 md:prose-lg md:prose-pre:text-xl'>
        {children}
      </article>
    </div>
  );
}

export default Post;
