package com.dayflow.backend.controller;

import com.dayflow.backend.dto.request.ScheduleRequest;
import com.dayflow.backend.dto.response.ApiResponse;
import com.dayflow.backend.dto.response.ScheduleResponse;
import com.dayflow.backend.security.CustomUserDetails;
import com.dayflow.backend.service.ScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schedules")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ScheduleResponse>>> getSchedules(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        List<ScheduleResponse> response = scheduleService.getSchedules(userDetails.getUserId());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ScheduleResponse>> createSchedule(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody ScheduleRequest request) {
        ScheduleResponse response = scheduleService.createSchedule(userDetails.getUserId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("일정이 등록되었습니다", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ScheduleResponse>> getSchedule(@PathVariable Long id) {
        ScheduleResponse response = scheduleService.getSchedule(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ScheduleResponse>> updateSchedule(
            @PathVariable Long id,
            @Valid @RequestBody ScheduleRequest request) {
        ScheduleResponse response = scheduleService.updateSchedule(id, request);
        return ResponseEntity.ok(ApiResponse.success("일정이 수정되었습니다", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return ResponseEntity.ok(ApiResponse.success("일정이 삭제되었습니다", null));
    }

    @GetMapping("/today")
    public ResponseEntity<ApiResponse<List<ScheduleResponse>>> getTodaySchedules(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        List<ScheduleResponse> response = scheduleService.getTodaySchedules(userDetails.getUserId());
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
