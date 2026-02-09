package com.dayflow.backend.dto.response;

import com.dayflow.backend.model.AiRecommendation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
public class RecommendationResponse {

    private Long recommendationId;
    private String recommendationType;
    private String title;
    private String content;
    private LocalDateTime recommendationTime;
    private String contextData;
    private String priority;
    private Boolean isViewed;
    private Boolean isAccepted;
    private String userFeedback;
    private LocalDateTime createdAt;

    public static RecommendationResponse from(AiRecommendation rec) {
        return RecommendationResponse.builder()
                .recommendationId(rec.getRecommendationId())
                .recommendationType(rec.getRecommendationType().name())
                .title(rec.getTitle())
                .content(rec.getContent())
                .recommendationTime(rec.getRecommendationTime())
                .contextData(rec.getContextData())
                .priority(rec.getPriority().name())
                .isViewed(rec.getIsViewed())
                .isAccepted(rec.getIsAccepted())
                .userFeedback(rec.getUserFeedback())
                .createdAt(rec.getCreatedAt())
                .build();
    }
}
