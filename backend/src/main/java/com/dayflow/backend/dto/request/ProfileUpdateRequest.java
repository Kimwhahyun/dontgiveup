package com.dayflow.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileUpdateRequest {

    private BigDecimal homeLatitude;
    private BigDecimal homeLongitude;
    private BigDecimal workLatitude;
    private BigDecimal workLongitude;
    private String preferredWeatherUnit;
    private Boolean notificationEnabled;
}
