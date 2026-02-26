export type Category = "전체" | "러닝/운동" | "보드게임" | "음주" | "스터디" | "요청사항"

export interface Meetup {
  id: string
  category: Exclude<Category, "전체" | "요청사항">
  emoji: string
  title: string
  description?: string
  currentMembers: number
  maxMembers: number
  location: string
  timeLabel: string
  tags: string[]
}

export const categories: { label: Category; emoji: string }[] = [
  { label: "전체", emoji: "" },
  { label: "러닝/운동", emoji: "🏃" },
  { label: "보드게임", emoji: "🎲" },
  { label: "음주", emoji: "🍻" },
  { label: "스터디", emoji: "✍️" },
  { label: "요청사항", emoji: "💬" },
]

export const meetups: Meetup[] = [
  {
    id: "1",
    category: "러닝/운동",
    emoji: "🏃",
    title: "온천천 야간 러닝 5km (초보 환영!)",
    description: "같이 뛰고 시원하게 편맥 해요!",
    currentMembers: 5,
    maxMembers: 10,
    location: "부산대역 3번 출구",
    timeLabel: "오늘 저녁 8시",
    tags: ["초보환영", "야간러닝", "편맥"],
  },
  {
    id: "2",
    category: "러닝/운동",
    emoji: "🏃",
    title: "금정산성 가벼운 트레킹",
    description: "주말 아침 상쾌한 산행, 정상에서 커피 한 잔!",
    currentMembers: 2,
    maxMembers: 4,
    location: "장전동",
    timeLabel: "토요일 오전 7시",
    tags: ["트레킹", "주말", "자연"],
  },
  {
    id: "3",
    category: "보드게임",
    emoji: "🎲",
    title: "보드게임 카페 '다락' 4인 팟 구함",
    description: "스플렌더, 카탄 등 전략 보드게임 위주!",
    currentMembers: 2,
    maxMembers: 4,
    location: "정문 앞",
    timeLabel: "오늘 오후 3시",
    tags: ["전략게임", "카페", "4인팟"],
  },
  {
    id: "4",
    category: "음주",
    emoji: "🍻",
    title: "서면 위스키 바 정복하러 갈 팀",
    description: "위스키 입문자도 괜찮아요. 분위기 좋은 바 탐방!",
    currentMembers: 1,
    maxMembers: 2,
    location: "서면",
    timeLabel: "금요일 저녁 9시",
    tags: ["위스키", "바탐방", "서면"],
  },
  {
    id: "5",
    category: "음주",
    emoji: "🍻",
    title: "맛집에서 맛있는 안주에 소주/맥주 곁들일 분",
    description: "부산대 정문 근처 맛집에서 가볍게 한 잔!",
    currentMembers: 2,
    maxMembers: 4,
    location: "부산대 정문",
    timeLabel: "오늘 저녁 7시",
    tags: ["소주", "맥주", "맛집", "안주"],
  },
  {
    id: "6",
    category: "스터디",
    emoji: "✍️",
    title: "공기업/대기업 취준 스터디 (NCS, 면접)",
    description: "같이 NCS 풀고 모의면접 연습해요!",
    currentMembers: 3,
    maxMembers: 4,
    location: "새벽벌 도서관",
    timeLabel: "매주 화/목 오전 10시",
    tags: ["취준", "NCS", "면접", "스터디"],
  },
  {
    id: "7",
    category: "스터디",
    emoji: "✍️",
    title: "전공 과목 스터디 및 정보 공유",
    description: "서로 모르는 부분 알려주며 같이 공부해요!",
    currentMembers: 1,
    maxMembers: 3,
    location: "새벽벌 도서관/카페",
    timeLabel: "내일 오후 1시",
    tags: ["전공", "스터디", "정보공유"],
  },
]
