import { PostProps } from '@/types';
import { composeDate } from '@/util/composeDate';

interface Props {
  post: PostProps;
}

function ArticleHeader({ post }: Props) {
  return (
    <div>
      <h2 className='m-0 text-violet-700 dark:text-violet-400'>{post.title}</h2>
      <p className='font-medium'>{composeDate(post.date, post.readTime)}</p>
    </div>
  );
}

export default ArticleHeader;
