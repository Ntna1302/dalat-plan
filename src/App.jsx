import { useState, useEffect } from 'react';
import { MapPin, Clock, Star, Heart, Coffee, Utensils, Sparkles, Map, CheckCircle2 } from 'lucide-react';

const initialData = {
  day1: [
    { id: 1, time: "", name: "Bún Bò Thố Đá O 9", address: "23 Nguyễn Chí Thanh, Xuân Hương", type: "food" },
    { id: 2, time: "15:00 - 19:00", name: "Bánh Ít Ram", address: "40 Ngô Thì Sỹ, Phường Xuân Hương", type: "snack" },
    { id: 3, time: "", name: "Tui nướng lavender", address: "17/6 Nguyễn Trãi", type: "dinner", highlight: "100000000/10 !!!" },
    { id: 4, time: "", name: "Phô mai nướng", address: "145 Nguyễn Văn Trỗi", type: "must-go" },
    { id: 17, time: "", name: "Bánh Tráng Nướng Dì Đinh", address: "26 Hoàng Diệu, Cam Ly", type: "food" }
  ],
  day2: [
    { id: 5, time: "", name: "Bánh Căn Ngọc", address: "5 Ba Tháng Tư, Xuân Hương", type: "food" },
    { id: 6, time: "", name: "D'lart Garden", address: "41A Đào Duy Từ", type: "cafe" },
    { id: 7, time: "", name: "Mì Ý là Pasta", address: "21/2/5 Trần Phú, Phường 3", type: "food" },
    { id: 8, time: "", name: "Cà Lem Kem Bông", address: "Yersin", type: "snack" },
    { id: 9, time: "", name: "Tiệm nướng trạm dừng chill", address: "111 Huỳnh Tấn Phát", type: "dinner" },
    { id: 10, time: "", name: "Ốc Khánh Như", address: "4B Hai Bà Trưng, Cam Ly", type: "food" }
  ],
  day3: [
    { id: 11, time: "", name: "Chisai ramen", address: "Đà Lạt", type: "must-go" },
    { id: 12, time: "", name: "Caneless", address: "79 Phan Bội Châu", type: "must-go" },
    { id: 13, time: "", name: "Nem nướng Tân Long", address: "Bùi Thị Xuân", type: "food" },
    { id: 14, time: "", name: "Nook", address: "Đồi Dã Chiến", type: "cafe" },
    { id: 15, time: "", name: "Cậu Phùng quán", address: "2F8 Trần Nhân Tông", type: "food", highlight: "Quán Local" },
    { id: 16, time: "", name: "Chân Gà Quái Thú", address: "16B Hoàng Văn Thụ, Xuân Hương", type: "snack" }
  ],
  day4: [
    { id: 18, time: "", name: "Pami Coffee", address: "49 Đường Hai Bà Trưng, Phường 6", type: "cafe" },
    { id: 19, time: "", name: "Cái cốc mẻ", address: "15 Ngô Huy Diễn, Phường 5", type: "cafe" }
  ]
};

const daysList = [
  { key: 'day1', label: 'Thứ 6', desc: 'Ngày 1' },
  { key: 'day2', label: 'Thứ 7', desc: 'Ngày 2' },
  { key: 'day3', label: 'Chủ Nhật', desc: 'Ngày 3' },
  { key: 'day4', label: 'Thứ 2', desc: 'Ngày 4' }
];

function IconForType({ type, className }) {
  switch (type) {
    case 'food': return <Utensils className={className} />;
    case 'cafe': return <Coffee className={className} />;
    case 'dinner': return <Star className={className} />;
    case 'must-go': return <Heart className={className} />;
    default: return <MapPin className={className} />;
  }
};

export default function App() {
  const [plan, setPlan] = useState(initialData);
  const [activeDay, setActiveDay] = useState('day1');
  const [visited, setVisited] = useState(() => {
    const saved = localStorage.getItem('dalat-visited');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('dalat-visited', JSON.stringify(visited));
  }, [visited]);

  const toggleVisited = (itemId) => {
    setVisited(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const handleTimeChange = (dayKey, itemId, newTime) => {
    setPlan(prev => ({
      ...prev,
      [dayKey]: prev[dayKey].map(item => 
        item.id === itemId ? { ...item, time: newTime } : item
      )
    }));
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4] text-slate-800 font-sans selection:bg-green-200">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <header className="relative overflow-hidden bg-gradient-to-br from-[#86efac] to-[#10b981] rounded-3xl shadow-lg p-8 mb-8 text-white">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-20">
            <Map size={200} />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium mb-4">
              <Sparkles size={16} /> 4 Ngày 3 Đêm
            </div>
            <h1 className="text-4xl font-bold mb-2 tracking-tight">Kế Hoạch Vi Vu Đà Lạt 🌲</h1>
          </div>
        </header>

        {/* Must Go Alert */}
        <div className="bg-white rounded-2xl p-5 mb-8 shadow-sm border border-green-100 flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-shrink-0 bg-rose-100 p-3 rounded-full text-rose-500">
            <Heart size={24} fill="currentColor" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              Không Thể Không Đi
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Nhất định phải thử: <strong>Chisai ramen</strong>, <strong>Caneless</strong>, và <strong>Phô mai nướng</strong>. Đặc biệt quán <strong>Tui nướng lavender</strong> được rate 100000000/10!
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-white rounded-2xl shadow-sm border border-green-50 mb-8 overflow-x-auto hide-scrollbar">
          {daysList.map((day) => (
            <button
              key={day.key}
              onClick={() => setActiveDay(day.key)}
              className={`flex-1 min-w-[100px] flex flex-col items-center py-3 px-4 rounded-xl transition-all duration-300 ease-out ${
                activeDay === day.key 
                  ? 'bg-green-500 text-white shadow-md transform scale-[1.02]' 
                  : 'text-slate-500 hover:bg-green-50 hover:text-green-700'
              }`}
            >
              <span className="font-bold text-lg">{day.label}</span>
              <span className={`text-xs ${activeDay === day.key ? 'text-green-100' : 'text-slate-400'}`}>
                {day.desc}
              </span>
            </button>
          ))}
        </div>

        {/* Plan Timeline */}
        <div className="space-y-6">
          {plan[activeDay].map((item, index) => {
            const isVisited = visited.includes(item.id);
            return (
            <div key={item.id} className="relative flex items-start gap-4 group">
              
              {/* Timeline line */}
              {index !== plan[activeDay].length - 1 && (
                <div className="absolute left-[27px] top-12 bottom-[-24px] w-[2px] bg-green-200/50 group-hover:bg-green-300 transition-colors"></div>
              )}

              {/* Time Input */}
              <div className="flex-shrink-0 w-24 sm:w-28 pt-2 relative z-10">
                <div className="flex items-center gap-1.5 text-green-600 mb-1">
                  <Clock size={14} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Thời gian</span>
                </div>
                <input
                  type="text"
                  placeholder="Nhập giờ..."
                  value={item.time}
                  onChange={(e) => handleTimeChange(activeDay, item.id, e.target.value)}
                  className="w-full text-sm font-medium bg-white border border-green-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all placeholder-slate-300 shadow-sm"
                />
              </div>

              {/* Card */}
              <div className={`flex-grow rounded-2xl p-4 sm:p-5 shadow-sm border transition-all group-hover:-translate-y-0.5 ${
                isVisited
                  ? 'bg-green-50 border-green-300 opacity-80'
                  : 'bg-white border-green-100 hover:shadow-md hover:border-green-300'
              }`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleVisited(item.id)}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isVisited
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-slate-300 hover:border-green-400'
                        }`}
                      >
                        {isVisited && <CheckCircle2 size={16} />}
                      </button>
                      <h3 className={`text-lg font-bold flex items-center gap-2 flex-wrap ${
                        isVisited ? 'text-slate-500 line-through' : 'text-slate-800'
                      }`}>
                        {item.name}
                        {item.type === 'must-go' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-rose-100 text-rose-600">
                            <Heart size={10} fill="currentColor"/> Must Go
                          </span>
                        )}
                        {item.highlight && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-600">
                            <Star size={10} fill="currentColor"/> {item.highlight}
                          </span>
                        )}
                      </h3>
                    </div>
                    
                    {item.address && (
                      <div className={`flex items-start gap-1.5 mt-2 text-sm ml-9 ${
                        isVisited ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        <MapPin size={16} className="flex-shrink-0 mt-0.5 text-green-500" />
                        <span>{item.address}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Icon Type */}
                  <div className={`flex-shrink-0 p-3 rounded-full ${
                    item.type === 'must-go' ? 'bg-rose-50 text-rose-500' :
                    item.type === 'cafe' ? 'bg-amber-50 text-amber-600' :
                    item.type === 'food' ? 'bg-orange-50 text-orange-500' :
                    item.type === 'snack' ? 'bg-purple-50 text-purple-500' :
                    'bg-green-50 text-green-600'
                  }`}>
                    <IconForType type={item.type} className="w-5 h-5" />
                  </div>
                </div>
              </div>

            </div>
            );
          })}
          
          {plan[activeDay].length === 0 && (
            <div className="text-center py-10 text-slate-400">
              Chưa có lịch trình cho ngày này.
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-slate-400 pb-8">
          <p>Chúc bạn có một chuyến đi Đà Lạt thật tuyệt vời! ☁️</p>
        </footer>

      </div>
    </div>
  );
}
