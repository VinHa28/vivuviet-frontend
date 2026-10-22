const keepFirstH1 = (html = "") => {
  const first = html.search(/<h1(\s|>)/i);
  if (first === -1) return html;

  const end = html.search(/<\/h1>/i);
  const head = html.slice(0, end + 5); // đến hết thẻ </h1> đầu tiên
  const rest = html
    .slice(end + 5)
    .replace(/<h1(\s|>)/gi, "<h2$1")
    .replace(/<\/h1>/gi, "</h2>");

  return head + rest;
};

export default function Post({ postContent }) {
  return (
    <section className="w-full py-4 px-4">
      <article
        className="post-content"
        dangerouslySetInnerHTML={{ __html: keepFirstH1(postContent) }}
      ></article>
    </section>
  );
}