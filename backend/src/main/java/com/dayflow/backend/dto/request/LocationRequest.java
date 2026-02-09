package com.dayflow.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LocationRequest {

    @NotBlank(message = "장소명은 필수입니다")
    private String locationName;

    @NotNull(message = "장소 유형은 필수입니다")
    private String locationType;

    @NotNull(message = "위도는 필수입니다")
    private BigDecimal latitude;

    @NotNull(message = "경도는 필수입니다")
    private BigDecimal longitude;

    private String address;
    private String arrivalAction;
}
