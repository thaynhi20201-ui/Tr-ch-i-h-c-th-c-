import { GeoQuestion } from '../types';

export const GEOGRAPHY_QUESTIONS_POOL: GeoQuestion[] = [
  {
    id: 1,
    question: 'Đỉnh núi nào được mệnh danh là "Nóc nhà Đông Dương" nằm tại Việt Nam?',
    options: ['Fansipan', 'Ngọc Linh', 'Bạch Mộc Lương Tử', 'Pu Si Lung'],
    correctIndex: 0,
    explanation: 'Đỉnh Fansipan cao 3.143m thuộc dãy Hoàng Liên Sơn, tỉnh Lào Cai, là đỉnh núi cao nhất 3 nước Đông Dương.',
  },
  {
    id: 2,
    question: 'Hang động tự nhiên lớn nhất thế giới Sơn Đoòng nằm ở tỉnh nào của Việt Nam?',
    options: ['Ninh Bình', 'Quảng Bình', 'Hà Giang', 'Cao Bằng'],
    correctIndex: 1,
    explanation: 'Hang Sơn Đoòng thuộc Vườn quốc gia Phong Nha - Kẻ Bàng, tỉnh Quảng Bình, là hang động tự nhiên kỳ vĩ nhất thế giới.',
  },
  {
    id: 3,
    question: 'Dòng sông nào dài nhất thế giới, chảy qua phần lớn khu vực Đông Bắc châu Phi?',
    options: ['Sông Amazon', 'Sông Nin (Nile)', 'Sông Mê Kông', 'Sông Dương Tử'],
    correctIndex: 1,
    explanation: 'Sông Nin dài khoảng 6.650 km, chảy qua 11 quốc gia châu Phi và đổ ra Địa Trung Hải.',
  },
  {
    id: 4,
    question: 'Đại dương nào có diện tích và độ sâu trung bình lớn nhất trên Trái Đất?',
    options: ['Đại Tây Dương', 'Ấn Độ Dương', 'Bắc Băng Dương', 'Thái Bình Dương'],
    correctIndex: 3,
    explanation: 'Thái Bình Dương chiếm hơn 30% diện tích bề mặt Trái Đất và chứa rãnh Mariana - điểm sâu nhất hành tinh (~11.000m).',
  },
  {
    id: 5,
    question: 'Đảo nào có diện tích tự nhiên lớn nhất tại Việt Nam?',
    options: ['Đảo Phú Quốc', 'Đảo Cát Bà', 'Đảo Lý Sơn', 'Côn Đảo'],
    correctIndex: 0,
    explanation: 'Đảo Phú Quốc (Kiên Giang) có diện tích khoảng 589 km², là hòn đảo lớn nhất Việt Nam.',
  },
  {
    id: 6,
    question: 'Sa mạc cát nóng lớn nhất thế giới nằm ở châu lục nào?',
    options: ['Châu Á (Gobi)', 'Châu Phi (Sahara)', 'Châu Úc', 'Châu Mỹ'],
    correctIndex: 1,
    explanation: 'Sa mạc Sahara nằm ở Bắc Phi có diện tích hơn 9 triệu km², gần bằng diện tích của cả Hoa Kỳ hoặc Trung Quốc.',
  },
  {
    id: 7,
    question: 'Dãy núi cao nhất hành tinh với đỉnh Everest (8.848m) có tên là gì?',
    options: ['Dãy Andes', 'Dãy Alps', 'Dãy Himalaya', 'Dãy Rocky'],
    correctIndex: 2,
    explanation: 'Dãy Himalaya nằm giữa cao nguyên Tây Tạng và tiểu lục địa Ấn Độ, sở hữu đỉnh Everest cao nhất thế giới.',
  },
  {
    id: 8,
    question: 'Thác nước tự nhiên hùng vĩ nằm trên biên giới giữa Việt Nam và Trung Quốc là thác nào?',
    options: ['Thác Cam Ly', 'Thác Bản Giốc', 'Thác Datanla', 'Thác Pongour'],
    correctIndex: 1,
    explanation: 'Thác Bản Giốc nằm tại xã Đàm Thủy, huyện Trùng Khánh, tỉnh Cao Bằng, là một trong những thác biên giới đẹp nhất hành tinh.',
  },
  {
    id: 9,
    question: 'Rừng mưa nhiệt đới lớn nhất thế giới, được coi là "lá phổi xanh của Trái Đất" là gì?',
    options: ['Rừng Cúc Phương', 'Rừng Taiga', 'Rừng Amazon', 'Rừng Đen'],
    correctIndex: 2,
    explanation: 'Rừng nhiệt đới Amazon trải rộng khắp 9 quốc gia Nam Mỹ, tạo ra lượng oxy và là nơi cư trú sinh thái khổng lồ.',
  },
  {
    id: 10,
    question: 'Điểm cực Bắc trên đất liền của Việt Nam thuộc địa phận tỉnh nào?',
    options: ['Hà Giang (Lũng Cú)', 'Lào Cai', 'Cao Bằng', 'Lai Châu'],
    correctIndex: 0,
    explanation: 'Cột cờ Lũng Cú nằm tại huyện Đồng Văn, tỉnh Hà Giang là điểm cực Bắc thiêng liêng của Tổ quốc.',
  },
  {
    id: 11,
    question: 'Sông Mê Kông bắt nguồn từ vùng đất nào trước khi chảy qua 6 quốc gia?',
    options: ['Dãy Ural', 'Cao nguyên Tây Tạng', 'Dãy Altay', 'Hồ Baikal'],
    correctIndex: 1,
    explanation: 'Sông Mê Kông bắt nguồn từ cao nguyên Tây Tạng, chảy qua Trung Quốc, Myanmar, Lào, Thái Lan, Campuchia và Việt Nam.',
  },
  {
    id: 12,
    question: 'Vịnh biển nào của Việt Nam 2 lần được UNESCO công nhận là Di sản Thiên nhiên Thế giới?',
    options: ['Vịnh Nha Trang', 'Vịnh Hạ Long', 'Vịnh Vĩnh Hy', 'Vịnh Xuân Đài'],
    correctIndex: 1,
    explanation: 'Vịnh Hạ Long (Quảng Ninh) được UNESCO công nhận Di sản Thế giới về giá trị thẩm mỹ (1994) và địa chất địa mạo (2000).',
  },
  {
    id: 13,
    question: 'Quốc gia nào có diện tích lãnh thổ lớn nhất thế giới?',
    options: ['Canada', 'Hoa Kỳ', 'Trung Quốc', 'Liên bang Nga'],
    correctIndex: 3,
    explanation: 'Nga có diện tích hơn 17 triệu km², trải dài qua 2 châu lục Á - Âu và 11 múi giờ.',
  },
  {
    id: 14,
    question: 'Kênh đào nhân tạo nổi tiếng nối liền Biển Đỏ với Địa Trung Hải là kênh đào nào?',
    options: ['Kênh Panama', 'Kênh Suez', 'Kênh Kiel', 'Kênh Corinth'],
    correctIndex: 1,
    explanation: 'Kênh đào Suez thuộc Ai Cập mở cửa năm 1869, rút ngắn hàng ngàn hải lý đường hàng hải giữa châu Âu và châu Á.',
  },
  {
    id: 15,
    question: 'Điểm cực Nam trên đất liền của nước ta thuộc địa danh nào?',
    options: ['Mũi Cà Mau (xã Đất Mũi, Cà Mau)', 'Hòn Khoai', 'Mũi Đại Lãnh', 'Gành Đèn'],
    correctIndex: 0,
    explanation: 'Xã Đất Mũi, huyện Ngọc Hiển, tỉnh Cà Mau là điểm cực Nam thiêng liêng trên đất liền của Việt Nam.',
  },
  {
    id: 16,
    question: 'Châu lục nào có diện tích nhỏ nhất nhưng là một quốc gia độc lập?',
    options: ['Châu Âu', 'Châu Phi', 'Châu Đại Dương (Úc)', 'Châu Nam Cực'],
    correctIndex: 2,
    explanation: 'Châu Úc (Australia) vừa là một lục địa nhỏ nhất, vừa là một quốc gia độc lập giàu thiên nhiên hoang dã.',
  },
  {
    id: 17,
    question: 'Hồ Baikal - hồ nước ngọt sâu nhất và lâu đời nhất hành tinh nằm ở quốc gia nào?',
    options: ['Mông Cổ', 'Nga (vùng Siberia)', 'Canada', 'Na Uy'],
    correctIndex: 1,
    explanation: 'Hồ Baikal ở Nga sâu hơn 1.642m, chứa khoảng 20% lượng nước ngọt không đóng băng trên bề mặt Trái Đất.',
  },
  {
    id: 18,
    question: 'Vùng kinh tế trọng điểm nào tại Việt Nam được coi là "vựa lúa lớn nhất cả nước"?',
    options: ['Đồng bằng sông Hồng', 'Đồng bằng duyên hải miền Trung', 'Đồng bằng sông Cửu Long', 'Tây Nguyên'],
    correctIndex: 2,
    explanation: 'Đồng bằng sông Cửu Long (Tây Nam Bộ) sản xuất hơn 50% sản lượng lúa gạo và 90% lượng gạo xuất khẩu của cả nước.',
  },
  {
    id: 19,
    question: 'Eo biển nào ngăn cách giữa lục địa châu Á và lục địa Bắc Mỹ?',
    options: ['Eo biển Malacca', 'Eo biển Bering', 'Eo biển Gibraltar', 'Eo biển Hormuz'],
    correctIndex: 1,
    explanation: 'Eo biển Bering ngăn cách giữa bán đảo Chukotka (Nga) và bang Alaska (Hoa Kỳ), rộng khoảng 82km.',
  },
  {
    id: 20,
    question: 'Hai quần đảo Hoàng Sa và Trường Sa là một phần máu thịt thiêng liêng thuộc chủ quyền của quốc gia nào?',
    options: ['Việt Nam', 'Indonesia', 'Philippines', 'Malaysia'],
    correctIndex: 0,
    explanation: 'Việt Nam có đầy đủ bằng chứng lịch sử và cơ sở pháp lý khẳng định chủ quyền đối với 2 quần đảo Hoàng Sa và Trường Sa.',
  },
];

// Hàm lấy ngẫu nhiên 10 câu hỏi cho mỗi ván đấu kéo co
export function getRandom10Questions(): GeoQuestion[] {
  const shuffled = [...GEOGRAPHY_QUESTIONS_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
}
