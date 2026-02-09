package com.dayflow.backend.repository;

import com.dayflow.backend.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findByUserUserId(Long userId);

    @Query("SELECT s FROM Schedule s WHERE s.user.userId = :userId " +
            "AND s.startTime >= :startOfDay AND s.startTime < :endOfDay " +
            "ORDER BY s.startTime ASC")
    List<Schedule> findTodaySchedules(@Param("userId") Long userId,
                                      @Param("startOfDay") LocalDateTime startOfDay,
                                      @Param("endOfDay") LocalDateTime endOfDay);

    List<Schedule> findByUserUserIdAndStartTimeBetweenOrderByStartTimeAsc(
            Long userId, LocalDateTime start, LocalDateTime end);
}
