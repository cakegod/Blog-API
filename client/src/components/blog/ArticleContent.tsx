import { IPost } from '@/types';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);

interface Props {
  post: IPost;
}

const customStyle = {
  margin: '0',
};

function ArticleContent({ post }: Props) {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={dracula}
              customStyle={customStyle}
              language={'jsx'}
              wrapLongLines={true}
              PreTag='div'
              // {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
      rehypePlugins={[rehypeRaw]}
    >
      {post.content}
    </ReactMarkdown>
  );
}

export default ArticleContent;
