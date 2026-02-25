export default function RelatedArticles({ articles }) {
    return (
        <section className="w-full py-4 px-4">
            {/* <div className="max-w-[1170px] mx-auto">
                <h2 className="text-4xl font-bold text-secondary mb-8 uppercase text-center tracking-widest font-primary">
                    Bạn cũng có thể thích
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <a
                            key={article.id}
                            href={article.link}
                            className="group"
                        >
                            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                                <h3 className="text-xl font-bold text-text-primary font-primary group-hover:text-primary transition-colors">
                                    {article.title}
                                </h3>

                                <div className="mt-4 flex items-center text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    Tiếp →
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div> */}
        </section>
    );
}
