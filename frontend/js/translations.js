// ==========================================================================
// SWACHH SATHI - MULTILINGUAL TRANSLATION ENGINE (EN / MR / HI)
// ==========================================================================

const translations = {
  en: {
    // Brand & Navigation
    brand: "Swachh Sathi",
    nav_home: "Home",
    nav_how: "How It Works",
    nav_ai: "AI Segregation",
    nav_map: "Live Map",
    nav_schedule: "Schedule",
    nav_workers: "Ward Heroes",
    nav_drives: "Drives",
    nav_report: "Report Waste",
    nav_dashboard: "Dashboard",
    nav_logout: "Logout",

    // Hero Section
    hero_badge: "Alandi Municipal Corporation • Smart Waste Ecosystem",
    hero_title: "Spot Waste in Alandi?<br><span class='gradient-text'>Report. Track. Clean.</span>",
    hero_subtitle: "Directly connects residents, ward supervisors, and cleanup teams. Powered by AI waste segregation and live GPS hotspot tracking for a cleaner, greener Alandi.",
    btn_report_waste: "Report Waste Now",
    btn_explore_map: "Explore Live Map",
    btn_book_pickup: "Book Doorstep Pickup",
    hero_coverage: "100% Ward Coverage",
    hero_speed: "< 24h Average Resolution",
    hero_citizens: "840+ Active Citizens",
    hero_resolved_label: "Issues Cleaned<br>& Resolved",
    card_resolved: "Complaint Resolved · Ward 1",
    card_nirmalya: "Nirmalya Composted · River Ghat",
    card_pickup: "Bulk Pickup On Schedule",

    // Stats
    stat_recycled: "Waste Diverted & Recycled",
    stat_reports: "Citizen Reports Filed",
    stat_rate: "Civic Resolution Rate",
    stat_time: "Average Response Time",

    // Emergency Banner
    emergency_title: "Hazardous Waste, Toxic Spill, or Open Burning?",
    emergency_desc: "Alandi Municipal Control Room operates 24/7 emergency dispatch.",
    emergency_btn: "Emergency: +91 20 1234 5678",

    // How It Works
    how_badge: "How It Works",
    how_title: "3 Easy Steps to a <span class='gradient-text'>Clean Alandi</span>",
    how_subtitle: "Civic waste management simplified. No paperwork, no endless waiting.",
    step1_num: "STEP 01",
    step1_title: "Snap & Report",
    step1_desc: "Spot an overflowing bin or roadside dumping? Click 'Report Waste' or click on the Live Map to capture location and photo in 15 seconds.",
    step2_num: "STEP 02",
    step2_title: "Ward Team Dispatched",
    step2_desc: "Your complaint instantly pings the dedicated sanitation supervisor for that ward. Pickup route is updated dynamically.",
    step3_num: "STEP 03",
    step3_title: "Track & Verify",
    step3_desc: "Watch status move to 'In Progress' and 'Resolved' in real-time on the map and your personal citizen dashboard.",

    // Live Map
    map_badge: "Live Hotspot Tracking",
    map_title: "Alandi Waste <span class='gradient-text'>Hotspot & Pickup Map</span>",
    map_subtitle: "Real-time view of reported waste spots across all wards of Alandi. Click any marker for details, or click on the map to pin a new issue!",
    filter_all: "All Hotspots",
    filter_pending: "Pending",
    filter_inprogress: "In Progress",
    filter_resolved: "Resolved",
    filter_pickups: "Pickups",
    map_locate: "Locate Me",
    map_jump_default: "📍 Jump to Location...",
    map_footer_info: "Connected to Municipal GIS. Click anywhere on the map to drop a pin and report waste.",
    btn_report_here: "Report Waste Here",

    // AI Assistant
    ai_badge: "AI Powered",
    ai_title: "Smart Waste <span class='gradient-text'>Segregation Assistant</span>",
    ai_subtitle: "Unsure which bin to use? Type any common item or click a sample to get instant disposal instructions.",
    ai_placeholder: "Type item e.g. plastic bottle, coconut shell, medicine...",
    ai_btn_classify: "Classify",
    ai_quick_label: "Quick Suggestions:",
    green_bin_title: "Green Bin — Biodegradable & Wet",
    green_bin_desc: "Kitchen food scraps, fruit/vegetable peels, leaves, sacred floral Nirmalya for organic composting.",
    blue_bin_title: "Blue Bin — Dry Recyclable",
    blue_bin_desc: "Paper, flattened cartons, plastic bottles, metal cans, glass jars, dry clean containers.",
    red_bin_title: "Red Bin — Domestic Hazardous & E-Waste",
    red_bin_desc: "Batteries, expired medicines, broken fluorescent bulbs, syringes, electronic cables.",

    // Schedule
    schedule_badge: "Doorstep Service",
    schedule_title: "Weekly Ward Collection Schedule",
    schedule_subtitle: "Fixed municipal compactor truck rounds across all Alandi residential sectors.",
    btn_schedule_pickup: "Schedule Extra Doorstep Pickup",

    // Workers
    workers_badge: "Municipal Team",
    workers_title: "Your Ward's <span class='gradient-text'>Sanitation Heroes</span>",
    workers_subtitle: "Know your local sanitation supervisor. Reach them directly via phone or WhatsApp for prompt resolution.",
    btn_call: "Call",
    btn_whatsapp: "WhatsApp",

    // Drives & Events
    events_badge: "Community Action",
    events_title: "Upcoming <span class='gradient-text'>Cleanliness Drives</span>",
    events_subtitle: "Join fellow citizens and youth groups to preserve Alandi's heritage and the holy Indrayani River.",
    btn_propose_drive: "Propose a Community Drive",
    btn_join_drive: "Join This Drive",

    // Call to Action
    cta_title: "Notice Garbage on Your Street?",
    cta_desc: "Every report you file holds authorities accountable and triggers immediate cleanup. Join 840+ proactive Alandi residents today.",
    cta_report_btn: "Report Waste Instantly",
    cta_dash_btn: "Citizen Dashboard",

    // Quick Report Modal
    modal_report_title: "Report Waste in Alandi",
    lbl_waste_type: "Waste Category",
    lbl_location: "Location in Alandi",
    lbl_priority: "Priority",
    lbl_desc: "Description / Landmark",
    btn_submit_report: "Submit Waste Report",
    opt_plastic: "🟠 Plastic Bottles & Wrappers",
    opt_wet: "🟢 Wet / Organic / Food Waste",
    opt_dry: "🟡 Dry / Cardboard / Paper Waste",
    opt_hazardous: "🔴 Hazardous / Broken Glass / Medical",
    opt_other: "⚪ Construction Debris / Other",

    // Login & Dashboard Portal
    login_welcome: "Welcome to Swachh Sathi",
    login_subtitle: "Access your civic waste management and tracking dashboard",
    tab_citizen_login: "Citizen Portal",
    tab_admin_login: "Municipal Admin",
    lbl_name: "Full Name",
    lbl_email: "Email Address",
    lbl_password: "Password",
    btn_login: "Login to Dashboard",
    btn_register: "Create Account",
    switch_to_register: "Don't have an account? Register here",
    switch_to_login: "Already have an account? Login here",
    quick_demo_label: "⚡ Instant 1-Click Demo Access:",
    demo_citizen_btn: "Citizen Demo",
    demo_admin_btn: "Admin Demo",
    guest_btn: "Continue as Guest Citizen",
    show_password: "Show",
    hide_password: "Hide",
    remember_me: "Remember me on this browser",

    // Dashboard Tabs & Metrics
    my_dashboard: "My Dashboard",
    tab_overview: "Overview",
    tab_report_waste: "Report Waste",
    tab_schedule_pickup: "Schedule Pickup",
    tab_propose_drive: "Propose Drive",
    welcome_user: "Welcome, ",
    activity_summary: "Here is your active waste reporting and pickup summary for Alandi.",
    my_complaints: "My Waste Reports",
    my_pickups: "Doorstep Pickups",
    my_resolved: "Resolved Issues",
    recent_reports: "Recent Waste Reports",
    view_on_map: "View on Map",
    need_help_title: "Need Urgent Assistance or Bulk Pickup?",
    need_help_desc: "Municipal supervisors and emergency waste squads are reachable 24/7.",
    btn_call_control: "Call Control Room",

    // Toasts
    toast_logged_in: "Logged in successfully!",
    toast_registered: "Account registered successfully!",
    toast_complaint_success: "Waste report submitted! Dispatched to ward team.",
    toast_pickup_success: "Doorstep pickup scheduled successfully!",
    toast_event_success: "Cleanliness drive proposed! Sent for review.",
    toast_server_offline: "Server offline. Please run start_app.bat."
  },

  mr: {
    // Brand & Navigation
    brand: "स्वच्छ साथी",
    nav_home: "मुख्यपृष्ठ",
    nav_how: "कार्यपद्धती",
    nav_ai: "AI वर्गीकरण",
    nav_map: "थेट नकाशा",
    nav_schedule: "वेळापत्रक",
    nav_workers: "स्वच्छता दूत",
    nav_drives: "मोहीम",
    nav_report: "कचरा तक्रार",
    nav_dashboard: "डॅशबोर्ड",
    nav_logout: "लॉगआउट",

    // Hero Section
    hero_badge: "आळंदी नगरपरिषद • स्मार्ट कचरा व्यवस्थापन प्रणाली",
    hero_title: "आळंदीत कचरा दिसला?<br><span class='gradient-text'>तक्रार करा. मागोवा घ्या. स्वच्छ करा.</span>",
    hero_subtitle: "नागरिक, प्रभाग पर्यवेक्षक आणि स्वच्छता पथकांना थेट जोडणारी आधुनिक प्रणाली. AI कचरा वर्गीकरण आणि थेट GPS नकाशाद्वारे स्वच्छ आणि हरित आळंदी.",
    btn_report_waste: "कचऱ्याची तक्रार नोंदवा",
    btn_explore_map: "थेट नकाशा पहा",
    btn_book_pickup: "घरोघरी पिकअप बुक करा",
    hero_coverage: "१००% प्रभाग कव्हरेज",
    hero_speed: "< २४ तास सरासरी निराकरण",
    hero_citizens: "८४०+ सक्रिय नागरिक",
    hero_resolved_label: "कचरा समस्या<br>निकाली काढल्या",
    card_resolved: "तक्रार निकाली · प्रभाग १",
    card_nirmalya: "निर्माल्य खत निर्मिती · नदी घाट",
    card_pickup: "मोठा कचरा वेळेवर संकलित",

    // Stats
    stat_recycled: "कचरा पुनर्वापर व खत",
    stat_reports: "नागरिक तक्रारी नोंदवल्या",
    stat_rate: "निराकरण दर",
    stat_time: "सरासरी प्रतिसाद वेळ",

    // Emergency Banner
    emergency_title: "धोकादायक कचरा, रासायनिक गळती किंवा कचरा जाळणे?",
    emergency_desc: "आळंदी नगरपरिषद २४/७ आपत्कालीन नियंत्रण कक्ष सेवेत उपलब्ध आहे.",
    emergency_btn: "आपत्कालीन: +९१ २० १२३४ ५६७८",

    // How It Works
    how_badge: "कार्यपद्धती",
    how_title: "स्वच्छ आळंदीसाठी <span class='gradient-text'>३ सोप्या पायऱ्या</span>",
    how_subtitle: "नागरी कचरा व्यवस्थापन आता सोपे. कागदपत्रांशिवाय, झटपट निकाल.",
    step1_num: "पायरी ०१",
    step1_title: "फोटो काढा व तक्रार करा",
    step1_desc: "कचऱ्याचा ढीग दिसला? 'कचरा तक्रार' वर क्लिक करा किंवा थेट नकाशावर जागा निवडून १५ सेकंदात तक्रार करा.",
    step2_num: "पायरी ०२",
    step2_title: "प्रभाग पथक रवाना",
    step2_desc: "तुमची तक्रार तात्काळ त्या प्रभागाच्या स्वच्छता पर्यवेक्षकाकडे पोहोचते व गाडी तिकडे रवाना होते.",
    step3_num: "पायरी ०३",
    step3_title: "मागोवा घ्या व खात्री करा",
    step3_desc: "नकाशावर आणि तुमच्या डॅशबोर्डवर काम 'प्रगतीपथावर' आणि 'स्वच्छ केले' अशी थेट स्थिती पहा.",

    // Live Map
    map_badge: "थेट कचरा ट्रॅकिंग",
    map_title: "आळंदी कचरा <span class='gradient-text'>हॉटस्पॉट व पिकअप नकाशा</span>",
    map_subtitle: "आळंदीतील सर्व प्रभागांमधील कचरा ठिकाणांचे थेट दर्शन. तपशीलासाठी मार्करवर क्लिक करा किंवा तक्रार करण्यासाठी नकाशावर टॅप करा!",
    filter_all: "सर्व ठिकाणे",
    filter_pending: "प्रलंबित",
    filter_inprogress: "प्रगतीपथावर",
    filter_resolved: "स्वच्छ झाले",
    filter_pickups: "पिकअप्स",
    map_locate: "माझे स्थान",
    map_jump_default: "📍 प्रभागात जा...",
    map_footer_info: "नगरपरिषद GIS शी जोडलेले. तक्रार नोंदवण्यासाठी नकाशावर कुठेही क्लिक करा.",
    btn_report_here: "येथे कचरा तक्रार करा",

    // AI Assistant
    ai_badge: "AI तंत्रज्ञान",
    ai_title: "स्मार्ट कचरा <span class='gradient-text'>वर्गीकरण सहाय्यक</span>",
    ai_subtitle: "कचरा कोणत्या डब्यात टाकावा समजत नाही? वस्तूचे नाव लिहा आणि योग्य डबा व विल्हेवाट जाणून घ्या.",
    ai_placeholder: "वस्तूचे नाव लिहा उदा. प्लास्टिक बाटली, नारळाची करवंटी, औषध...",
    ai_btn_classify: "वर्गीकृत करा",
    ai_quick_label: "झटपट उदाहरणे:",
    green_bin_title: "हिरवा डबा — ओला व सेंद्रिय कचरा",
    green_bin_desc: "किचन वेस्ट, भाज्यांची साले, पाने, मंदिरात अर्पण केलेले पवित्र निर्माल्य (खत निर्मितीसाठी).",
    blue_bin_title: "निळा डबा — सुका व पुनर्वापरयोग्य कचरा",
    blue_bin_desc: "कागद, पुठ्ठे, प्लास्टिक बाटल्या, धातूचे डबे, काचेच्या बाटल्या, स्वच्छ पॅकेजिंग.",
    red_bin_title: "लाल डबा — घातक व ई-कचरा",
    red_bin_desc: "बॅटऱ्या, मुदत संपलेली औषधे, ट्यूबलाईट्स, सुया, इलेक्ट्रॉनिक वायर्स.",

    // Schedule
    schedule_badge: "घरोघरी सेवा",
    schedule_title: "साप्ताहिक प्रभाग संकलन वेळापत्रक",
    schedule_subtitle: "आळंदीतील सर्व निवासी भागांसाठी नगरपरिषदेच्या घंटागाडीचे नियमित वेळापत्रक.",
    btn_schedule_pickup: "अतिरिक्त घरोघरी पिकअप बुक करा",

    // Workers
    workers_badge: "नगरपरिषद टीम",
    workers_title: "तुमच्या प्रभागाचे <span class='gradient-text'>स्वच्छता दूत</span>",
    workers_subtitle: "तुमच्या प्रभागातील स्वच्छता पर्यवेक्षकांना जाणून घ्या. जलद कामासाठी थेट फोन किंवा व्हॉट्सअ‍ॅपवर संपर्क साधा.",
    btn_call: "कॉल करा",
    btn_whatsapp: "व्हॉट्सअ‍ॅप",

    // Drives & Events
    events_badge: "नागरी सहभाग",
    events_title: "आगामी <span class='gradient-text'>स्वच्छता मोहिमा</span>",
    events_subtitle: "आळंदीचे पावित्र्य आणि पवित्र इंद्रायणी नदी स्वच्छ ठेवण्यासाठी सहभाग घ्या.",
    btn_propose_drive: "मोहीम सुचवा",
    btn_join_drive: "मोहिमेत सामील व्हा",

    // Call to Action
    cta_title: "तुमच्या गल्लीत कचरा साचला आहे का?",
    cta_desc: "तुमची एक तक्रार आळंदीला स्वच्छ बनवू शकते. आजच ८४०+ जागरूक नागरिकांसोबत सामील व्हा.",
    cta_report_btn: "तात्काळ तक्रार नोंदवा",
    cta_dash_btn: "नागरिक डॅशबोर्ड",

    // Quick Report Modal
    modal_report_title: "आळंदीत कचरा तक्रार नोंदवा",
    lbl_waste_type: "कचऱ्याचा प्रकार",
    lbl_location: "आळंदीतील ठिकाण / प्रभाग",
    lbl_priority: "प्राधान्य",
    lbl_desc: "तपशील / लँडमार्क",
    btn_submit_report: "तक्रार सबमिट करा",
    opt_plastic: "🟠 प्लास्टिक बाटल्या व पिशव्या",
    opt_wet: "🟢 ओला / अन्न / सेंद्रिय कचरा",
    opt_dry: "🟡 सुका / कागद / पुठ्ठा कचरा",
    opt_hazardous: "🔴 घातक / काच / वैद्यकीय कचरा",
    opt_other: "⚪ बांधकामाचा राडारोडा / इतर",

    // Login & Dashboard Portal
    login_welcome: "स्वच्छ साथी पोर्टलवर आपले स्वागत आहे",
    login_subtitle: "कचरा तक्रारी आणि पिकअप व्यवस्थापन डॅशबोर्ड",
    tab_citizen_login: "नागरिक लॉगिन",
    tab_admin_login: "नगरपरिषद अ‍ॅडमिन",
    lbl_name: "पूर्ण नाव",
    lbl_email: "ईमेल पत्ता",
    lbl_password: "पासवर्ड",
    btn_login: "डॅशबोर्डवर लॉगिन करा",
    btn_register: "नवीन खाते तयार करा",
    switch_to_register: "खाते नाही का? येथे नोंदणी करा",
    switch_to_login: "आधीच खाते आहे? लॉगिन करा",
    quick_demo_label: "⚡ १-क्लिक जलद चाचणी लॉगिन:",
    demo_citizen_btn: "नागरिक डेमो",
    demo_admin_btn: "अ‍ॅडमिन डेमो",
    guest_btn: "अतिथी नागरिक म्हणून पुढे जा",
    show_password: "दाखवा",
    hide_password: "लपवा",
    remember_me: "या ब्राउझरवर लक्षात ठेवा",

    // Dashboard Tabs & Metrics
    my_dashboard: "माझा डॅशबोर्ड",
    tab_overview: "आढावा",
    tab_report_waste: "कचरा तक्रार",
    tab_schedule_pickup: "पिकअप शेड्यूल",
    tab_propose_drive: "मोहीम सुचवा",
    welcome_user: "स्वागत आहे, ",
    activity_summary: "येथे तुमच्या आळंदीतील कचरा तक्रारी आणि पिकअपचा सारांश आहे.",
    my_complaints: "माझ्या तक्रारी",
    my_pickups: "घरोघरी पिकअप्स",
    my_resolved: "निकाली काढलेल्या तक्रारी",
    recent_reports: "अलीकडील तक्रारी",
    view_on_map: "नकाशावर पहा",
    need_help_title: "तातडीची मदत किंवा मोठा कचरा संकलन हवे आहे का?",
    need_help_desc: "नगरपरिषद पर्यवेक्षक आणि आपत्कालीन पथक २४/७ सेवेत उपलब्ध आहेत.",
    btn_call_control: "नियंत्रण कक्षाला कॉल करा",

    // Toasts
    toast_logged_in: "लॉगिन यशस्वी झाले!",
    toast_registered: "नोंदणी यशस्वी झाली!",
    toast_complaint_success: "तक्रार नोंदवली! प्रभाग पथकाकडे पाठवली आहे.",
    toast_pickup_success: "घरोघरी पिकअप यशस्वीरित्या शेड्यूल झाले!",
    toast_event_success: "स्वच्छता मोहीम पुनरावलोकनासाठी पाठवली!",
    toast_server_offline: "सर्व्हर ऑफलाइन. कृपया start_app.bat चालवा."
  },

  hi: {
    // Brand & Navigation
    brand: "स्वच्छ साथी",
    nav_home: "होम",
    nav_how: "कार्यप्रणाली",
    nav_ai: "AI पृथक्करण",
    nav_map: "लाइव मैप",
    nav_schedule: "समय सारणी",
    nav_workers: "स्वच्छता दूत",
    nav_drives: "अभियान",
    nav_report: "कचरा रिपोर्ट",
    nav_dashboard: "डैशबोर्ड",
    nav_logout: "लॉगआउट",

    // Hero Section
    hero_badge: "आलंदी नगर परिषद • स्मार्ट कचरा प्रबंधन प्रणाली",
    hero_title: "आलंदी में कचरा दिखा?<br><span class='gradient-text'>रिपोर्ट करें। ट्रैक करें। स्वच्छ बनाएं।</span>",
    hero_subtitle: "नागरिकों, वार्ड पर्यवेक्षकों और स्वच्छता टीमों को सीधे जोड़ने वाली स्मार्ट प्रणाली। AI कचरा पृथक्करण और लाइव GPS ट्रैकिंग से स्वच्छ आलंदी।",
    btn_report_waste: "कचरे की रिपोर्ट करें",
    btn_explore_map: "लाइव मैप देखें",
    btn_book_pickup: "डोरस्टेप पिकअप बुक करें",
    hero_coverage: "100% वार्ड कवरेज",
    hero_speed: "< 24 घंटे में समाधान",
    hero_citizens: "840+ सक्रिय नागरिक",
    hero_resolved_label: "कचरा समस्याएं<br>सुलझाई गईं",
    card_resolved: "शिकायत हल · वार्ड 1",
    card_nirmalya: "निर्माल्य खाद निर्माण · नदी घाट",
    card_pickup: "थोक कचरा समय पर एकत्रित",

    // Stats
    stat_recycled: "पुनर्चक्रित कचरा व खाद",
    stat_reports: "नागरिक शिकायतें दर्ज",
    stat_rate: "समाधान दर",
    stat_time: "औसत प्रतिक्रिया समय",

    // Emergency Banner
    emergency_title: "खतरनाक कचरा, रासायनिक रिसाव या कचरा जलाना?",
    emergency_desc: "आलंदी नगर परिषद 24/7 आपातकालीन नियंत्रण कक्ष सेवा में उपलब्ध है।",
    emergency_btn: "आपातकालीन: +91 20 1234 5678",

    // How It Works
    how_badge: "कार्यप्रणाली",
    how_title: "स्वच्छ आलंदी के <span class='gradient-text'>3 आसान चरण</span>",
    how_subtitle: "नागरिक कचरा प्रबंधन अब आसान। बिना कागजी कार्रवाई, तुरंत समाधान।",
    step1_num: "चरण 01",
    step1_title: "फोटो लें और रिपोर्ट करें",
    step1_desc: "कचरे का ढेर दिखा? 'कचरा रिपोर्ट' पर क्लिक करें या सीधे लाइव मैप पर स्थान चुनकर 15 सेकंड में रिपोर्ट करें।",
    step2_num: "चरण 02",
    step2_title: "वार्ड टीम रवाना",
    step2_desc: "आपकी रिपोर्ट तुरंत उस वार्ड के स्वच्छता पर्यवेक्षक तक पहुंचती है और गाड़ी वहां पहुंचती है।",
    step3_num: "चरण 03",
    step3_title: "ट्रैक करें और पुष्टि करें",
    step3_desc: "मैप और अपने नागरिक डैशबोर्ड पर स्थिति को 'प्रगति पर' और 'हल हो गया' में लाइव देखें।",

    // Live Map
    map_badge: "लाइव कचरा ट्रैकिंग",
    map_title: "आलंदी कचरा <span class='gradient-text'>हॉटस्पॉट व पिकअप मैप</span>",
    map_subtitle: "आलंदी के सभी वार्डों के कचरा स्थलों का लाइव दृश्य। विवरण के लिए मार्कर पर क्लिक करें या रिपोर्ट करने के लिए मैप पर टैप करें!",
    filter_all: "सभी स्थल",
    filter_pending: "लंबित",
    filter_inprogress: "प्रगति पर",
    filter_resolved: "स्वच्छ हुआ",
    filter_pickups: "पिकअप्स",
    map_locate: "मेरा स्थान",
    map_jump_default: "📍 वार्ड में जाएं...",
    map_footer_info: "नगर परिषद GIS से जुड़ा हुआ। रिपोर्ट करने के लिए मैप पर कहीं भी क्लिक करें।",
    btn_report_here: "यहाँ कचरा रिपोर्ट करें",

    // AI Assistant
    ai_badge: "AI तकनीक",
    ai_title: "स्मार्ट कचरा <span class='gradient-text'>पृथक्करण सहायक</span>",
    ai_subtitle: "कचरा किस डस्टबिन में डालें नहीं पता? वस्तु का नाम लिखें और सही बिन व निस्तारण का तरीका जानें।",
    ai_placeholder: "वस्तु का नाम लिखें जैसे प्लास्टिक की बोतल, नारियल की जटा, दवा...",
    ai_btn_classify: "वर्गीकृत करें",
    ai_quick_label: "त्वरित सुझाव:",
    green_bin_title: "हरा बिन — गीला व जैविक कचरा",
    green_bin_desc: "किचन का कचरा, फलों/सब्जियों के छिलके, पत्ते, मंदिर में अर्पित पवित्र निर्माल्य (खाद हेतु)।",
    blue_bin_title: "नीला बिन — सूखा व पुनर्चक्रण योग्य",
    blue_bin_desc: "कागज, गत्ते, प्लास्टिक की बोतलें, धातु के डिब्बे, कांच की बोतलें, स्वच्छ डिब्बे।",
    red_bin_title: "लाल बिन — घरेलू खतरनाक व ई-कचरा",
    red_bin_desc: "बैटरियां, एक्सपायर्ड दवाइयां, ट्यूबलाइट्स, सीरिंज, इलेक्ट्रॉनिक केबल्स।",

    // Schedule
    schedule_badge: "डोरस्टेप सेवा",
    schedule_title: "साप्ताहिक वार्ड संग्रह समय सारणी",
    schedule_subtitle: "आलंदी के सभी आवासीय क्षेत्रों के लिए नगर परिषद कचरा वाहन की नियमित समय सारणी।",
    btn_schedule_pickup: "अतिरिक्त डोरस्टेप पिकअप बुक करें",

    // Workers
    workers_badge: "नगर परिषद टीम",
    workers_title: "आपके वार्ड के <span class='gradient-text'>स्वच्छता दूत</span>",
    workers_subtitle: "अपने स्थानीय स्वच्छता पर्यवेक्षकों को जानें। त्वरित समाधान के लिए सीधे फोन या व्हाट्सएप पर संपर्क करें।",
    btn_call: "कॉल करें",
    btn_whatsapp: "व्हाट्सएप",

    // Drives & Events
    events_badge: "सामुदायिक सहभागिता",
    events_title: "आगामी <span class='gradient-text'>स्वच्छता अभियान</span>",
    events_subtitle: "आलंदी की पवित्रता और पावन इंद्रायणी नदी को स्वच्छ रखने हेतु हमारे साथ जुड़ें।",
    btn_propose_drive: "अभियान प्रस्तावित करें",
    btn_join_drive: "अभियान से जुड़ें",

    // Call to Action
    cta_title: "क्या आपकी गली में कचरा जमा है?",
    cta_desc: "आपकी एक रिपोर्ट आलंदी को स्वच्छ बना सकती है। आज ही 840+ जागरूक नागरिकों से जुड़ें।",
    cta_report_btn: "तुरंत रिपोर्ट करें",
    cta_dash_btn: "नागरिक डैशबोर्ड",

    // Quick Report Modal
    modal_report_title: "आलंदी में कचरा रिपोर्ट दर्ज करें",
    lbl_waste_type: "कचरे की श्रेणी",
    lbl_location: "आलंदी में स्थान / वार्ड",
    lbl_priority: "प्राथमिकता",
    lbl_desc: "विवरण / लैंडमार्क",
    btn_submit_report: "रिपोर्ट सबमिट करें",
    opt_plastic: "🟠 प्लास्टिक की बोतलें और थैलियां",
    opt_wet: "🟢 गीला / भोजन / जैविक कचरा",
    opt_dry: "🟡 सूखा / कागज / गत्ता कचरा",
    opt_hazardous: "🔴 खतरनाक / कांच / मेडिकल कचरा",
    opt_other: "⚪ निर्माण मलबा / अन्य",

    // Login & Dashboard Portal
    login_welcome: "स्वच्छ साथी पोर्टल में आपका स्वागत है",
    login_subtitle: "कचरा रिपोर्टिंग और पिकअप प्रबंधन डैशबोर्ड",
    tab_citizen_login: "नागरिक लॉगिन",
    tab_admin_login: "नगर परिषद एडमिन",
    lbl_name: "पूरा नाम",
    lbl_email: "ईमेल पता",
    lbl_password: "पासवर्ड",
    btn_login: "डैशबोर्ड पर लॉगिन करें",
    btn_register: "नया खाता बनाएं",
    switch_to_register: "खाता नहीं है? यहाँ पंजीकरण करें",
    switch_to_login: "पहले से खाता है? लॉगिन करें",
    quick_demo_label: "⚡ 1-क्लिक त्वरित डेमो लॉगिन:",
    demo_citizen_btn: "नागरिक डेमो",
    demo_admin_btn: "एडमिन डेमो",
    guest_btn: "अतिथि नागरिक के रूप में जारी रखें",
    show_password: "देखें",
    hide_password: "छिपाएं",
    remember_me: "इस ब्राउज़र पर याद रखें",

    // Dashboard Tabs & Metrics
    my_dashboard: "मेरा डैशबोर्ड",
    tab_overview: "अवलोकन",
    tab_report_waste: "कचरा रिपोर्ट",
    tab_schedule_pickup: "पिकअप शेड्यूल",
    tab_propose_drive: "अभियान प्रस्तावित करें",
    welcome_user: "स्वागत है, ",
    activity_summary: "यहाँ आपकी आलंदी कचरा रिपोर्ट और पिकअप का सारांश है।",
    my_complaints: "मेरी कचरा रिपोर्ट",
    my_pickups: "डोरस्टेप पिकअप",
    my_resolved: "सुलझाई गई समस्याएं",
    recent_reports: "हालिया रिपोर्ट",
    view_on_map: "मैप पर देखें",
    need_help_title: "क्या तत्काल सहायता या थोक पिकअप चाहिए?",
    need_help_desc: "नगर परिषद पर्यवेक्षक और आपातकालीन दल 24/7 सेवा में उपलब्ध हैं।",
    btn_call_control: "कंट्रोल रूम को कॉल करें",

    // Toasts
    toast_logged_in: "लॉगिन सफल!",
    toast_registered: "पंजीकरण सफल!",
    toast_complaint_success: "कचरा रिपोर्ट दर्ज! वार्ड टीम को भेज दी गई है।",
    toast_pickup_success: "डोरस्टेप पिकअप सफलतापूर्वक शेड्यूल हुआ!",
    toast_event_success: "सफाई अभियान समीक्षा हेतु भेजा गया!",
    toast_server_offline: "सर्वर ऑफलाइन। कृपया start_app.bat चलाएं।"
  }
};

// Language Changer Function
function setLanguage(lang) {
  if (!translations[lang]) lang = 'en';
  localStorage.setItem('preferredLanguage', lang);
  document.documentElement.lang = lang;

  // Update text & HTML elements
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[lang][key];
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });

  // Update language selector active states across all buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isTarget = btn.getAttribute('onclick')?.includes(`'${lang}'`);
    btn.classList.toggle('active', !!isTarget);
  });

  // Dispatch language changed event for reactive components
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

// Translation Helper for JavaScript strings
function t(key) {
  const lang = localStorage.getItem('preferredLanguage') || 'en';
  return (translations[lang] && translations[lang][key] !== undefined)
    ? translations[lang][key]
    : ((translations['en'] && translations['en'][key] !== undefined) ? translations['en'][key] : key);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferredLanguage') || 'en';
  setLanguage(savedLang);
});
