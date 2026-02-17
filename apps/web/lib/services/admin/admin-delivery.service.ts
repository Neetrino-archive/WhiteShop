import { db } from "@white-shop/db";

class AdminDeliveryService {
  /**
   * Get delivery settings
   */
  async getDeliverySettings() {
    console.log('🚚 [ADMIN SERVICE] getDeliverySettings called');
    
    const setting = await db.settings.findUnique({
      where: { key: 'delivery-locations' },
    });

    if (!setting) {
      console.log('✅ [ADMIN SERVICE] Delivery settings not found, returning defaults');
      return {
        locations: [],
      };
    }

    const value = setting.value as { locations?: Array<{ id?: string; country: string; city: string; price: number }> };
    console.log('✅ [ADMIN SERVICE] Delivery settings loaded:', value);
    return {
      locations: value.locations || [],
    };
  }

  /**
   * Get delivery price for a specific city
   * Returns the configured price if city has shipping, otherwise returns 0
   */
  async getDeliveryPrice(city: string, country: string = 'Armenia') {
    console.log('🚚 [ADMIN SERVICE] getDeliveryPrice called:', { city, country });
    
    const setting = await db.settings.findUnique({
      where: { key: 'delivery-locations' },
    });

    if (!setting) {
      console.log('✅ [ADMIN SERVICE] Delivery settings not found, returning 0 (no shipping for this city)');
      return 0; // No shipping configured for this city
    }

    const value = setting.value as { locations?: Array<{ country: string; city: string; price: number }> };
    const locations = value.locations || [];

    // Find matching location (case-insensitive)
    const location = locations.find(
      (loc) => 
        loc.city.toLowerCase().trim() === city.toLowerCase().trim() &&
        loc.country.toLowerCase().trim() === country.toLowerCase().trim()
    );

    if (location) {
      console.log('✅ [ADMIN SERVICE] Delivery price found:', location.price);
      return location.price;
    }

    // If no exact match, try to find by city only (case-insensitive)
    const cityMatch = locations.find(
      (loc) => loc.city.toLowerCase().trim() === city.toLowerCase().trim()
    );

    if (cityMatch) {
      console.log('✅ [ADMIN SERVICE] Delivery price found by city:', cityMatch.price);
      return cityMatch.price;
    }

    // Return 0 if no match found (city doesn't have shipping configured)
    console.log('✅ [ADMIN SERVICE] No delivery price found for city, returning 0');
    return 0; // No shipping for this city
  }

  /**
   * Update delivery settings
   */
  async updateDeliverySettings(data: { locations: Array<{ id?: string; country: string; city: string; price: number }> }) {
    console.log('🚚 [ADMIN SERVICE] updateDeliverySettings called:', data);
    
    // Validate locations
    if (!Array.isArray(data.locations)) {
      throw {
        status: 400,
        type: "https://api.shop.am/problems/validation-error",
        title: "Validation Error",
        detail: "Locations must be an array",
      };
    }

    // Validate each location
    for (const location of data.locations) {
      if (!location.country || !location.city) {
        throw {
          status: 400,
          type: "https://api.shop.am/problems/validation-error",
          title: "Validation Error",
          detail: "Each location must have country and city",
        };
      }
      if (typeof location.price !== 'number' || location.price < 0) {
        throw {
          status: 400,
          type: "https://api.shop.am/problems/validation-error",
          title: "Validation Error",
          detail: "Price must be a non-negative number",
        };
      }
    }

    // Generate IDs for new locations
    const locationsWithIds = data.locations.map((location, index) => ({
      ...location,
      id: location.id || `location-${Date.now()}-${index}`,
    }));

    const setting = await db.settings.upsert({
      where: { key: 'delivery-locations' },
      update: {
        value: { locations: locationsWithIds },
        updatedAt: new Date(),
      },
      create: {
        key: 'delivery-locations',
        value: { locations: locationsWithIds },
        description: 'Delivery prices by country and city',
      },
    });

    console.log('✅ [ADMIN SERVICE] Delivery settings updated:', setting);
    return {
      locations: locationsWithIds,
    };
  }
}

export const adminDeliveryService = new AdminDeliveryService();



