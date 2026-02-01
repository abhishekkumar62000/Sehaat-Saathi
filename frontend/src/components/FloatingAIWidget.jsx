import { Link } from 'react-router-dom';
import { BsRobot } from 'react-icons/bs';

const FloatingAIWidget = () => {
    return (
        <Link
            to="/doctor-ai"
            className="fixed bottom-8 right-8 z-[100] group flex items-center gap-3"
        >
            <div className="bg-slate-900 border border-slate-700 text-white px-4 py-2 rounded-2xl text-xs font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all shadow-2xl pointer-events-none">
                Miliye apne <span className="text-orange-400">AI Doctor</span> se!
            </div>
            <div className="w-16 h-16 bg-gradient-to-tr from-green-600 to-emerald-500 rounded-[1.8rem] flex items-center justify-center shadow-2xl shadow-green-600/30 hover:shadow-green-500/50 hover:scale-110 active:scale-95 transition-all relative border-4 border-white/10 backdrop-blur-md">
                <BsRobot className="text-white text-3xl animate-pulse" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-lg flex items-center justify-center border-4 border-slate-900">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                </div>
            </div>
        </Link>
    );
};

export default FloatingAIWidget;
