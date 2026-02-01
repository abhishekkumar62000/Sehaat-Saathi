import { articlesData } from "../assets/data/articles";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const ArticlesPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Premium Header Section */}
            <section className="bg-gradient-to-r from-teal-500 to-blue-600 py-20 text-white">
                <div className="container mx-auto px-4 text-center">
                    <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase bg-white/20 rounded-full backdrop-blur-md">
                        Sehaat Saathi Newsroom
                    </span>
                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 tracking-tight">
                        Latest <span className="text-teal-200">Health Articles</span> 2026
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-teal-50 font-medium">
                        Stay informed with the latest breakthroughs in AI diagnostics,
                        personalized medicine, and global health trends.
                    </p>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="container mx-auto px-4 -mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articlesData.map((article) => (
                        <div
                            key={article.id}
                            className="bg-white/80 backdrop-blur-xl border border-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-2"
                        >
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={article.img}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute bottom-4 left-4 text-white text-xs font-bold px-3 py-1 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                                    {article.post_date}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xs">
                                        {article.writer.split(' ').map(n => n[0]).join('')}
                                    </span>
                                    <p className="text-sm font-semibold text-gray-600">
                                        by <span className="text-teal-600">{article.writer}</span>
                                    </p>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2">
                                    {article.title}
                                </h2>

                                <p className="text-gray-500 leading-relaxed mb-8 line-clamp-3">
                                    {article.desc}
                                </p>

                                <Link
                                    to={`/articles/${article.id}`}
                                    className="inline-flex items-center gap-2 text-slate-900 font-bold group/btn hover:text-teal-600 transition-colors"
                                >
                                    Read Full Article
                                    <BsArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-2" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="container mx-auto px-4 mt-20">
                <div className="bg-slate-900 rounded-[40px] p-8 lg:p-16 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-[120px] opacity-20 -z-0"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Never Miss a Health Update</h2>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                            Subscribe to our monthly newsletter and get the latest diagnostic
                            breakthroughs delivered straight to your inbox.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-6 py-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md focus:outline-none focus:border-teal-400 flex-grow"
                            />
                            <button className="px-8 py-4 bg-teal-500 hover:bg-teal-400 rounded-2xl font-bold transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArticlesPage;
