export type Category = "전체" | "러닝/운동" | "보드게임" | "위스키/사케" | "카공/스터디"

export interface Meetup {
  id: string
  category: Exclude<Category, "전체">
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
  { label: "위스키/사케", emoji: "🥃" },
  { label: "카공/스터디", emoji: "✍️" },
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
    category: "위스키/사케",
    emoji: "🥃",
    title: "서면 위스키 바 탐방 (남성팀)",
    description: "위스키 입문자도 괜찮아요. 분위기 좋은 바 탐방!",
    currentMembers: 1,
    maxMembers: 2,
    location: "서면",
    timeLabel: "금요일 저녁 9시",
    tags: ["위스키", "바탐방", "서면"],
  },
  {
    id: "5",
    category: "카공/스터디",
    emoji: "✍️",
    title: "전공 벼락치기 카공",
    description: "시험 기간 집중 카공! 서로 감시하며 공부해요.",
    currentMembers: 1,
    maxMembers: 2,
    location: "정문 투썸",
    timeLabel: "내일 오후 1시",
    tags: ["시험기간", "카공", "집중"],
  },
]
