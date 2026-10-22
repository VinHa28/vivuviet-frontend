export default function JsonLd({ data }) {
  // thay "<" để chuỗi trong dữ liệu không thể đóng thẻ <script> sớm
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}