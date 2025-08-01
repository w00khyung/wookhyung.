import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import rehypePresetMinify from 'rehype-preset-minify';
import rehypePrismPlus from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'date of the post',
      required: true,
    },
    summary: {
      type: 'string',
      description: 'summary of the post',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: false,
    },
    draft: {
      type: 'boolean',
      description: 'draft of the post',
      required: false,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/blog/${post._raw.flattenedPath}`,
    },
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath,
    },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrismPlus,
        {
          defaultLanguage: 'js',
          ignoreMissing: true,
          showLineNumbers: true,
        },
      ],
      rehypePresetMinify,
    ],
  },
});
