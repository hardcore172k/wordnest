import supabase from './supabase.js';

async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(1);

    if (error) throw error;
    console.log('✅ Supabase connected:', data);
  } catch (err) {
    console.error('❌ Supabase connection error:', err.message);
  }
}

testConnection();
