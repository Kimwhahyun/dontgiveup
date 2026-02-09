package com.dayflow.backend.repository;

import com.dayflow.backend.model.AiRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface AiRecommendationRepository extends JpaRepository<AiRecommendation, Long> {

    List<AiRecommendation> findByUserUserIdOrderByCreatedAtDesc(Long userId);

    @Query("SELECT r FROM AiRecommendation r WHERE r.user.userId = :userId " +
            "AND r.recommendationTime >= :startOfDay AND r.recommendationTime < :endOfDay " +
            "ORDER BY r.priority DESC, r.recommendationTime ASC")
    List<AiRecommendation> findTodayRecommendations(@Param("userId") Long userId,
                                                     @Param("startOfDay") LocalDateTime startOfDay,
                                                     @Param("endOfDay") LocalDateTime endOfDay);

    List<AiRecommendation> findByUserUserIdAndRecommendationType(
            Long userId, AiRecommendation.RecommendationType type);
}
