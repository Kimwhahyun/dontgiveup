package com.dayflow.backend.repository;

import com.dayflow.backend.model.UserLocation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserLocationRepository extends JpaRepository<UserLocation, Long> {

    List<UserLocation> findByUserUserId(Long userId);

    List<UserLocation> findByUserUserIdAndLocationType(Long userId, UserLocation.LocationType locationType);
}
