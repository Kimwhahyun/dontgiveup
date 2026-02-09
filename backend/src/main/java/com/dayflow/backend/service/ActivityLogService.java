package com.dayflow.backend.service;

import com.dayflow.backend.dto.request.ActivityLogRequest;
import com.dayflow.backend.dto.response.ActivityLogResponse;
import com.dayflow.backend.exception.ResourceNotFoundException;
import com.dayflow.backend.model.User;
import com.dayflow.backend.model.UserActivityLog;
import com.dayflow.backend.repository.UserActivityLogRepository;
import com.dayflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityLogService {

    private final UserActivityLogRepository activityLogRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<ActivityLogResponse> getActivityLogs(Long userId) {
        return activityLogRepository.findByUserUserIdOrderByActivityTimestampDesc(userId).stream()
                .map(ActivityLogResponse::from)
                .toList();
    }

    @Transactional
    public ActivityLogResponse createActivityLog(Long userId, ActivityLogRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다"));

        UserActivityLog log = UserActivityLog.builder()
                .user(user)
                .activityType(UserActivityLog.ActivityType.valueOf(request.getActivityType().toUpperCase()))
                .activityData(request.getActivityData())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .weatherCondition(request.getWeatherCondition())
                .temperature(request.getTemperature())
                .activityTimestamp(request.getActivityTimestamp())
                .build();

        activityLogRepository.save(log);
        return ActivityLogResponse.from(log);
    }

    @Transactional(readOnly = true)
    public List<ActivityLogResponse> getActivityStats(Long userId) {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(LocalTime.MAX);
        return activityLogRepository.findByUserUserIdAndActivityTimestampBetween(userId, startOfDay, endOfDay)
                .stream()
                .map(ActivityLogResponse::from)
                .toList();
    }
}
