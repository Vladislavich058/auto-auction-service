package com.valery.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.core.sym.Name;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
@Table(name = "lots")
public class Lot implements Serializable {

	private static final long serialVersionUID = 6608180741738901646L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(nullable = false)
	private Car car;

	@ManyToOne
	@JoinColumn(name = "manager_id", nullable = false)
	private User manager;

	@ManyToOne
	@JoinColumn(name = "client_id")
	private User client;

	@Column(nullable = false)
	private Double minBid;

	@Column(nullable = false)
	private Double maxBid;

	private Double soldBid;

	@ManyToOne
	@JoinColumn(name = "status_id", nullable = false)
	private LotStatus status;

	@Column(nullable = false)
	private LocalDateTime createDateTime;

	private LocalDateTime closeDateTime;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "lot")
	private List<Bid> bids;

}
