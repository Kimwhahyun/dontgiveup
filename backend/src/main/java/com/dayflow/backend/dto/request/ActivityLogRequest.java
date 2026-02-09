package com.dayflow.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ActivityLogRequest {

    @NotNull(message = "활동 유형은 필수입니다")
    private String activityType;

    private String activityData;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String weatherCondition;
    private BigDecimal temperature;

    @NotNull(message = "활동 시간은 필수입니다")
    private LocalDateTime activityTimestamp;
}
