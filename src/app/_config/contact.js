export const contactInfo = {
  // Contact Details
  email: "poudelenterprise@gmail.com",
  phone: "+61 420 420 420",
  address: {
    street: "204 Pitt Street",
    suite: "Suite 435",
    city: "Townhall",
    state: "Sydney",
    country: "Australia",
  },

  // Full formatted address
  get fullAddress() {
    return `${this.address.street}, ${this.address.suite}, ${this.address.city}, ${this.address.state}`;
  },

  // Social Media (if you want to add later)
  social: {
    // facebook: "https://facebook.com/poudelenterprise",
    // instagram: "https://instagram.com/poudelenterprise",
    // linkedin: "https://linkedin.com/company/poudelenterprise"
  },

  // Business Hours (if you want to add later)
  businessHours: {
    // monday: "9:00 AM - 6:00 PM",
    // tuesday: "9:00 AM - 6:00 PM",
    // wednesday: "9:00 AM - 6:00 PM",
    // thursday: "9:00 AM - 6:00 PM",
    // friday: "9:00 AM - 6:00 PM",
    // saturday: "10:00 AM - 4:00 PM",
    // sunday: "Closed"
  },
};

export default contactInfo;
