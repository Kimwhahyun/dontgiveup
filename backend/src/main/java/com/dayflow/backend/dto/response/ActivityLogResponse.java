package com.dayflow.backend.dto.response;

import com.dayflow.backend.model.UserActivityLog;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
public class ActivityLogResponse {

    private Long activityId;
    private String activityType;
    private String activityData;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String weatherCondition;
    private BigDecimal temperature;
    private LocalDateTime activityTimestamp;
    private LocalDateTime createdAt;

    public static ActivityLogResponse from(UserActivityLog log) {
        return ActivityLogResponse.builder()
                .activityId(log.getActivityId())
                .activityType(log.getActivityType().name())
                .activityData(log.getActivityData())
                .latitude(log.getLatitude())
                .longitude(log.getLongitude())
                .weatherCondition(log.getWeatherCondition())
                .temperature(log.getTemperature())
                .activityTimestamp(log.getActivityTimestamp())
                .createdAt(log.getCreatedAt())
                .build();
    }
}
