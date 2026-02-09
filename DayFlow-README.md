# DayFlow - AI 기반 일상 관리 앱

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-planning-yellow.svg)

## 📱 프로젝트 개요

**DayFlow**는 위치 기반 맞춤형 일상 관리 앱으로, AI가 사용자의 일정, 날씨, 위치를 분석해 하루를 최적화해주는 스마트 어시스턴트입니다.

### 핵심 가치
- 💡 **지능형 추천**: AI가 날씨, 위치, 일정을 종합 분석하여 실행 가능한 조언 제공
- 🎯 **맥락 인식**: 사용자의 현재 상황에 맞는 최적화된 정보 제공
- ⚡ **실시간 최적화**: 변화하는 상황에 따라 실시간으로 하루 일정 조정

---

## 🎯 주요 기능

### 1. AI 기반 일상 요약
- **아침 브리핑**: 오늘 하루를 한눈에 요약
- **종합 분석**: 일정 + 날씨 + 교통 상황 + 근처 이벤트 통합
- **실행 가능한 조언**: "오늘은 오후에 비가 오니 우산 챙기세요. 오전 회의 장소까지 30분 소요 예상, 7시 출발 권장"
- **저녁 요약**: 하루 활동 정리 및 내일 준비사항 안내

### 2. 스마트 위젯
- **실시간 정보**: 현재 위치의 날씨, 다음 일정, AI 추천 행동
- **상황별 제안**: 
  - 점심시간: 근처 맛집 추천
  - 퇴근시간: 교통 상황 고려한 최적 귀가 시간
- **커스터마이징**: 위젯 크기 및 표시 정보 사용자 설정 가능

### 3. 위치 기반 컨텍스트 인식
- **자동 장소 감지**: 회사, 집, 자주 가는 장소 자동 인식
- **맞춤형 정보 제공**:
  - 회사 도착: 오늘 회의 요약 + 업무 리스트
  - 카페 도착: 집중 모드 활성화 + 작업 타이머
  - 새로운 장소: 주변 편의시설, 날씨, 교통편 자동 안내

### 4. 날씨 통합 라이프스타일 제안
- **행동 중심 제안**: 단순 날씨 정보가 아닌 실천 가능한 조언
- **예시**:
  - 미세먼지 심한 날: 실내 활동 추천
  - 날씨 좋은 주말: 근처 공원, 야외 활동 장소 제안
  - 주간 날씨 분석: 빨래하기 좋은 날, 세차하기 좋은 날 알림

### 5. 시간대별 AI 추천
- **오전**: 생산성 높은 업무 처리 제안
- **점심**: 근처 식당 추천
- **오후**: 에너지 관리 팁
- **저녁**: 운동, 여가 활동 제안
- 시간대 + 위치 + 날씨를 종합한 맞춤형 추천

---

## 💾 데이터베이스 설계

### ERD 구조

```
┌─────────────────┐
│     users       │ (중심 테이블)
│─────────────────│
│ PK: user_id     │
│ UK: username    │
│ UK: email       │
└────────┬────────┘
         │
         │ 1:N
         │
    ┌────┴────┬──────────┬──────────┬──────────┐
    │         │          │          │          │
    ▼         ▼          ▼          ▼          ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│user_    │ │schedules│ │ai_      │ │user_    │
│locations│ │         │ │recomme- │ │activity_│
│         │ │         │ │ndations │ │logs     │
└────┬────┘ └─────────┘ └─────────┘ └─────────┘
     │
     │ 1:N
     │
     ▼
┌─────────┐
│schedules│
└─────────┘
```

### 테이블 상세 설명

#### 1. users (사용자 테이블)
```sql
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    home_latitude DECIMAL(10, 8),
    home_longitude DECIMAL(11, 8),
    work_latitude DECIMAL(10, 8),
    work_longitude DECIMAL(11, 8),
    preferred_weather_unit ENUM('celsius', 'fahrenheit') DEFAULT 'celsius',
    notification_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**주요 특징**:
- 사용자 기본 정보 및 인증 정보
- 집/회사 위치 저장으로 기본 위치 기반 서비스 제공
- 개인화 설정 (날씨 단위, 알림 등)

#### 2. user_locations (등록 장소 테이블)
```sql
CREATE TABLE user_locations (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    location_name VARCHAR(100) NOT NULL,
    location_type ENUM('home', 'work', 'cafe', 'gym', 'custom') NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    address VARCHAR(255),
    arrival_action TEXT COMMENT 'JSON 형식: 도착시 자동 실행 액션',
    visit_count INT DEFAULT 0,
    last_visited TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
```

**주요 특징**:
- 자주 가는 장소 관리
- 장소별 자동 액션 설정 (JSON 형식)
- 방문 패턴 분석 (방문 횟수, 최근 방문 시간)

**arrival_action 예시**:
```json
{
  "action": "focus_mode",
  "show_meetings": true,
  "start_timer": 90
}
```

#### 3. schedules (일정 테이블)
```sql
CREATE TABLE schedules (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    location_id INT,
    custom_location VARCHAR(255),
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    reminder_minutes INT DEFAULT 30,
    weather_sensitive BOOLEAN DEFAULT FALSE COMMENT '날씨 영향을 받는 일정 여부',
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES user_locations(location_id) ON DELETE SET NULL
);
```

**주요 특징**:
- 위치 기반 일정 관리
- 날씨 영향 여부 플래그 (날씨에 따른 일정 조정 제안)
- 등록된 장소 또는 커스텀 장소 지정 가능

#### 4. ai_recommendations (AI 추천 로그 테이블)
```sql
CREATE TABLE ai_recommendations (
    recommendation_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    recommendation_type ENUM('activity', 'food', 'transport', 'weather_action', 'productivity', 'health') NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    recommendation_time DATETIME NOT NULL,
    context_data JSON COMMENT 'JSON 형식: 날씨, 위치, 시간대 등 컨텍스트 정보',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    is_viewed BOOLEAN DEFAULT FALSE,
    is_accepted BOOLEAN DEFAULT NULL COMMENT 'NULL: 미응답, TRUE: 수락, FALSE: 거절',
    user_feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user_time (user_id, recommendation_time)
);
```

**주요 특징**:
- AI 추천 유형별 분류
- 사용자 피드백 수집 (AI 학습 데이터)
- 컨텍스트 데이터 저장으로 추천 이유 추적

**context_data 예시**:
```json
{
  "weather": "비",
  "temperature": 15,
  "traffic": "보통",
  "location": "강남역",
  "time_of_day": "아침"
}
```

#### 5. user_activity_logs (사용자 활동 로그 테이블)
```sql
CREATE TABLE user_activity_logs (
    activity_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_type ENUM('location_change', 'schedule_complete', 'widget_interaction', 'app_open', 'recommendation_action') NOT NULL,
    activity_data JSON COMMENT 'JSON 형식: 활동 상세 정보',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    weather_condition VARCHAR(50),
    temperature DECIMAL(5, 2),
    activity_timestamp DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user_activity (user_id, activity_timestamp)
);
```

**주요 특징**:
- 사용자 행동 패턴 분석
- AI 학습을 위한 데이터 수집
- 날씨와 행동의 상관관계 분석

### 데이터베이스 관계

| 관계 | 설명 | CASCADE 정책 |
|------|------|--------------|
| users → user_locations | 1:N | ON DELETE CASCADE |
| users → schedules | 1:N | ON DELETE CASCADE |
| users → ai_recommendations | 1:N | ON DELETE CASCADE |
| users → user_activity_logs | 1:N | ON DELETE CASCADE |
| user_locations → schedules | 1:N | ON DELETE SET NULL |

---

## 🎨 디자인 가이드

### 디자인 컨셉
**금융 앱 수준의 프리미엄 디자인**
- 신뢰감 있고 전문적인 느낌
- 극도로 깔끔하고 미니멀한 인터페이스
- 정보 중심의 구조화된 레이아웃

### 컬러 팔레트

| 용도 | 컬러 코드 | 설명 |
|------|-----------|------|
| Primary | `#1B2D45` | 다크 네이비 |
| Secondary | `#2C4A6B` | 미드 네이비 |
| Accent | `#3B82F6` | 브라이트 블루 (강조용) |
| Success | `#10B981` | 민트 그린 |
| Warning | `#F59E0B` | 골드 |
| Background | `#FAFBFC` | 오프 화이트 |
| Card | `#FFFFFF` | 순백 |
| Text Primary | `#0F172A` | 거의 블랙 |
| Text Secondary | `#64748B` | 슬레이트 그레이 |
| Border | `#E2E8F0` | 라이트 그레이 |

### 타이포그래피

```css
/* Headings */
font-family: Pretendard Bold, SF Pro Display Bold;
font-size: 20-26pt;

/* Body */
font-family: Pretendard Regular, SF Pro Text;
font-size: 14-16pt;

/* Numbers */
font-family: Pretendard SemiBold, SF Pro Display SemiBold;
font-size: 28-32pt; /* 큰 숫자 강조 */

/* Captions */
font-family: Pretendard Regular;
font-size: 11-13pt;
```

### 주요 화면 구성

#### 1. 홈/대시보드
- 사용자 인사 + 현재 시각
- 주요 지표 3개 카드 (오늘 일정, 이동 시간, AI 추천)
- 날씨 정보 카드
- 오늘의 AI 요약
- 일정 타임라인

#### 2. AI 추천 피드
- 추천 유형별 필터
- 카드 기반 피드
- 수락/거절 인터랙션

#### 3. 일정/캘린더
- 월/주/일 뷰 전환
- 타임라인 형식 일정 표시
- 날씨 민감도 뱃지

#### 4. 장소 관리
- 지도 뷰
- 저장된 장소 카드 리스트
- 방문 통계 표시

#### 5. 위젯 설정
- 실시간 미리보기
- 표시 항목 토글
- 테마 선택

#### 6. 프로필 & 설정
- 계정 관리
- 환경 설정
- AI 설정

### UI 컴포넌트 스타일

```css
/* 카드 */
background: #FFFFFF;
border-radius: 8px;
box-shadow: 0 2px 8px rgba(0,0,0,0.04);

/* 버튼 - Primary */
background: #1B2D45;
border-radius: 8px;
padding: 12px 24px;

/* 버튼 - Secondary */
background: transparent;
border: 1px solid #E2E8F0;
border-radius: 8px;

/* 입력 필드 */
border: 1px solid #E2E8F0;
border-radius: 6px;
focus: border-color #1B2D45;

/* 토글 스위치 */
active: background #1B2D45;
```

---

## 🛠 기술 스택

### Frontend (예정)
- **프레임워크**: React Native / Flutter
- **상태 관리**: Redux / Provider
- **API 통신**: Axios
- **지도**: Google Maps API / Kakao Maps API
- **날씨**: OpenWeatherMap API

### Backend
- **프레임워크**: Spring Boot 3.2.1
- **언어**: Java 17
- **빌드 도구**: Gradle
- **데이터베이스**: MySQL 8.0
- **ORM**: Spring Data JPA
- **보안**: Spring Security + JWT
- **문서화**: SpringDoc OpenAPI (Swagger)

### 인프라 (예정)
- **서버**: AWS EC2 / Google Cloud
- **데이터베이스**: AWS RDS / Cloud SQL
- **스토리지**: AWS S3
- **배포**: Docker + CI/CD

---

## 📂 백엔드 프로젝트 구조

```
dayflow-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── dayflow/
│   │   │           └── backend/
│   │   │               ├── controller/      # REST API 컨트롤러
│   │   │               ├── service/         # 비즈니스 로직
│   │   │               ├── repository/      # JPA 리포지토리
│   │   │               ├── model/           # 엔티티 클래스
│   │   │               ├── dto/             # 데이터 전송 객체
│   │   │               ├── config/          # 설정 클래스
│   │   │               ├── security/        # 보안 설정
│   │   │               ├── exception/       # 예외 처리
│   │   │               └── util/            # 유틸리티
│   │   └── resources/
│   │       ├── application.yml              # 메인 설정
│   │       ├── application-dev.yml          # 개발 환경
│   │       └── application-prod.yml         # 운영 환경
│   └── test/                                # 테스트 코드
├── build.gradle                             # Gradle 빌드 설정
└── README.md
```

---

## 🚀 시작하기

### 필수 요구사항
- Java 17 이상
- MySQL 8.0 이상
- Gradle 8.x 이상

### 데이터베이스 설정

```sql
-- 데이터베이스 생성
CREATE DATABASE ssafy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 사용자 생성 (선택사항)
CREATE USER 'dayflow'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON ssafy.* TO 'dayflow'@'localhost';
FLUSH PRIVILEGES;
```

### 백엔드 프로젝트 생성

```bash
# Spring Initializr를 통한 프로젝트 생성
curl https://start.spring.io/starter.zip \
  -d type=gradle-project \
  -d language=java \
  -d bootVersion=3.2.1 \
  -d baseDir=dayflow-backend \
  -d groupId=com.dayflow \
  -d artifactId=dayflow-backend \
  -d name=DayFlow \
  -d packageName=com.dayflow.backend \
  -d packaging=jar \
  -d javaVersion=17 \
  -d dependencies=web,data-jpa,mysql,lombok,validation,security,actuator \
  -o dayflow-backend.zip

# 압축 해제 및 이동
unzip dayflow-backend.zip
cd dayflow-backend
```

### 애플리케이션 실행

```bash
# 개발 서버 실행
./gradlew bootRun

# 빌드
./gradlew build

# JAR 파일 실행
java -jar build/libs/dayflow-backend-0.0.1-SNAPSHOT.jar
```

### API 문서 확인
서버 실행 후 다음 URL에서 API 문서 확인:
```
http://localhost:8080/api/swagger-ui.html
```

---

## 📋 API 엔드포인트 (예정)

### 사용자 관리
```
POST   /api/auth/register          # 회원가입
POST   /api/auth/login             # 로그인
POST   /api/auth/logout            # 로그아웃
GET    /api/users/profile          # 프로필 조회
PUT    /api/users/profile          # 프로필 수정
```

### 장소 관리
```
GET    /api/locations              # 장소 목록 조회
POST   /api/locations              # 장소 등록
GET    /api/locations/{id}         # 장소 상세 조회
PUT    /api/locations/{id}         # 장소 수정
DELETE /api/locations/{id}         # 장소 삭제
```

### 일정 관리
```
GET    /api/schedules              # 일정 목록 조회
POST   /api/schedules              # 일정 등록
GET    /api/schedules/{id}         # 일정 상세 조회
PUT    /api/schedules/{id}         # 일정 수정
DELETE /api/schedules/{id}         # 일정 삭제
GET    /api/schedules/today        # 오늘 일정 조회
```

### AI 추천
```
GET    /api/recommendations        # 추천 목록 조회
GET    /api/recommendations/today  # 오늘의 추천
POST   /api/recommendations/{id}/accept   # 추천 수락
POST   /api/recommendations/{id}/reject   # 추천 거절
POST   /api/recommendations/{id}/feedback # 피드백 제출
```

### 활동 로그
```
GET    /api/activities             # 활동 로그 조회
POST   /api/activities             # 활동 기록
GET    /api/activities/stats       # 활동 통계
```

---

## 🔐 보안

### 인증 방식
- JWT (JSON Web Token) 기반 인증
- Access Token + Refresh Token 전략

### 비밀번호 암호화
- BCrypt 해싱 알고리즘 사용

### API 보안
- Spring Security 설정
- CORS 설정
- Rate Limiting (예정)

---

## 📊 데이터 플로우

### 1. 사용자 등록 및 로그인
```
User → Controller → Service → Repository → Database
                                          ↓
                                    JWT 발급 ← Security
```

### 2. AI 추천 생성
```
Scheduler → AI Service → Weather API
                      → Location Service
                      → Schedule Service
                      ↓
                  AI 추천 생성 → Database
                      ↓
                  Push Notification → User
```

### 3. 위치 기반 컨텍스트 감지
```
Mobile App → Location Update → Service
                             → 저장된 장소와 비교
                             → Arrival Action 트리거
                             → Push Notification
```

---

## 🧪 테스트

### 단위 테스트
```bash
# 전체 테스트 실행
./gradlew test

# 특정 테스트 클래스 실행
./gradlew test --tests UserServiceTest
```

### 통합 테스트
```bash
# 통합 테스트 실행
./gradlew integrationTest
```

---

## 🚧 개발 로드맵

### Phase 1: MVP (4주)
- [x] 프로젝트 기획
- [x] 데이터베이스 설계
- [x] 디자인 시스템 정의
- [ ] 백엔드 기본 구조 구축
- [ ] 사용자 인증 구현
- [ ] 기본 CRUD API 구현

### Phase 2: 핵심 기능 (4주)
- [ ] 일정 관리 기능
- [ ] 장소 관리 기능
- [ ] 날씨 API 연동
- [ ] 위치 기반 서비스 구현
- [ ] AI 추천 엔진 기본 구현

### Phase 3: AI & 최적화 (4주)
- [ ] AI 추천 알고리즘 고도화
- [ ] 사용자 패턴 분석
- [ ] 푸시 알림 시스템
- [ ] 성능 최적화

### Phase 4: 런칭 준비 (2주)
- [ ] 테스트 및 버그 수정
- [ ] 보안 강화
- [ ] 배포 자동화
- [ ] 모니터링 시스템 구축

---

## 🤝 기여 방법

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 라이선스

This project is licensed under the MIT License - see the LICENSE file for details

---

## 👥 팀

- **프로젝트 기획**: [Your Name]
- **백엔드 개발**: [Your Name]
- **프론트엔드 개발**: [Your Name]
- **디자인**: [Your Name]

---

## 📞 문의

- 이메일: your.email@example.com
- 프로젝트 링크: [https://github.com/yourusername/dayflow](https://github.com/yourusername/dayflow)

---

## 🙏 감사의 말

- OpenWeatherMap API
- Google Maps API
- Spring Boot Community
- React Native Community

---

**Made with ❤️ by DayFlow Team**
