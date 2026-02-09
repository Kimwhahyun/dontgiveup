package com.dayflow.backend.repository;

import com.dayflow.backend.model.UserActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface UserActivityLogRepository extends JpaRepository<UserActivityLog, Long> {

    List<UserActivityLog> findByUserUserIdOrderByActivityTimestampDesc(Long userId);

    List<UserActivityLog> findByUserUserIdAndActivityTimestampBetween(
            Long userId, LocalDateTime start, LocalDateTime end);

    List<UserActivityLog> findByUserUserIdAndActivityType(
            Long userId, UserActivityLog.ActivityType activityType);
}
