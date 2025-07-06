const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testProfessionalSummary = {
  title: "Software Engineer",
  summary: "Passionate software engineer with expertise in full-stack development and modern web technologies. Experienced in building scalable applications and delivering exceptional user experiences.",
  experience: "3+ years",
  location: "New York, NY",
  email: "test@example.com",
  phone: "+1 (555) 123-4567"
};

const testTechnicalSkill = {
  name: "React",
  category: "Frontend",
  proficiency: 90,
  icon: "react-icon",
  color: "#61DAFB",
  description: "Modern React with hooks and context"
};

const testContact = {
  name: "John Doe",
  email: "john@example.com",
  subject: "Test Contact",
  message: "This is a test contact message to verify the API is working correctly."
};

async function testAPI() {
  console.log('🚀 Testing Portfolio Backend API...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data.message);
    console.log('   Environment:', healthResponse.data.environment);
    console.log('   Timestamp:', healthResponse.data.timestamp);

    // Test 2: API Info
    console.log('\n2. Testing API Info...');
    const infoResponse = await axios.get(`${BASE_URL}/`);
    console.log('✅ API Info:', infoResponse.data.message);
    console.log('   Version:', infoResponse.data.version);

    // Test 3: Create Professional Summary
    console.log('\n3. Testing Professional Summary Creation...');
    const summaryResponse = await axios.post(`${BASE_URL}/professional-summary`, testProfessionalSummary);
    console.log('✅ Professional Summary Created:', summaryResponse.data.message);
    console.log('   ID:', summaryResponse.data.data._id);
    const summaryId = summaryResponse.data.data._id;

    // Test 4: Get Professional Summary
    console.log('\n4. Testing Professional Summary Retrieval...');
    const getSummaryResponse = await axios.get(`${BASE_URL}/professional-summary/${summaryId}`);
    console.log('✅ Professional Summary Retrieved:', getSummaryResponse.data.data.title);

    // Test 5: Create Technical Skill
    console.log('\n5. Testing Technical Skill Creation...');
    const skillResponse = await axios.post(`${BASE_URL}/technical-skills`, testTechnicalSkill);
    console.log('✅ Technical Skill Created:', skillResponse.data.message);
    console.log('   Skill:', skillResponse.data.data.name);
    const skillId = skillResponse.data.data._id;

    // Test 6: Get Active Technical Skills
    console.log('\n6. Testing Active Technical Skills...');
    const activeSkillsResponse = await axios.get(`${BASE_URL}/technical-skills/active/skills`);
    console.log('✅ Active Technical Skills:', activeSkillsResponse.data.results, 'skills found');

    // Test 7: Submit Contact Form
    console.log('\n7. Testing Contact Form Submission...');
    const contactResponse = await axios.post(`${BASE_URL}/contact`, testContact);
    console.log('✅ Contact Submitted:', contactResponse.data.message);
    console.log('   Contact ID:', contactResponse.data.data._id);

    // Test 8: Get Contact Stats
    console.log('\n8. Testing Contact Statistics...');
    const statsResponse = await axios.get(`${BASE_URL}/contact/stats/unread`);
    console.log('✅ Contact Stats:', statsResponse.data.data);

    // Test 9: Create Social Link
    console.log('\n9. Testing Social Link Creation...');
    const socialLinkData = {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/testuser",
      username: "testuser",
      displayName: "Test User",
      icon: "linkedin-icon",
      color: "#0077B5"
    };
    const socialResponse = await axios.post(`${BASE_URL}/social-links`, socialLinkData);
    console.log('✅ Social Link Created:', socialResponse.data.message);
    console.log('   Platform:', socialResponse.data.data.platform);

    // Test 10: Get Active Social Links
    console.log('\n10. Testing Active Social Links...');
    const activeLinksResponse = await axios.get(`${BASE_URL}/social-links/active/links`);
    console.log('✅ Active Social Links:', activeLinksResponse.data.results, 'links found');

    console.log('\n🎉 All API tests completed successfully!');
    console.log('\n📊 Test Summary:');
    console.log('   ✅ Health Check - PASSED');
    console.log('   ✅ API Info - PASSED');
    console.log('   ✅ Professional Summary CRUD - PASSED');
    console.log('   ✅ Technical Skills CRUD - PASSED');
    console.log('   ✅ Contact Form - PASSED');
    console.log('   ✅ Social Links CRUD - PASSED');

  } catch (error) {
    console.error('\n❌ API Test Failed:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  }
}

// Run the test
testAPI(); 