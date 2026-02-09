package com.dayflow.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "ai_recommendations", indexes = {
        @Index(name = "idx_user_time", columnList = "user_id, recommendation_time")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiRecommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recommendation_id")
    private Long recommendationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "recommendation_type", nullable = false)
    private RecommendationType recommendationType;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "recommendation_time", nullable = false)
    private LocalDateTime recommendationTime;

    @Column(name = "context_data", columnDefinition = "TEXT")
    private String contextData;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority")
    @Builder.Default
    private Priority priority = Priority.MEDIUM;

    @Column(name = "is_viewed")
    @Builder.Default
    private Boolean isViewed = false;

    @Column(name = "is_accepted")
    private Boolean isAccepted;

    @Column(name = "user_feedback", columnDefinition = "TEXT")
    private String userFeedback;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public enum RecommendationType {
        ACTIVITY, FOOD, TRANSPORT, WEATHER_ACTION, PRODUCTIVITY, HEALTH
    }

    public enum Priority {
        LOW, MEDIUM, HIGH
    }
}
