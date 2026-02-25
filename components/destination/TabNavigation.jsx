"use client";

export default function TabNavigation({ posts, currentPost, onTabChange }) {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="flex gap-8 md:gap-12 overflow-x-auto no-scrollbar">
          {posts.map((post) => {
            const isActive = post.id == currentPost.id;
            return (
              <button
                key={post.id}
                onClick={() => onTabChange(post.id)}
                className={`
                                        cursor-pointer py-4 px-2 font-primary font-medium text-sm md:text-base
                                        transition-all duration-300 whitespace-nowrap border-b-2
                                        ${
                                          isActive
                                            ? "text-yellow-600 border-yellow-600"
                                            : "text-gray-500 border-transparent hover:text-black"
                                        }
                                    `}
              >
                {post.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
