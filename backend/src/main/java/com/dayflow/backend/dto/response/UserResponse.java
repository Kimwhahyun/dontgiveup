package com.dayflow.backend.dto.response;

import com.dayflow.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
public class UserResponse {

    private Long userId;
    private String username;
    private String email;
    private BigDecimal homeLatitude;
    private BigDecimal homeLongitude;
    private BigDecimal workLatitude;
    private BigDecimal workLongitude;
    private String preferredWeatherUnit;
    private Boolean notificationEnabled;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;

    public static UserResponse from(User user) {
        return UserResponse.builder()
                .userId(user.getUserId())
                .username(user.getUsername())
                .email(user.getEmail())
                .homeLatitude(user.getHomeLatitude())
                .homeLongitude(user.getHomeLongitude())
                .workLatitude(user.getWorkLatitude())
                .workLongitude(user.getWorkLongitude())
                .preferredWeatherUnit(user.getPreferredWeatherUnit().name())
                .notificationEnabled(user.getNotificationEnabled())
                .createdAt(user.getCreatedAt())
                .lastLogin(user.getLastLogin())
                .build();
    }
}
