package com.valery.entities;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "cars")
public class Car implements Serializable {

	private static final long serialVersionUID = 3507095085383034379L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String model;

	@Column(nullable = false)
	private String vinNumber;

	@Column(nullable = false)
	private Integer odometer;

	@Column(nullable = false)
	private Integer yearOfManufacture;

	@Column(nullable = false)
	private String primaryDamage;

	@Column(nullable = false)
	private Double preAccidentValue;

	@Column(nullable = false)
	private String color;

	@Column(nullable = false)
	private String drive;

	@Column(nullable = false)
	private Boolean hasKeys;

	@Column(nullable = false)
	private String highlights;
	
	@Column(nullable = false)
	private Integer powerReserve;
	
	@Column(nullable = false)
	private Integer batteryCapacity;
	
	@Column(nullable = false)
	private Integer power;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "car_id", nullable = false)
	private List<File> files;
}
