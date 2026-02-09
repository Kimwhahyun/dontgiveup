package com.dayflow.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "username", nullable = false, unique = true, length = 50)
    private String username;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "home_latitude", precision = 10, scale = 8)
    private BigDecimal homeLatitude;

    @Column(name = "home_longitude", precision = 11, scale = 8)
    private BigDecimal homeLongitude;

    @Column(name = "work_latitude", precision = 10, scale = 8)
    private BigDecimal workLatitude;

    @Column(name = "work_longitude", precision = 11, scale = 8)
    private BigDecimal workLongitude;

    @Enumerated(EnumType.STRING)
    @Column(name = "preferred_weather_unit")
    @Builder.Default
    private WeatherUnit preferredWeatherUnit = WeatherUnit.CELSIUS;

    @Column(name = "notification_enabled")
    @Builder.Default
    private Boolean notificationEnabled = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<UserLocation> locations = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Schedule> schedules = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<AiRecommendation> recommendations = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<UserActivityLog> activityLogs = new ArrayList<>();

    public enum WeatherUnit {
        CELSIUS, FAHRENHEIT
    }
}
