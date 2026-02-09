package com.dayflow.backend.controller;

import com.dayflow.backend.dto.request.FeedbackRequest;
import com.dayflow.backend.dto.response.ApiResponse;
import com.dayflow.backend.dto.response.RecommendationResponse;
import com.dayflow.backend.security.CustomUserDetails;
import com.dayflow.backend.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<RecommendationResponse>>> getRecommendations(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        List<RecommendationResponse> response = recommendationService.getRecommendations(userDetails.getUserId());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/today")
    public ResponseEntity<ApiResponse<List<RecommendationResponse>>> getTodayRecommendations(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        List<RecommendationResponse> response = recommendationService.getTodayRecommendations(userDetails.getUserId());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping("/{id}/accept")
    public ResponseEntity<ApiResponse<RecommendationResponse>> acceptRecommendation(@PathVariable Long id) {
        RecommendationResponse response = recommendationService.acceptRecommendation(id);
        return ResponseEntity.ok(ApiResponse.success("추천을 수락했습니다", response));
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<ApiResponse<RecommendationResponse>> rejectRecommendation(@PathVariable Long id) {
        RecommendationResponse response = recommendationService.rejectRecommendation(id);
        return ResponseEntity.ok(ApiResponse.success("추천을 거절했습니다", response));
    }

    @PostMapping("/{id}/feedback")
    public ResponseEntity<ApiResponse<RecommendationResponse>> submitFeedback(
            @PathVariable Long id,
            @RequestBody FeedbackRequest request) {
        RecommendationResponse response = recommendationService.submitFeedback(id, request.getFeedback());
        return ResponseEntity.ok(ApiResponse.success("피드백이 제출되었습니다", response));
    }
}
