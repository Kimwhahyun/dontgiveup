package com.dayflow.backend.controller;

import com.dayflow.backend.dto.request.ActivityLogRequest;
import com.dayflow.backend.dto.response.ActivityLogResponse;
import com.dayflow.backend.dto.response.ApiResponse;
import com.dayflow.backend.security.CustomUserDetails;
import com.dayflow.backend.service.ActivityLogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/activities")
@RequiredArgsConstructor
public class ActivityLogController {

    private final ActivityLogService activityLogService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ActivityLogResponse>>> getActivityLogs(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        List<ActivityLogResponse> response = activityLogService.getActivityLogs(userDetails.getUserId());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ActivityLogResponse>> createActivityLog(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody ActivityLogRequest request) {
        ActivityLogResponse response = activityLogService.createActivityLog(userDetails.getUserId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("활동이 기록되었습니다", response));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<List<ActivityLogResponse>>> getActivityStats(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        List<ActivityLogResponse> response = activityLogService.getActivityStats(userDetails.getUserId());
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
