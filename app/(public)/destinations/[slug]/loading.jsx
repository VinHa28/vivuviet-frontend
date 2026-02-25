export default function DestinationLoading() {
    return (
        <div className="w-full min-h-screen bg-white">
            {/* Hero Banner Skeleton */}
            <div className="w-full h-[400px] md:h-[500px] bg-gray-200 animate-pulse" />

            {/* Content Skeleton */}
            <div className="max-w-[1170px] mx-auto px-4 py-16">
                {/* Intro Skeleton */}
                <div className="text-center max-w-[900px] mx-auto mb-16">
                    <div className="h-12 bg-gray-200 animate-pulse rounded mb-4" />
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 animate-pulse rounded" />
                        <div className="h-4 bg-gray-200 animate-pulse rounded" />
                        <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3 mx-auto" />
                    </div>
                </div>

                {/* Things To Do Skeleton */}
                <div className="mb-16">
                    <div className="h-10 bg-gray-200 animate-pulse rounded mb-8 w-1/3 mx-auto" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="bg-gray-100 rounded-lg p-6 animate-pulse">
                                <div className="h-12 bg-gray-200 rounded mb-4" />
                                <div className="h-4 bg-gray-200 rounded mb-2" />
                                <div className="h-4 bg-gray-200 rounded mb-2" />
                                <div className="h-4 bg-gray-200 rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
