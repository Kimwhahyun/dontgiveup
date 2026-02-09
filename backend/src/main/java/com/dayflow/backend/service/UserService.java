package com.dayflow.backend.service;

import com.dayflow.backend.dto.request.ProfileUpdateRequest;
import com.dayflow.backend.dto.response.UserResponse;
import com.dayflow.backend.exception.ResourceNotFoundException;
import com.dayflow.backend.model.User;
import com.dayflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public UserResponse getProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다"));
        return UserResponse.from(user);
    }

    @Transactional
    public UserResponse updateProfile(Long userId, ProfileUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다"));

        if (request.getHomeLatitude() != null) user.setHomeLatitude(request.getHomeLatitude());
        if (request.getHomeLongitude() != null) user.setHomeLongitude(request.getHomeLongitude());
        if (request.getWorkLatitude() != null) user.setWorkLatitude(request.getWorkLatitude());
        if (request.getWorkLongitude() != null) user.setWorkLongitude(request.getWorkLongitude());
        if (request.getPreferredWeatherUnit() != null) {
            user.setPreferredWeatherUnit(User.WeatherUnit.valueOf(request.getPreferredWeatherUnit().toUpperCase()));
        }
        if (request.getNotificationEnabled() != null) {
            user.setNotificationEnabled(request.getNotificationEnabled());
        }

        userRepository.save(user);
        return UserResponse.from(user);
    }
}
