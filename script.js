// Navigation System
class NavigationManager {
    constructor() {
        this.currentSection = 'booking';
        this.initializeNavigation();
    }

    initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                this.switchSection(targetSection);
            });
        });
    }

    switchSection(sectionId) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        // Update sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        this.currentSection = sectionId;
    }
}

// Booking System
class BookingManager {
    constructor() {
        this.selectedRideType = 'instant';
        this.initializeBooking();
    }

    initializeBooking() {
        // Ride type selection
        const rideTypes = document.querySelectorAll('.ride-type');
        rideTypes.forEach(type => {
            type.addEventListener('click', () => {
                rideTypes.forEach(t => t.classList.remove('active'));
                type.classList.add('active');
                this.selectedRideType = type.getAttribute('data-type');
                this.updateBookingOptions();
            });
        });

        // Location swap
        const swapBtn = document.querySelector('.swap-btn');
        swapBtn.addEventListener('click', () => {
            this.swapLocations();
        });

        // Book ride button
        const bookBtn = document.querySelector('.book-ride-btn');
        bookBtn.addEventListener('click', () => {
            this.processBooking();
        });

        // Route selection
        const routeCards = document.querySelectorAll('.route-card');
        routeCards.forEach(card => {
            const selectBtn = card.querySelector('.select-route-btn');
            selectBtn.addEventListener('click', () => {
                this.selectRoute(card);
            });
        });
    }

    swapLocations() {
        const fromInput = document.querySelector('.location-inputs .input-group:first-child input');
        const toInput = document.querySelector('.location-inputs .input-group:last-child input');
        
        const temp = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = temp;

        // Add animation
        const swapBtn = document.querySelector('.swap-btn');
        swapBtn.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            swapBtn.style.transform = 'rotate(0deg)';
        }, 300);
    }

    updateBookingOptions() {
        const bookBtn = document.querySelector('.book-ride-btn span:first-child');
        const options = {
            instant: 'Find Sky Routes',
            scheduled: 'Schedule Flight',
            shared: 'Join Shared Ride'
        };
        bookBtn.textContent = options[this.selectedRideType];
    }

    processBooking() {
        const fromLocation = document.querySelector('.location-inputs .input-group:first-child input').value;
        const toLocation = document.querySelector('.location-inputs .input-group:last-child input').value;

        if (!fromLocation || !toLocation) {
            this.showNotification('Please enter both pickup and destination locations', 'warning');
            return;
        }

        // Simulate booking process
        this.showNotification('Searching for optimal sky routes...', 'success');
        
        setTimeout(() => {
            this.showRouteResults();
        }, 1500);
    }

    showRouteResults() {
        const routeResults = document.querySelector('.route-results');
        routeResults.style.display = 'block';
        routeResults.scrollIntoView({ behavior: 'smooth' });
        
        // Animate route cards
        const routeCards = document.querySelectorAll('.route-card');
        routeCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    selectRoute(routeCard) {
        // Remove previous selections
        document.querySelectorAll('.route-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Add selection
        routeCard.classList.add('selected');
        
        // Update button
        const selectBtn = routeCard.querySelector('.select-route-btn');
        selectBtn.textContent = 'Booking...';
        selectBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
        
        setTimeout(() => {
            this.confirmBooking();
        }, 2000);
    }

    confirmBooking() {
        this.showNotification('Flight booked successfully! Taxi dispatched.', 'success');
        
        // Switch to tracking
        setTimeout(() => {
            const navManager = new NavigationManager();
            navManager.switchSection('tracking');
        }, 1500);
    }

    showNotification(message, type = 'success') {
        const container = document.getElementById('notifications');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        container.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                container.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Flight Tracking System
class FlightTracker {
    constructor() {
        this.flightData = {
            id: 'SR-4829',
            status: 'in-flight',
            progress: 65,
            altitude: 487,
            speed: 120,
            eta: 3
        };
        this.initializeTracking();
    }

    initializeTracking() {
        this.updateFlightInfo();
        this.startRealTimeUpdates();
    }

    updateFlightInfo() {
        // Update progress
        const progressFill = document.querySelector('.progress-fill');
        const progressInfo = document.querySelector('.progress-info span:first-child');
        const etaInfo = document.querySelector('.progress-info span:last-child');
        
        if (progressFill) {
            progressFill.style.width = `${this.flightData.progress}%`;
        }
        if (progressInfo) {
            progressInfo.textContent = `${this.flightData.progress}% Complete`;
        }
        if (etaInfo) {
            etaInfo.textContent = `${this.flightData.eta} min remaining`;
        }

        // Update details
        const altitudeValue = document.querySelector('.detail-item:nth-child(1) .detail-value');
        const speedValue = document.querySelector('.detail-item:nth-child(2) .detail-value');
        
        if (altitudeValue) {
            altitudeValue.textContent = `${this.flightData.altitude}m`;
        }
        if (speedValue) {
            speedValue.textContent = `${this.flightData.speed} km/h`;
        }
    }

    startRealTimeUpdates() {
        setInterval(() => {
            // Simulate real-time updates
            if (this.flightData.progress < 100) {
                this.flightData.progress += Math.random() * 2;
                this.flightData.altitude += (Math.random() - 0.5) * 10;
                this.flightData.speed += (Math.random() - 0.5) * 5;
                this.flightData.eta = Math.max(0, this.flightData.eta - 0.1);
                
                this.updateFlightInfo();
            }
        }, 2000);
    }
}

// Sky Route Management
class SkyRouteManager {
    constructor() {
        this.currentAltitude = '300';
        this.initializeRoutes();
    }

    initializeRoutes() {
        const altitudeBtns = document.querySelectorAll('.altitude-btn');
        altitudeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                altitudeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentAltitude = btn.getAttribute('data-altitude');
                this.updateRouteVisualization();
            });
        });

        // District interactions
        const districts = document.querySelectorAll('.district');
        districts.forEach(district => {
            district.addEventListener('click', () => {
                this.selectDistrict(district);
            });
        });
    }

    updateRouteVisualization() {
        const skyLayers = document.querySelectorAll('.sky-layer');
        skyLayers.forEach(layer => {
            const layerAltitude = layer.getAttribute('data-altitude');
            if (this.currentAltitude === 'all' || this.currentAltitude === layerAltitude) {
                layer.style.opacity = '1';
                layer.style.transform = 'scale(1)';
            } else {
                layer.style.opacity = '0.3';
                layer.style.transform = 'scale(0.95)';
            }
        });
    }

    selectDistrict(district) {
        // Remove previous selections
        document.querySelectorAll('.district').forEach(d => {
            d.classList.remove('selected');
        });
        
        // Add selection
        district.classList.add('selected');
        
        const districtName = district.getAttribute('data-district');
        this.showDistrictInfo(districtName);
    }

    showDistrictInfo(districtName) {
        const districtData = {
            downtown: {
                terminals: 3,
                capacity: 150,
                avgWait: '2.3 min'
            },
            business: {
                terminals: 5,
                capacity: 200,
                avgWait: '1.8 min'
            },
            residential: {
                terminals: 8,
                capacity: 120,
                avgWait: '3.1 min'
            },
            tech: {
                terminals: 2,
                capacity: 80,
                avgWait: '1.5 min'
            }
        };

        const data = districtData[districtName];
        if (data) {
            const message = `${districtName.charAt(0).toUpperCase() + districtName.slice(1)} District: ${data.terminals} terminals, ${data.capacity} vehicle capacity, ${data.avgWait} average wait time`;
            new BookingManager().showNotification(message, 'success');
        }
    }
}

// Fleet Management System
class FleetManager {
    constructor() {
        this.vehicles = [
            { id: 'SR-001', status: 'active', battery: 87, location: 'Downtown Terminal', passengers: '2/4' },
            { id: 'SR-002', status: 'charging', battery: 34, location: 'Sky Station Alpha', chargeTime: 12 },
            { id: 'SR-003', status: 'maintenance', battery: 0, location: 'Service Center', issue: 'Rotor calibration' }
        ];
        this.initializeFleet();
    }

    initializeFleet() {
        this.updateVehicleData();
        this.startFleetMonitoring();
    }

    updateVehicleData() {
        const vehicleCards = document.querySelectorAll('.vehicle-card');
        vehicleCards.forEach((card, index) => {
            const vehicle = this.vehicles[index];
            if (vehicle) {
                const batteryFill = card.querySelector('.battery-fill');
                const batteryText = card.querySelector('.battery-text');
                
                if (batteryFill && batteryText) {
                    batteryFill.style.width = `${vehicle.battery}%`;
                    batteryText.textContent = vehicle.battery > 0 ? `${vehicle.battery}%` : '--';
                }
            }
        });
    }

    startFleetMonitoring() {
        setInterval(() => {
            this.vehicles.forEach(vehicle => {
                if (vehicle.status === 'charging' && vehicle.battery < 100) {
                    vehicle.battery = Math.min(100, vehicle.battery + Math.random() * 3);
                } else if (vehicle.status === 'active' && vehicle.battery > 0) {
                    vehicle.battery = Math.max(0, vehicle.battery - Math.random() * 0.5);
                }
            });
            this.updateVehicleData();
        }, 3000);
    }
}

// Traffic Management AI
class TrafficAI {
    constructor() {
        this.trafficZones = [
            { name: 'Downtown Corridor', vehicles: 23, speed: 118, efficiency: 94, level: 'low' },
            { name: 'Business District', vehicles: 67, speed: 89, efficiency: 87, level: 'medium' },
            { name: 'Airport Approach', vehicles: 134, speed: 65, efficiency: 76, level: 'high' }
        ];
        this.initializeTrafficAI();
    }

    initializeTrafficAI() {
        this.updateTrafficData();
        this.startTrafficOptimization();
    }

    updateTrafficData() {
        const trafficZones = document.querySelectorAll('.traffic-zone');
        trafficZones.forEach((zone, index) => {
            const data = this.trafficZones[index];
            if (data) {
                const metrics = zone.querySelectorAll('.metric-value');
                if (metrics.length >= 3) {
                    metrics[0].textContent = data.vehicles;
                    metrics[1].textContent = `${data.speed} km/h`;
                    metrics[2].textContent = `${data.efficiency}%`;
                }
            }
        });
    }

    startTrafficOptimization() {
        setInterval(() => {
            this.trafficZones.forEach(zone => {
                // Simulate AI optimization
                zone.vehicles += Math.floor((Math.random() - 0.5) * 10);
                zone.speed += Math.floor((Math.random() - 0.5) * 8);
                zone.efficiency += Math.floor((Math.random() - 0.5) * 3);
                
                // Keep values in realistic ranges
                zone.vehicles = Math.max(5, Math.min(200, zone.vehicles));
                zone.speed = Math.max(40, Math.min(150, zone.speed));
                zone.efficiency = Math.max(60, Math.min(100, zone.efficiency));
            });
            this.updateTrafficData();
        }, 5000);
    }
}

// Emergency System
class EmergencyManager {
    constructor() {
        this.initializeEmergency();
    }

    initializeEmergency() {
        const emergencyFab = document.getElementById('emergencyFab');
        const emergencyBtn = document.querySelector('.emergency-btn');
        
        if (emergencyFab) {
            emergencyFab.addEventListener('click', () => {
                this.triggerEmergency();
            });
        }
        
        if (emergencyBtn) {
            emergencyBtn.addEventListener('click', () => {
                this.triggerEmergencyLanding();
            });
        }
    }

    triggerEmergency() {
        const notification = new BookingManager();
        notification.showNotification('Emergency services contacted. Help is on the way.', 'error');
        
        // Flash emergency button
        const fab = document.querySelector('.fab-btn');
        fab.style.animation = 'pulse 0.5s ease-in-out 3';
    }

    triggerEmergencyLanding() {
        const notification = new BookingManager();
        notification.showNotification('Emergency landing initiated. Finding nearest safe landing zone.', 'warning');
        
        // Update flight status
        const statusBadge = document.querySelector('.status-badge');
        if (statusBadge) {
            statusBadge.textContent = 'Emergency Landing';
            statusBadge.className = 'status-badge status-emergency';
            statusBadge.style.background = 'rgba(239, 68, 68, 0.2)';
            statusBadge.style.color = '#EF4444';
        }
    }
}

// Real-time Data Simulator
class DataSimulator {
    constructor() {
        this.initializeSimulation();
    }

    initializeSimulation() {
        this.updateActiveFlights();
        this.updateResponseTime();
        this.updateOnTimeRate();
    }

    updateActiveFlights() {
        setInterval(() => {
            const activeFlightsElement = document.querySelector('.stat-card:first-child .stat-value');
            if (activeFlightsElement) {
                const currentFlights = parseInt(activeFlightsElement.textContent);
                const newFlights = currentFlights + Math.floor((Math.random() - 0.5) * 10);
                activeFlightsElement.textContent = Math.max(200, Math.min(300, newFlights));
            }
        }, 4000);
    }

    updateResponseTime() {
        setInterval(() => {
            const responseTimeElement = document.querySelector('.stat-card:nth-child(2) .stat-value');
            if (responseTimeElement) {
                const responseTime = (2.0 + Math.random() * 1.0).toFixed(1);
                responseTimeElement.textContent = `${responseTime}s`;
            }
        }, 3000);
    }

    updateOnTimeRate() {
        setInterval(() => {
            const onTimeElement = document.querySelector('.stat-card:nth-child(3) .stat-value');
            if (onTimeElement) {
                const rate = (99.5 + Math.random() * 0.4).toFixed(1);
                onTimeElement.textContent = `${rate}%`;
            }
        }, 6000);
    }
}

// Weather Integration
class WeatherManager {
    constructor() {
        this.weatherConditions = ['Clear ☀️', 'Partly Cloudy ⛅', 'Light Rain 🌧️', 'Windy 💨'];
        this.initializeWeather();
    }

    initializeWeather() {
        this.updateWeather();
        setInterval(() => {
            this.updateWeather();
        }, 30000);
    }

    updateWeather() {
        const weatherElement = document.querySelector('.detail-item:nth-child(3) .detail-value');
        if (weatherElement) {
            const randomWeather = this.weatherConditions[Math.floor(Math.random() * this.weatherConditions.length)];
            weatherElement.textContent = randomWeather;
        }
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    const navigation = new NavigationManager();
    const booking = new BookingManager();
    const tracker = new FlightTracker();
    const routes = new SkyRouteManager();
    const fleet = new FleetManager();
    const emergency = new EmergencyManager();
    const dataSimulator = new DataSimulator();
    const weather = new WeatherManager();

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Add interactive elements
    addInteractiveEffects();
});

// Interactive Effects
function addInteractiveEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.route-card, .vehicle-card, .stat-card, .traffic-zone');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add particle effects
    createParticleEffect();
}

// Particle Effect System
function createParticleEffect() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);

    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: linear-gradient(45deg, #00D4FF, #8B5CF6);
        border-radius: 50%;
        opacity: 0.6;
        animation: float ${5 + Math.random() * 10}s linear infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (container.contains(particle)) {
            container.removeChild(particle);
            createParticle(container);
        }
    }, (5 + Math.random() * 10) * 1000);
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
    
    .route-card.selected {
        border-color: #10B981 !important;
        box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3) !important;
    }
    
    .district.selected {
        background: rgba(0, 212, 255, 0.2) !important;
        border-color: #00D4FF !important;
        transform: scale(1.05) !important;
    }
`;
document.head.appendChild(style);