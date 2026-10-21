const User = require('../models/User');
const Complaint = require('../models/Complaint');
const Event = require('../models/Event');
const Worker = require('../models/Worker');
const PickupRequest = require('../models/PickupRequest');

const seedData = async () => {
  try {
    // 1. Ensure Admin & Demo Citizen
    let admin = await User.findOne({ email: 'admin@swachhsathi.in' });
    if (!admin) {
      admin = await User.create({
        name: 'Municipal Admin',
        email: 'admin@swachhsathi.in',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Admin user created');
    }

    let citizen = await User.findOne({ email: 'citizen@alandi.in' });
    if (!citizen) {
      citizen = await User.create({
        name: 'Aarav Patil',
        email: 'citizen@alandi.in',
        password: 'citizen123',
        role: 'user'
      });
      console.log('✅ Citizen demo user created');
    }

    // 2. Seed Workers if empty
    const workerCount = await Worker.countDocuments();
    if (workerCount === 0) {
      const workers = [
        {
          name: 'Rajesh Kumar',
          role: 'Sanitation Supervisor',
          phone: '+91 98220 12345',
          area: 'Ward 1 - Devachi Alandi & Temple Complex',
          image: 'images/workers/worker1.jpg',
          active: true
        },
        {
          name: 'Sunita Deshmukh',
          role: 'Waste Collection Lead',
          phone: '+91 98220 23456',
          area: 'Ward 2 - Indrayani River Ghat & Pilgrim Corridor',
          image: 'images/workers/worker2.jpg',
          active: true
        },
        {
          name: 'Prakash Shinde',
          role: 'Dry Waste Operations',
          phone: '+91 98220 34567',
          area: 'Ward 3 - Market Road & Vegetable Mandi',
          image: 'images/workers/worker3.jpg',
          active: true
        },
        {
          name: 'Kavita Jadhav',
          role: 'Residential Zone In-Charge',
          phone: '+91 98220 45678',
          area: 'Ward 4 - Dehu Phata & Chakan Road',
          image: 'images/workers/worker4.jpg',
          active: true
        },
        {
          name: 'Suresh More',
          role: 'Composting & Wet Waste Inspector',
          phone: '+91 98220 56789',
          area: 'Ward 5 - Vadgaon Ghenand Road',
          image: 'images/workers/worker5.jpg',
          active: true
        },
        {
          name: 'Anjali Gaikwad',
          role: 'Emergency Cleanliness Wing',
          phone: '+91 98220 67890',
          area: 'Ward 6 - Shivaji Chowk & Bus Station Zone',
          image: 'images/workers/worker6.jpg',
          active: true
        }
      ];
      await Worker.insertMany(workers);
      console.log('✅ Seeded 6 Ward Sanitation Workers');
    }

    // 3. Seed Events if empty
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      const now = new Date();
      const events = [
        {
          title: '🌊 Indrayani River Mega Cleanup Drive',
          location: 'Indrayani River Bank, Alandi Ghat',
          date: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // in 2 days
          description: 'Join 250+ volunteers, youth groups, and Alandi municipality for a comprehensive riverfront cleanup and plastic removal drive.',
          organizer: admin._id,
          status: 'Approved'
        },
        {
          title: '🌸 Temple Corridor Zero-Plastic Campaign',
          location: 'Sant Dnyaneshwar Maharaj Sanjeevan Samadhi Chowk',
          date: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // in 5 days
          description: 'Distributing compostable cloth bags to pilgrim shops and collecting floral waste (Nirmalya) for sacred organic composting.',
          organizer: admin._id,
          status: 'Approved'
        },
        {
          title: '🌳 Clean & Green Ward 4 Plantation & Segregation',
          location: 'Dehu Phata Community Center, Alandi',
          date: new Date(now.getTime() + 9 * 24 * 60 * 60 * 1000), // in 9 days
          description: 'Planting 300 native saplings along bypass avenue and conducting doorstep wet/dry waste segregation awareness workshops.',
          organizer: admin._id,
          status: 'Approved'
        }
      ];
      await Event.insertMany(events);
      console.log('✅ Seeded 3 Community Cleanup Events');
    }

    // 4. Seed Complaints / Map Hotspots if empty
    const complaintCount = await Complaint.countDocuments();
    if (complaintCount === 0) {
      const complaints = [
        {
          user: citizen._id,
          wasteType: 'Plastic',
          location: 'Alandi Bus Stand Terminal, Platform 2',
          description: 'Discarded plastic bottles, food wrappers, and single-use bags accumulating near the passenger waiting shelter.',
          priority: 'High',
          latitude: 18.6731,
          longitude: 73.8762,
          status: 'Pending',
          imageUrl: 'no-photo.jpg',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
          user: citizen._id,
          wasteType: 'Wet',
          location: 'Indrayani River Bank, Siddhabett Ghat',
          description: 'Rotting floral Nirmalya and organic offerings gathered at river steps requiring collection for composting.',
          priority: 'Urgent',
          latitude: 18.6680,
          longitude: 73.8730,
          status: 'In Progress',
          imageUrl: 'no-photo.jpg',
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
        },
        {
          user: citizen._id,
          wasteType: 'Dry',
          location: 'Market Road, Vegetable Mandi Entrance',
          description: 'Corrugated cartons and cardboard packaging debris spilling onto the sidewalk.',
          priority: 'Normal',
          latitude: 18.6718,
          longitude: 73.8789,
          status: 'In Progress',
          imageUrl: 'no-photo.jpg',
          createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
        },
        {
          user: citizen._id,
          wasteType: 'Hazardous',
          location: 'Old Alandi Road, Near Medical Clinic',
          description: 'Broken medicine glass vials and packaging discarded beside secondary municipal dumpster.',
          priority: 'Urgent',
          latitude: 18.6690,
          longitude: 73.8768,
          status: 'Pending',
          imageUrl: 'no-photo.jpg',
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
        },
        {
          user: citizen._id,
          wasteType: 'Other',
          location: 'New Market Road Construction Site',
          description: 'Concrete debris and excess rubble blocking storm drainage gutter.',
          priority: 'Normal',
          latitude: 18.6724,
          longitude: 73.8745,
          status: 'In Progress',
          imageUrl: 'no-photo.jpg',
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
        },
        {
          user: citizen._id,
          wasteType: 'Wet',
          location: 'Vitthal Temple Chowk, Ward 1',
          description: 'Cleared community wet waste bin following morning pilgrimage sanitation routine.',
          priority: 'Normal',
          latitude: 18.6695,
          longitude: 73.8748,
          status: 'Resolved',
          imageUrl: 'no-photo.jpg',
          createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000)
        },
        {
          user: citizen._id,
          wasteType: 'Plastic',
          location: 'Alandi Municipal High School Zone',
          description: 'Cleaned school periphery waste bins, segregated plastic wrappers.',
          priority: 'Low',
          latitude: 18.6708,
          longitude: 73.8771,
          status: 'Resolved',
          imageUrl: 'no-photo.jpg',
          createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000)
        },
        {
          user: citizen._id,
          wasteType: 'Dry',
          location: 'Chhatrapati Shivaji Maharaj Chowk',
          description: 'Dry waste litter gathered after weekly farmers market completely removed.',
          priority: 'Normal',
          latitude: 18.6700,
          longitude: 73.8740,
          status: 'Resolved',
          imageUrl: 'no-photo.jpg',
          createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000)
        }
      ];
      await Complaint.insertMany(complaints);
      console.log('✅ Seeded 8 Alandi Waste Hotspots / Complaints');
    }

    // 5. Seed Pickup Requests if empty
    const pickupCount = await PickupRequest.countDocuments();
    if (pickupCount === 0) {
      const now = new Date();
      const pickups = [
        {
          user: citizen._id,
          wasteType: 'Dry',
          address: 'Flat 302, Sai Vihar, Temple Street, Ward 1, Alandi',
          date: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
          time: '08:30 AM',
          status: 'Assigned',
          createdAt: new Date()
        },
        {
          user: citizen._id,
          wasteType: 'Plastic',
          address: 'House 14, River View Colony, Ward 2, Alandi',
          date: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
          time: '10:00 AM',
          status: 'Requested',
          createdAt: new Date()
        }
      ];
      await PickupRequest.insertMany(pickups);
      console.log('✅ Seeded 2 Doorstep Pickups');
    }

  } catch (err) {
    console.error('Seeding error:', err);
  }
};

module.exports = seedData;
