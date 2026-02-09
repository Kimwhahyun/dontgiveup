package com.dayflow.backend.dto.response;

import com.dayflow.backend.model.UserLocation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
public class LocationResponse {

    private Long locationId;
    private String locationName;
    private String locationType;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String address;
    private String arrivalAction;
    private Integer visitCount;
    private LocalDateTime lastVisited;
    private LocalDateTime createdAt;

    public static LocationResponse from(UserLocation location) {
        return LocationResponse.builder()
                .locationId(location.getLocationId())
                .locationName(location.getLocationName())
                .locationType(location.getLocationType().name())
                .latitude(location.getLatitude())
                .longitude(location.getLongitude())
                .address(location.getAddress())
                .arrivalAction(location.getArrivalAction())
                .visitCount(location.getVisitCount())
                .lastVisited(location.getLastVisited())
                .createdAt(location.getCreatedAt())
                .build();
    }
}
