package com.dayflow.backend.service;

import com.dayflow.backend.dto.response.RecommendationResponse;
import com.dayflow.backend.exception.ResourceNotFoundException;
import com.dayflow.backend.model.AiRecommendation;
import com.dayflow.backend.repository.AiRecommendationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final AiRecommendationRepository recommendationRepository;

    @Transactional(readOnly = true)
    public List<RecommendationResponse> getRecommendations(Long userId) {
        return recommendationRepository.findByUserUserIdOrderByCreatedAtDesc(userId).stream()
                .map(RecommendationResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<RecommendationResponse> getTodayRecommendations(Long userId) {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(LocalTime.MAX);
        return recommendationRepository.findTodayRecommendations(userId, startOfDay, endOfDay).stream()
                .map(RecommendationResponse::from)
                .toList();
    }

    @Transactional
    public RecommendationResponse acceptRecommendation(Long recommendationId) {
        AiRecommendation rec = recommendationRepository.findById(recommendationId)
                .orElseThrow(() -> new ResourceNotFoundException("추천을 찾을 수 없습니다"));
        rec.setIsAccepted(true);
        rec.setIsViewed(true);
        recommendationRepository.save(rec);
        return RecommendationResponse.from(rec);
    }

    @Transactional
    public RecommendationResponse rejectRecommendation(Long recommendationId) {
        AiRecommendation rec = recommendationRepository.findById(recommendationId)
                .orElseThrow(() -> new ResourceNotFoundException("추천을 찾을 수 없습니다"));
        rec.setIsAccepted(false);
        rec.setIsViewed(true);
        recommendationRepository.save(rec);
        return RecommendationResponse.from(rec);
    }

    @Transactional
    public RecommendationResponse submitFeedback(Long recommendationId, String feedback) {
        AiRecommendation rec = recommendationRepository.findById(recommendationId)
                .orElseThrow(() -> new ResourceNotFoundException("추천을 찾을 수 없습니다"));
        rec.setUserFeedback(feedback);
        rec.setIsViewed(true);
        recommendationRepository.save(rec);
        return RecommendationResponse.from(rec);
    }
}
