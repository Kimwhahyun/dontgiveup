import { useState, useEffect, useRef } from "react";

const SCREENS = {
  HOME: "home",
  WEATHER: "weather",
  SCHEDULE: "schedule",
  LOCATION: "location",
  PROFILE: "profile",
};

// Cute emoji/icon component
const Icon = ({ children, size = 24 }) => (
  <span style={{ fontSize: size, lineHeight: 1 }}>{children}</span>
);

// Animated floating bubbles background
const FloatingBubbles = () => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          width: [40, 60, 30, 50, 35, 45][i],
          height: [40, 60, 30, 50, 35, 45][i],
          borderRadius: "50%",
          background: [
            "rgba(255,182,193,0.15)",
            "rgba(173,216,230,0.12)",
            "rgba(255,218,185,0.15)",
            "rgba(221,160,221,0.1)",
            "rgba(152,251,152,0.12)",
            "rgba(255,255,186,0.15)",
          ][i],
          left: `${[10, 75, 50, 85, 20, 60][i]}%`,
          top: `${[15, 30, 60, 70, 85, 45][i]}%`,
          animation: `floatBubble ${3 + i * 0.5}s ease-in-out infinite alternate`,
          animationDelay: `${i * 0.3}s`,
        }}
      />
    ))}
  </div>
);

// Status bar
const StatusBar = () => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "8px 20px 4px", fontSize: 12, fontWeight: 600, color: "#7a6b8a",
    fontFamily: "'Nunito', sans-serif",
  }}>
    <span>9:41</span>
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      <span style={{ fontSize: 10 }}>●●●●○</span>
      <span style={{ fontSize: 10 }}>WiFi</span>
      <span style={{ fontSize: 11 }}>🔋</span>
    </div>
  </div>
);

// Card component
const Card = ({ children, style = {}, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: "rgba(255,255,255,0.75)",
      backdropFilter: "blur(10px)",
      borderRadius: 20,
      padding: 16,
      boxShadow: "0 2px 16px rgba(180,160,200,0.12), 0 1px 4px rgba(0,0,0,0.04)",
      border: "1px solid rgba(255,255,255,0.6)",
      cursor: onClick ? "pointer" : "default",
      transition: "transform 0.2s, box-shadow 0.2s",
      ...style,
    }}
  >
    {children}
  </div>
);

// Mini badge
const Badge = ({ text, color = "#FFB6C1", textColor = "#8B4060" }) => (
  <span style={{
    background: color, color: textColor, fontSize: 10, fontWeight: 700,
    padding: "3px 10px", borderRadius: 20, letterSpacing: 0.3,
    fontFamily: "'Nunito', sans-serif",
  }}>
    {text}
  </span>
);

// ===== HOME SCREEN =====
const HomeScreen = () => {
  const [greeting, setGreeting] = useState("");
  const hour = 9;

  useEffect(() => {
    if (hour < 12) setGreeting("좋은 아침이에요! ☀️");
    else if (hour < 18) setGreeting("활기찬 오후예요! 🌤");
    else setGreeting("편안한 저녁이에요! 🌙");
  }, []);

  return (
    <div style={{ padding: "0 20px 100px", position: "relative", zIndex: 1 }}>
      {/* Header */}
      <div style={{ padding: "16px 0 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 13, color: "#b8a5c8", fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>2월 10일 월요일</div>
          <div style={{
            fontSize: 22, fontWeight: 800, color: "#5a4a6a",
            fontFamily: "'Nunito', sans-serif", marginTop: 2,
          }}>
            {greeting}
          </div>
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 16, overflow: "hidden",
          background: "linear-gradient(135deg, #FFD1DC, #FFB6C1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 3px 12px rgba(255,182,193,0.4)",
          fontSize: 24,
        }}>
          🐰
        </div>
      </div>

      {/* AI Summary Card */}
      <Card style={{
        marginTop: 16,
        background: "linear-gradient(135deg, #FFF0F5 0%, #F0F0FF 50%, #F0FFF0 100%)",
        border: "1.5px solid rgba(255,182,193,0.3)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -10, right: -10,
          width: 80, height: 80, borderRadius: "50%",
          background: "rgba(255,218,185,0.2)",
        }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{
            background: "linear-gradient(135deg, #FF9ED2, #C4A1FF)",
            borderRadius: 12, width: 32, height: 32,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(196,161,255,0.3)",
          }}>
            <span style={{ fontSize: 16 }}>✨</span>
          </div>
          <span style={{ fontWeight: 800, color: "#6a5a7a", fontSize: 14, fontFamily: "'Nunito', sans-serif" }}>
            오늘의 AI 브리핑
          </span>
          <Badge text="NEW" color="#E8F5E9" textColor="#4CAF50" />
        </div>
        <div style={{
          fontSize: 13.5, color: "#6a5a7a", lineHeight: 1.7,
          fontFamily: "'Nunito', sans-serif", fontWeight: 500,
        }}>
          오후 3시부터 비 예보가 있어요 🌧️<br/>
          <strong style={{ color: "#E8578A" }}>우산 꼭 챙기세요!</strong> 오전 회의 장소까지 약 30분 소요, <strong style={{ color: "#7B68EE" }}>8시 10분 출발</strong>을 추천해요.
        </div>
        <div style={{
          display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap",
        }}>
          {[
            { icon: "🌡️", text: "12°C", sub: "체감 9°" },
            { icon: "💧", text: "70%", sub: "습도" },
            { icon: "🚌", text: "30분", sub: "통근시간" },
          ].map((item, i) => (
            <div key={i} style={{
              flex: 1, minWidth: 80,
              background: "rgba(255,255,255,0.7)",
              borderRadius: 14, padding: "10px 12px",
              textAlign: "center",
              border: "1px solid rgba(255,255,255,0.8)",
            }}>
              <div style={{ fontSize: 18 }}>{item.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#5a4a6a", fontFamily: "'Nunito', sans-serif" }}>{item.text}</div>
              <div style={{ fontSize: 10, color: "#b8a5c8", fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Time-based Recommendations */}
      <div style={{ marginTop: 20 }}>
        <div style={{
          fontSize: 15, fontWeight: 800, color: "#5a4a6a", marginBottom: 12,
          fontFamily: "'Nunito', sans-serif",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <span>🕐</span> 시간대별 추천
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { time: "오전 9-12시", emoji: "💪", title: "집중 업무 시간", desc: "중요한 업무를 오전에 처리하세요", color: "#FFF3E0", border: "#FFE0B2", active: true },
            { time: "오후 12-1시", emoji: "🍱", title: "점심 추천", desc: "근처 한식당 '맛나분식' 평점 4.8", color: "#F3E5F5", border: "#E1BEE7", active: false },
            { time: "오후 6시~", emoji: "🏃", title: "가벼운 운동", desc: "비 오기 전 30분 산책 추천!", color: "#E8F5E9", border: "#C8E6C9", active: false },
          ].map((item, i) => (
            <Card key={i} style={{
              background: item.active ? item.color : "rgba(255,255,255,0.6)",
              border: item.active ? `1.5px solid ${item.border}` : "1px solid rgba(255,255,255,0.5)",
              padding: "14px 16px",
              display: "flex", alignItems: "center", gap: 14,
              transform: item.active ? "scale(1.01)" : "scale(1)",
              opacity: item.active ? 1 : 0.75,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: "rgba(255,255,255,0.8)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, flexShrink: 0,
                boxShadow: item.active ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
              }}>
                {item.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 800, color: "#5a4a6a", fontFamily: "'Nunito', sans-serif" }}>
                    {item.title}
                  </span>
                  {item.active && <Badge text="지금" color="#FFCDD2" textColor="#C62828" />}
                </div>
                <div style={{ fontSize: 11, color: "#a090b0", fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>
                  {item.time}
                </div>
                <div style={{ fontSize: 12, color: "#7a6b8a", fontWeight: 500, marginTop: 3, fontFamily: "'Nunito', sans-serif" }}>
                  {item.desc}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: 20 }}>
        <div style={{
          fontSize: 15, fontWeight: 800, color: "#5a4a6a", marginBottom: 12,
          fontFamily: "'Nunito', sans-serif",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <span>⚡</span> 빠른 실행
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { emoji: "🧭", label: "근처 탐색", color: "linear-gradient(135deg, #E3F2FD, #BBDEFB)" },
            { emoji: "📝", label: "일정 추가", color: "linear-gradient(135deg, #FFF3E0, #FFE0B2)" },
            { emoji: "🎯", label: "집중 모드", color: "linear-gradient(135deg, #F3E5F5, #E1BEE7)" },
            { emoji: "📊", label: "하루 리포트", color: "linear-gradient(135deg, #E8F5E9, #C8E6C9)" },
          ].map((item, i) => (
            <Card key={i} style={{
              background: item.color,
              textAlign: "center", padding: "18px 12px",
              border: "1px solid rgba(255,255,255,0.6)",
            }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{item.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#5a4a6a", fontFamily: "'Nunito', sans-serif" }}>
                {item.label}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===== WEATHER SCREEN =====
const WeatherScreen = () => (
  <div style={{ padding: "0 20px 100px", position: "relative", zIndex: 1 }}>
    <div style={{
      fontSize: 20, fontWeight: 800, color: "#5a4a6a", padding: "16px 0 4px",
      fontFamily: "'Nunito', sans-serif",
    }}>
      날씨 & 라이프스타일 🌈
    </div>
    <div style={{ fontSize: 12, color: "#b8a5c8", fontWeight: 600, marginBottom: 16, fontFamily: "'Nunito', sans-serif" }}>
      날씨에 딱 맞는 하루를 보내요
    </div>

    {/* Current Weather */}
    <Card style={{
      background: "linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 100%)",
      textAlign: "center", padding: "24px 16px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 10, left: 20, fontSize: 60, opacity: 0.15,
      }}>🌤</div>
      <div style={{ fontSize: 52, marginBottom: 4 }}>⛅</div>
      <div style={{ fontSize: 36, fontWeight: 800, color: "#5a4a6a", fontFamily: "'Nunito', sans-serif" }}>
        12°C
      </div>
      <div style={{ fontSize: 13, color: "#8a7a9a", fontWeight: 600, fontFamily: "'Nunito', sans-serif", marginTop: 2 }}>
        구름 많음 · 체감 9°C
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16 }}>
        {[
          { label: "습도", value: "70%", icon: "💧" },
          { label: "바람", value: "3m/s", icon: "🌬️" },
          { label: "미세먼지", value: "좋음", icon: "😊" },
        ].map((w, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.7)", borderRadius: 14, padding: "10px 14px",
            minWidth: 72,
          }}>
            <div style={{ fontSize: 18 }}>{w.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5a4a6a", fontFamily: "'Nunito', sans-serif" }}>{w.value}</div>
            <div style={{ fontSize: 10, color: "#b8a5c8", fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>{w.label}</div>
          </div>
        ))}
      </div>
    </Card>

    {/* Hourly Forecast */}
    <div style={{ marginTop: 18, overflowX: "auto", display: "flex", gap: 8, paddingBottom: 4 }}>
      {[
        { time: "10시", icon: "⛅", temp: "12°" },
        { time: "11시", icon: "☁️", temp: "13°" },
        { time: "12시", icon: "☁️", temp: "14°" },
        { time: "1시", icon: "🌧️", temp: "13°" },
        { time: "2시", icon: "🌧️", temp: "12°" },
        { time: "3시", icon: "🌧️", temp: "11°" },
        { time: "4시", icon: "⛅", temp: "11°" },
      ].map((h, i) => (
        <div key={i} style={{
          flexShrink: 0,
          background: i === 3 ? "linear-gradient(135deg,#FFE0EC,#FFD1DC)" : "rgba(255,255,255,0.65)",
          borderRadius: 16, padding: "12px 14px", textAlign: "center",
          border: i === 3 ? "1.5px solid #FFB6C1" : "1px solid rgba(255,255,255,0.5)",
          minWidth: 56,
        }}>
          <div style={{ fontSize: 10, color: "#a090b0", fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>{h.time}</div>
          <div style={{ fontSize: 22, margin: "6px 0" }}>{h.icon}</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#5a4a6a", fontFamily: "'Nunito', sans-serif" }}>{h.temp}</div>
        </div>
      ))}
    </div>

    {/* Lifestyle Suggestions */}
    <div style={{ marginTop: 20 }}>
      <div style={{
        fontSize: 15, fontWeight: 800, color: "#5a4a6a", marginBottom: 12,
        fontFamily: "'Nunito', sans-serif",
      }}>
        🌿 날씨 맞춤 제안
      </div>
      {[
        { emoji: "☂️", title: "우산 필수!", desc: "오후 1시부터 비가 와요. 접이식 우산 챙기세요!", bg: "#FFF0F5" },
        { emoji: "👕", title: "겉옷 챙기세요", desc: "낮과 밤 기온차가 5도 이상이에요", bg: "#F0F7FF" },
        { emoji: "🧺", title: "빨래는 내일!", desc: "내일은 맑고 건조해서 빨래하기 딱 좋아요", bg: "#F5FFF0" },
        { emoji: "🚗", title: "세차는 목요일에", desc: "수~목 비 그치고 금요일까지 맑은 날씨", bg: "#FFFCF0" },
      ].map((s, i) => (
        <Card key={i} style={{
          background: s.bg, marginBottom: 8, padding: "14px 16px",
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{
            fontSize: 26, width: 44, height: 44, borderRadius: 14,
            background: "rgba(255,255,255,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>{s.emoji}</div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 800, color: "#5a4a6a", fontFamily: "'Nunito', sans-serif" }}>{s.title}</div>
            <div style={{ fontSize: 11.5, color: "#8a7a9a", fontWeight: 500, marginTop: 2, fontFamily: "'Nunito', sans-serif" }}>{s.desc}</div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

// ===== SCHEDULE SCREEN =====
const ScheduleScreen = () => (
  <div style={{ padding: "0 20px 100px", position: "relative", zIndex: 1 }}>
    <div style={{
      fontSize: 20, fontWeight: 800, color: "#5a4a6a", padding: "16px 0 4px",
      fontFamily: "'Nunito', sans-serif",
    }}>
      오늘의 일정 📋
    </div>
    <div style={{ fontSize: 12, color: "#b8a5c8", fontWeight: 600, marginBottom: 16, fontFamily: "'Nunito', sans-serif" }}>
      AI가 정리한 하루 타임라인
    </div>

    {/* Timeline */}
    <div style={{ position: "relative", paddingLeft: 28 }}>
      {/* Timeline line */}
      <div style={{
        position: "absolute", left: 9, top: 8, bottom: 8,
        width: 2, background: "linear-gradient(to bottom, #FFB6C1, #C4A1FF, #87CEEB)",
        borderRadius: 2,
      }} />

      {[
        { time: "08:10", title: "🚌 출발 시간", desc: "회의 장소까지 30분 · 지하철 2호선", color: "#FFF3E0", dot: "#FFB74D", active: false },
        { time: "09:00", title: "💼 팀 회의", desc: "3층 회의실 · 프로젝트 진행 상황 공유", color: "#E8EAF6", dot: "#7986CB", active: true },
        { time: "10:30", title: "💻 개발 작업", desc: "무지개별 앱 UI 작업 · 집중 모드 ON", color: "#FCE4EC", dot: "#F48FB1", active: false },
        { time: "12:00", title: "🍱 점심시간", desc: "AI 추천: 근처 '맛나분식' 비빔밥", color: "#F3E5F5", dot: "#CE93D8", active: false },
        { time: "14:00", title: "📚 알고리즘 스터디", desc: "BFS/DFS 복습 · 백준 문제풀이", color: "#E0F7FA", dot: "#4DD0E1", active: false },
        { time: "15:00", title: "🌧️ 비 시작 예상", desc: "우산 챙겼는지 확인하세요!", color: "#FFF0F5", dot: "#F48FB1", active: false },
        { time: "18:00", title: "🏠 퇴근", desc: "지하철 혼잡도: 보통 · 18:10 출발 추천", color: "#E8F5E9", dot: "#81C784", active: false },
      ].map((item, i) => (
        <div key={i} style={{
          position: "relative", marginBottom: 12,
          display: "flex", alignItems: "flex-start", gap: 14,
        }}>
          {/* Dot */}
          <div style={{
            position: "absolute", left: -24, top: 14,
            width: item.active ? 14 : 10,
            height: item.active ? 14 : 10,
            borderRadius: "50%",
            background: item.dot,
            border: item.active ? "3px solid white" : "2px solid white",
            boxShadow: item.active ? `0 0 8px ${item.dot}` : `0 1px 3px rgba(0,0,0,0.1)`,
            transition: "all 0.3s",
          }} />

          <Card style={{
            flex: 1,
            background: item.active ? item.color : "rgba(255,255,255,0.6)",
            border: item.active ? "1.5px solid rgba(121,134,203,0.3)" : "1px solid rgba(255,255,255,0.5)",
            padding: "12px 14px",
            opacity: item.active ? 1 : 0.8,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, color: "#5a4a6a", fontFamily: "'Nunito', sans-serif" }}>
                {item.title}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {item.active && <Badge text="진행중" color="#C5CAE9" textColor="#3949AB" />}
                <span style={{ fontSize: 11, color: "#b8a5c8", fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>
                  {item.time}
                </span>
              </div>
            </div>
            <div style={{ fontSize: 11.5, color: "#8a7a9a", fontWeight: 500, marginTop: 4, fontFamily: "'Nunito', sans-serif" }}>
              {item.desc}
            </div>
          </Card>
        </div>
      ))}
    </div>

    {/* Evening Summary */}
    <Card style={{
      marginTop: 8,
      background: "linear-gradient(135deg, #EDE7F6, #FCE4EC)",
      border: "1.5px solid rgba(206,147,216,0.2)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 18 }}>🌙</span>
        <span style={{ fontSize: 14, fontWeight: 800, color: "#5a4a6a", fontFamily: "'Nunito', sans-serif" }}>
          저녁 하루 리뷰
        </span>
      </div>
      <div style={{ fontSize: 12, color: "#7a6b8a", fontWeight: 500, lineHeight: 1.7, fontFamily: "'Nunito', sans-serif" }}>
        오늘 <strong style={{ color: "#7B68EE" }}>5개 일정</strong>을 완료했어요! 🎉<br />
        내일은 날씨가 맑아요. 빨래하기 좋은 날이니 참고하세요 ☀️
      </div>
    </Card>
  </div>
);

// ===== LOCATION SCREEN =====
const LocationScreen = () => (
  <div style={{ padding: "0 20px 100px", position: "relative", zIndex: 1 }}>
    <div style={{
      fontSize: 20, fontWeight: 800, color: "#5a4a6a", padding: "16px 0 4px",
      fontFamily: "'Nunito', sans-serif",
    }}>
      위치 컨텍스트 📍
    </div>
    <div style={{ fontSize: 12, color: "#b8a5c8", fontWeight: 600, marginBottom: 16, fontFamily: "'Nunito', sans-serif" }}>
      장소에 맞는 맞춤 정보를 드려요
    </div>

    {/* Current Location */}
    <Card style={{
      background: "linear-gradient(135deg, #E8F5E9, #F1F8E9)",
      border: "1.5px solid rgba(129,199,132,0.2)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -15, right: -15, fontSize: 60, opacity: 0.1 }}>📍</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%", background: "#4CAF50",
          boxShadow: "0 0 6px rgba(76,175,80,0.5)",
          animation: "pulse 2s infinite",
        }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: "#4CAF50", fontFamily: "'Nunito', sans-serif" }}>현재 위치</span>
      </div>
      <div style={{ fontSize: 17, fontWeight: 800, color: "#5a4a6a", fontFamily: "'Nunito', sans-serif" }}>
        🏢 멀티캠퍼스 역삼
      </div>
      <div style={{ fontSize: 11.5, color: "#8a7a9a", fontWeight: 500, marginTop: 3, fontFamily: "'Nunito', sans-serif" }}>
        서울특별시 강남구 역삼동 · 도착 08:45
      </div>
    </Card>

    {/* Context Actions */}
    <div style={{ marginTop: 16 }}>
      <div style={{
        fontSize: 14, fontWeight: 800, color: "#5a4a6a", marginBottom: 10,
        fontFamily: "'Nunito', sans-serif",
      }}>
        ✨ 회사 도착 모드 활성화
      </div>
      {[
        { emoji: "📋", title: "오늘 할 일", desc: "팀 회의 참석, UI 작업, 알고리즘 스터디", bg: "#FFF8E1", tag: "업무" },
        { emoji: "☕", title: "근처 카페", desc: "스타벅스 역삼역점 (도보 3분) · 자리 여유", bg: "#FFF0F5", tag: "추천" },
        { emoji: "🍽️", title: "점심 맛집", desc: "맛나분식 (도보 5분) · 비빔밥 추천", bg: "#F3E5F5", tag: "맛집" },
        { emoji: "⏱️", title: "집중 타이머", desc: "포모도로 25분 · 생산성 모드 시작", bg: "#E3F2FD", tag: "생산성" },
      ].map((item, i) => (
        <Card key={i} style={{
          background: item.bg, marginBottom: 8, padding: "12px 14px",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            fontSize: 24, width: 42, height: 42, borderRadius: 13,
            background: "rgba(255,255,255,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>{item.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#5a4a6a", fontFamily: "'Nunito', sans-serif" }}>{item.title}</span>
              <Badge text={item.tag} />
            </div>
            <div style={{ fontSize: 11, color: "#8a7a9a", fontWeight: 500, marginTop: 2, fontFamily: "'Nunito', sans-serif" }}>{item.desc}</div>
          </div>
          <div style={{ fontSize: 16, color: "#c8b8d8" }}>›</div>
        </Card>
      ))}
    </div>

    {/* Saved Places */}
    <div style={{ marginTop: 18 }}>
      <div style={{
        fontSize: 14, fontWeight: 800, color: "#5a4a6a", marginBottom: 10,
        fontFamily: "'Nunito', sans-serif",
      }}>
        💾 저장된 장소
      </div>
      <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
        {[
          { emoji: "🏠", name: "우리 집", dist: "12km" },
          { emoji: "🏢", name: "멀티캠퍼스", dist: "여기" },
          { emoji: "☕", name: "단골 카페", dist: "0.5km" },
          { emoji: "🏋️", name: "헬스장", dist: "1.2km" },
        ].map((p, i) => (
          <Card key={i} style={{
            flexShrink: 0, textAlign: "center", padding: "14px 16px",
            minWidth: 88,
            background: i === 1 ? "linear-gradient(135deg,#E8F5E9,#C8E6C9)" : "rgba(255,255,255,0.65)",
            border: i === 1 ? "1.5px solid rgba(129,199,132,0.3)" : "1px solid rgba(255,255,255,0.5)",
          }}>
            <div style={{ fontSize: 26, marginBottom: 4 }}>{p.emoji}</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#5a4a6a", fontFamily: "'Nunito', sans-serif" }}>{p.name}</div>
            <div style={{ fontSize: 10, color: "#b8a5c8", fontWeight: 600, marginTop: 2, fontFamily: "'Nunito', sans-serif" }}>{p.dist}</div>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

// ===== PROFILE SCREEN =====
const ProfileScreen = () => (
  <div style={{ padding: "0 20px 100px", position: "relative", zIndex: 1 }}>
    <div style={{
      fontSize: 20, fontWeight: 800, color: "#5a4a6a", padding: "16px 0 16px",
      fontFamily: "'Nunito', sans-serif",
    }}>
      위젯 & 설정 ⚙️
    </div>

    {/* Widget Preview */}
    <div style={{ marginBottom: 20 }}>
      <div style={{
        fontSize: 14, fontWeight: 800, color: "#5a4a6a", marginBottom: 10,
        fontFamily: "'Nunito', sans-serif",
      }}>
        📱 홈 위젯 미리보기
      </div>

      {/* Large Widget */}
      <Card style={{
        background: "linear-gradient(135deg, #FFF0F5 0%, #F0F0FF 50%, #F0FFF0 100%)",
        padding: 16, marginBottom: 10,
        border: "1.5px solid rgba(255,182,193,0.2)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 16 }}>🌤</span>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#5a4a6a", fontFamily: "'Nunito', sans-serif" }}>12°C</span>
            <span style={{ fontSize: 11, color: "#b8a5c8", fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>구름많음</span>
          </div>
          <Badge text="DayFlow" color="#F3E5F5" textColor="#9C27B0" />
        </div>
        <div style={{
          background: "rgba(255,255,255,0.6)", borderRadius: 14, padding: "10px 14px", marginBottom: 8,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ fontSize: 16 }}>💼</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#5a4a6a", fontFamily: "'Nunito', sans-serif" }}>다음 일정: 팀 회의</div>
            <div style={{ fontSize: 10, color: "#b8a5c8", fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>1시간 23분 남음</div>
          </div>
        </div>
        <div style={{
          background: "rgba(255,232,240,0.5)", borderRadius: 14, padding: "8px 14px",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ fontSize: 14 }}>✨</span>
          <span style={{ fontSize: 11, color: "#8a7a9a", fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>
            오후에 비 예보 ☂️ 우산 챙기세요!
          </span>
        </div>
      </Card>

      {/* Small Widgets */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Card style={{
          background: "linear-gradient(135deg, #E3F2FD, #BBDEFB)",
          textAlign: "center", padding: 14,
        }}>
          <div style={{ fontSize: 24 }}>⛅</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#5a4a6a", fontFamily: "'Nunito', sans-serif" }}>12°</div>
          <div style={{ fontSize: 10, color: "#7a9ab8", fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>오후 비 예보</div>
        </Card>
        <Card style={{
          background: "linear-gradient(135deg, #FCE4EC, #F8BBD9)",
          textAlign: "center", padding: 14,
        }}>
          <div style={{ fontSize: 24 }}>⏰</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#5a4a6a", fontFamily: "'Nunito', sans-serif" }}>1:23</div>
          <div style={{ fontSize: 10, color: "#9a7a8a", fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>다음 일정까지</div>
        </Card>
      </div>
    </div>

    {/* Widget Settings */}
    <div style={{ marginBottom: 18 }}>
      <div style={{
        fontSize: 14, fontWeight: 800, color: "#5a4a6a", marginBottom: 10,
        fontFamily: "'Nunito', sans-serif",
      }}>
        🎨 위젯 커스터마이징
      </div>
      {[
        { label: "날씨 표시", on: true },
        { label: "다음 일정", on: true },
        { label: "AI 추천", on: true },
        { label: "교통 정보", on: false },
      ].map((s, i) => (
        <div key={i} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "12px 0",
          borderBottom: i < 3 ? "1px solid rgba(200,185,215,0.15)" : "none",
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#6a5a7a", fontFamily: "'Nunito', sans-serif" }}>{s.label}</span>
          <div style={{
            width: 44, height: 24, borderRadius: 12,
            background: s.on ? "linear-gradient(135deg, #FF9ED2, #C4A1FF)" : "#E0D8E8",
            position: "relative", cursor: "pointer",
            transition: "background 0.3s",
            boxShadow: s.on ? "0 2px 6px rgba(196,161,255,0.3)" : "none",
          }}>
            <div style={{
              position: "absolute",
              top: 3, left: s.on ? 23 : 3,
              width: 18, height: 18, borderRadius: "50%",
              background: "white",
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
              transition: "left 0.3s",
            }} />
          </div>
        </div>
      ))}
    </div>

    {/* Settings */}
    <div>
      <div style={{
        fontSize: 14, fontWeight: 800, color: "#5a4a6a", marginBottom: 10,
        fontFamily: "'Nunito', sans-serif",
      }}>
        ⚙️ 앱 설정
      </div>
      {[
        { emoji: "👤", label: "프로필 관리" },
        { emoji: "🔔", label: "알림 설정" },
        { emoji: "📍", label: "장소 관리" },
        { emoji: "🎨", label: "테마 변경" },
        { emoji: "❓", label: "도움말 & 피드백" },
      ].map((s, i) => (
        <Card key={i} style={{
          marginBottom: 6, padding: "12px 14px",
          display: "flex", alignItems: "center", gap: 12,
          background: "rgba(255,255,255,0.55)",
        }}>
          <span style={{ fontSize: 18 }}>{s.emoji}</span>
          <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "#6a5a7a", fontFamily: "'Nunito', sans-serif" }}>{s.label}</span>
          <span style={{ fontSize: 14, color: "#c8b8d8" }}>›</span>
        </Card>
      ))}
    </div>
  </div>
);

// ===== MAIN APP =====
export default function DayFlowApp() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [screen]);

  const navItems = [
    { id: SCREENS.HOME, icon: "🏠", label: "홈" },
    { id: SCREENS.WEATHER, icon: "🌤", label: "날씨" },
    { id: SCREENS.SCHEDULE, icon: "📋", label: "일정" },
    { id: SCREENS.LOCATION, icon: "📍", label: "위치" },
    { id: SCREENS.PROFILE, icon: "⚙️", label: "설정" },
  ];

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #FFF5F5, #F5F0FF, #F0F8FF)",
      padding: "20px 0",
      fontFamily: "'Nunito', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes floatBubble {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-12px) scale(1.05); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        * { -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Phone Frame */}
      <div style={{
        width: 375, height: 812,
        borderRadius: 44,
        background: "linear-gradient(180deg, #FFF8FA 0%, #FAF5FF 30%, #F5FAFF 60%, #F8FFF5 100%)",
        boxShadow: "0 20px 60px rgba(100,80,120,0.15), 0 4px 20px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(255,255,255,0.8)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}>
        <FloatingBubbles />

        {/* Dynamic Island */}
        <div style={{
          position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
          width: 120, height: 28, borderRadius: 20,
          background: "#1a1a2e",
          zIndex: 10,
        }} />

        <StatusBar />

        {/* Content */}
        <div ref={scrollRef} style={{
          flex: 1, overflowY: "auto", overflowX: "hidden",
          paddingTop: 24,
          scrollBehavior: "smooth",
        }}>
          {screen === SCREENS.HOME && <HomeScreen />}
          {screen === SCREENS.WEATHER && <WeatherScreen />}
          {screen === SCREENS.SCHEDULE && <ScheduleScreen />}
          {screen === SCREENS.LOCATION && <LocationScreen />}
          {screen === SCREENS.PROFILE && <ProfileScreen />}
        </div>

        {/* Bottom Navigation */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(200,185,215,0.15)",
          padding: "8px 12px 28px",
          display: "flex", justifyContent: "space-around",
          zIndex: 5,
        }}>
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setScreen(item.id)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                cursor: "pointer",
                padding: "4px 8px",
                borderRadius: 12,
                transition: "all 0.2s",
                transform: screen === item.id ? "translateY(-2px)" : "none",
              }}
            >
              <div style={{
                fontSize: 22,
                filter: screen === item.id ? "none" : "grayscale(0.5)",
                opacity: screen === item.id ? 1 : 0.5,
                transition: "all 0.2s",
              }}>
                {item.icon}
              </div>
              <span style={{
                fontSize: 9,
                fontWeight: screen === item.id ? 800 : 600,
                color: screen === item.id ? "#7B68EE" : "#b8a5c8",
                fontFamily: "'Nunito', sans-serif",
                transition: "all 0.2s",
              }}>
                {item.label}
              </span>
              {screen === item.id && (
                <div style={{
                  width: 4, height: 4, borderRadius: "50%",
                  background: "linear-gradient(135deg, #FF9ED2, #7B68EE)",
                  marginTop: -1,
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Home Indicator */}
        <div style={{
          position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
          width: 134, height: 5, borderRadius: 3,
          background: "rgba(100,80,120,0.15)",
          zIndex: 6,
        }} />
      </div>
    </div>
  );
}
