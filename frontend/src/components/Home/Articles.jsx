import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { articlesData } from "../../assets/data/articles";

const Articles = () => {
  return (
    <section className="container mx-auto px-4 py-16 mb-20 overflow-hidden relative">
      {/* Decorative background blob */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -z-10 opacity-60"></div>

      {/* Enhanced Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="max-w-xl">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-teal-600 uppercase bg-teal-50 rounded-full">
            Insights & Research
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Articles</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full mt-4"></div>
        </div>

        <Link
          to="/articles"
          className="group flex items-center gap-2 text-slate-900 font-bold text-lg hover:text-teal-600 transition-colors"
        >
          Explore All News
          <span className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-teal-600 transition-all duration-300">
            <BsArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articlesData.slice(0, 3).map((article) => (
          <div
            key={article.id}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={article.img}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                  {article.post_date}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-[10px]">
                  {article.writer.split(' ').map(n => n[0]).join('')}
                </span>
                <p className="text-xs font-medium text-gray-500">
                  by <span className="text-slate-900">{article.writer}</span>
                </p>
              </div>

              <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                {article.title}
              </h2>

              <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-2">
                {article.desc}
              </p>

              <Link
                to="/articles"
                className="inline-flex items-center gap-2 text-teal-600 font-bold text-sm hover:gap-3 transition-all"
              >
                Read More <BsArrowRight />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Articles;
