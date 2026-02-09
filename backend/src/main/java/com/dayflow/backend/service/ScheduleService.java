package com.dayflow.backend.service;

import com.dayflow.backend.dto.request.ScheduleRequest;
import com.dayflow.backend.dto.response.ScheduleResponse;
import com.dayflow.backend.exception.ResourceNotFoundException;
import com.dayflow.backend.model.Schedule;
import com.dayflow.backend.model.User;
import com.dayflow.backend.model.UserLocation;
import com.dayflow.backend.repository.ScheduleRepository;
import com.dayflow.backend.repository.UserLocationRepository;
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
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    private final UserLocationRepository locationRepository;

    @Transactional(readOnly = true)
    public List<ScheduleResponse> getSchedules(Long userId) {
        return scheduleRepository.findByUserUserId(userId).stream()
                .map(ScheduleResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public ScheduleResponse getSchedule(Long scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ResourceNotFoundException("일정을 찾을 수 없습니다"));
        return ScheduleResponse.from(schedule);
    }

    @Transactional(readOnly = true)
    public List<ScheduleResponse> getTodaySchedules(Long userId) {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(LocalTime.MAX);
        return scheduleRepository.findTodaySchedules(userId, startOfDay, endOfDay).stream()
                .map(ScheduleResponse::from)
                .toList();
    }

    @Transactional
    public ScheduleResponse createSchedule(Long userId, ScheduleRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다"));

        UserLocation location = null;
        if (request.getLocationId() != null) {
            location = locationRepository.findById(request.getLocationId())
                    .orElseThrow(() -> new ResourceNotFoundException("장소를 찾을 수 없습니다"));
        }

        Schedule schedule = Schedule.builder()
                .user(user)
                .title(request.getTitle())
                .description(request.getDescription())
                .location(location)
                .customLocation(request.getCustomLocation())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .reminderMinutes(request.getReminderMinutes() != null ? request.getReminderMinutes() : 30)
                .weatherSensitive(request.getWeatherSensitive() != null ? request.getWeatherSensitive() : false)
                .build();

        scheduleRepository.save(schedule);
        return ScheduleResponse.from(schedule);
    }

    @Transactional
    public ScheduleResponse updateSchedule(Long scheduleId, ScheduleRequest request) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ResourceNotFoundException("일정을 찾을 수 없습니다"));

        schedule.setTitle(request.getTitle());
        schedule.setDescription(request.getDescription());
        schedule.setCustomLocation(request.getCustomLocation());
        schedule.setStartTime(request.getStartTime());
        schedule.setEndTime(request.getEndTime());

        if (request.getLocationId() != null) {
            UserLocation location = locationRepository.findById(request.getLocationId())
                    .orElseThrow(() -> new ResourceNotFoundException("장소를 찾을 수 없습니다"));
            schedule.setLocation(location);
        } else {
            schedule.setLocation(null);
        }

        if (request.getReminderMinutes() != null) schedule.setReminderMinutes(request.getReminderMinutes());
        if (request.getWeatherSensitive() != null) schedule.setWeatherSensitive(request.getWeatherSensitive());

        scheduleRepository.save(schedule);
        return ScheduleResponse.from(schedule);
    }

    @Transactional
    public void deleteSchedule(Long scheduleId) {
        if (!scheduleRepository.existsById(scheduleId)) {
            throw new ResourceNotFoundException("일정을 찾을 수 없습니다");
        }
        scheduleRepository.deleteById(scheduleId);
    }
}
