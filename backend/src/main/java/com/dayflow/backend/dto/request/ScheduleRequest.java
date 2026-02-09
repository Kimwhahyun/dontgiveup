package com.dayflow.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleRequest {

    @NotBlank(message = "일정 제목은 필수입니다")
    private String title;

    private String description;
    private Long locationId;
    private String customLocation;

    @NotNull(message = "시작 시간은 필수입니다")
    private LocalDateTime startTime;

    @NotNull(message = "종료 시간은 필수입니다")
    private LocalDateTime endTime;

    private Integer reminderMinutes;
    private Boolean weatherSensitive;
}
