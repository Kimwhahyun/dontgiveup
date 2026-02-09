package com.dayflow.backend.dto.response;

import com.dayflow.backend.model.Schedule;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
public class ScheduleResponse {

    private Long scheduleId;
    private String title;
    private String description;
    private Long locationId;
    private String locationName;
    private String customLocation;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer reminderMinutes;
    private Boolean weatherSensitive;
    private Boolean isCompleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ScheduleResponse from(Schedule schedule) {
        return ScheduleResponse.builder()
                .scheduleId(schedule.getScheduleId())
                .title(schedule.getTitle())
                .description(schedule.getDescription())
                .locationId(schedule.getLocation() != null ? schedule.getLocation().getLocationId() : null)
                .locationName(schedule.getLocation() != null ? schedule.getLocation().getLocationName() : null)
                .customLocation(schedule.getCustomLocation())
                .startTime(schedule.getStartTime())
                .endTime(schedule.getEndTime())
                .reminderMinutes(schedule.getReminderMinutes())
                .weatherSensitive(schedule.getWeatherSensitive())
                .isCompleted(schedule.getIsCompleted())
                .createdAt(schedule.getCreatedAt())
                .updatedAt(schedule.getUpdatedAt())
                .build();
    }
}
