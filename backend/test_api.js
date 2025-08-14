const { pool } = require('./src/config/db');

async function testAPI() {
  try {
    console.log('Testing database connection...');
    
    // Test specific classes table
    const result = await pool.query('SELECT * FROM specific_classes ORDER BY class_date, start_time');
    console.log('Specific classes in database:', result.rows);
    
    // Test user registrations
    const registrations = await pool.query(`
      SELECT scr.*, sc.name, sc.class_date, sc.start_time 
      FROM specific_class_registrations scr
      JOIN specific_classes sc ON scr.class_id = sc.id
      ORDER BY sc.class_date, sc.start_time
    `);
    console.log('User registrations:', registrations.rows);
    
  } catch (error) {
    console.error('Error testing API:', error);
  } finally {
    process.exit(0);
  }
}

testAPI();