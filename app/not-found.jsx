import NotFoundActions from "@/components/ui/NotFoundActions";

export const metadata = {
  title: "Không tìm thấy trang",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center font-primary">
      <p className="font-script-1 text-[62px] leading-none text-secondary">
        Lạc đường rồi
      </p>

      <h1 className="mt-2 text-[84px] font-bold leading-none text-primary md:text-[140px]">
        404
      </h1>

      <div className="my-6 flex items-center gap-3" aria-hidden="true">
        <span className="h-px w-16 bg-secondary" />
        <span className="h-2 w-2 rotate-45 bg-secondary" />
        <span className="h-px w-16 bg-secondary" />
      </div>

      <h2 className="text-2xl font-bold text-text-primary">
        Không tìm thấy trang bạn cần
      </h2>
      <p className="mt-3 max-w-md leading-relaxed text-text-secondary">
        Đường dẫn có thể đã thay đổi hoặc điểm đến này chưa có trên VivuViet.
        Hãy quay về trang chủ để tiếp tục hành trình của bạn nhé.
      </p>

      <NotFoundActions />
    </section>
  );
}
