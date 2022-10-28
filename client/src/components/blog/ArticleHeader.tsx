import { IPost } from '@/types';
import formatDate from '../util/formatData';

interface Props {
  post: IPost;
}

function ArticleHeader({ post }: Props) {
  return (
    <div>
      <h2 className='m-0 text-violet-700 dark:text-violet-400'>{post.title}</h2>
      <p className='font-medium'>{formatDate(post.date, post.readTime)}</p>
    </div>
  );
}

export default ArticleHeader;
