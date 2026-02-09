package com.dayflow.backend.service;

import com.dayflow.backend.dto.request.LocationRequest;
import com.dayflow.backend.dto.response.LocationResponse;
import com.dayflow.backend.exception.ResourceNotFoundException;
import com.dayflow.backend.model.User;
import com.dayflow.backend.model.UserLocation;
import com.dayflow.backend.repository.UserLocationRepository;
import com.dayflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final UserLocationRepository locationRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<LocationResponse> getLocations(Long userId) {
        return locationRepository.findByUserUserId(userId).stream()
                .map(LocationResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public LocationResponse getLocation(Long locationId) {
        UserLocation location = locationRepository.findById(locationId)
                .orElseThrow(() -> new ResourceNotFoundException("장소를 찾을 수 없습니다"));
        return LocationResponse.from(location);
    }

    @Transactional
    public LocationResponse createLocation(Long userId, LocationRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다"));

        UserLocation location = UserLocation.builder()
                .user(user)
                .locationName(request.getLocationName())
                .locationType(UserLocation.LocationType.valueOf(request.getLocationType().toUpperCase()))
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .address(request.getAddress())
                .arrivalAction(request.getArrivalAction())
                .build();

        locationRepository.save(location);
        return LocationResponse.from(location);
    }

    @Transactional
    public LocationResponse updateLocation(Long locationId, LocationRequest request) {
        UserLocation location = locationRepository.findById(locationId)
                .orElseThrow(() -> new ResourceNotFoundException("장소를 찾을 수 없습니다"));

        location.setLocationName(request.getLocationName());
        location.setLocationType(UserLocation.LocationType.valueOf(request.getLocationType().toUpperCase()));
        location.setLatitude(request.getLatitude());
        location.setLongitude(request.getLongitude());
        location.setAddress(request.getAddress());
        location.setArrivalAction(request.getArrivalAction());

        locationRepository.save(location);
        return LocationResponse.from(location);
    }

    @Transactional
    public void deleteLocation(Long locationId) {
        if (!locationRepository.existsById(locationId)) {
            throw new ResourceNotFoundException("장소를 찾을 수 없습니다");
        }
        locationRepository.deleteById(locationId);
    }
}
