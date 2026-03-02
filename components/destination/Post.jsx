export default function Post({ postContent }) {
  return (
    <section className="w-full py-4 px-4">
      <article
        className="post-content"
        dangerouslySetInnerHTML={{ __html: postContent }}
      ></article>
    </section>
  );
}
