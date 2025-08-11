// Script to remove the problematic email index from subadmins collection
// Run this script to fix the MongoDB duplicate key error

const { MongoClient } = require('mongodb');

async function removeEmailIndex() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vesta-diagnostics';
  
  try {
    const client = new MongoClient(uri);
    await client.connect();
    
    console.log('Connected to MongoDB');
    
    const db = client.db('vesta-diagnostics');
    const collection = db.collection('subadmins');
    
    // List all indexes to see what exists
    console.log('Current indexes on subadmins collection:');
    const indexes = await collection.indexes();
    indexes.forEach(index => {
      console.log(`- ${index.name}: ${JSON.stringify(index.key)}`);
    });
    
    // Try to remove the email index if it exists
    try {
      await collection.dropIndex('email_1');
      console.log('✅ Successfully removed email_1 index');
    } catch (error) {
      if (error.code === 27) {
        console.log('ℹ️  email_1 index does not exist, no action needed');
      } else {
        console.log('⚠️  Error removing email index:', error.message);
      }
    }
    
    // Verify the index is gone
    console.log('\nIndexes after removal:');
    const updatedIndexes = await collection.indexes();
    updatedIndexes.forEach(index => {
      console.log(`- ${index.name}: ${JSON.stringify(index.key)}`);
    });
    
    await client.close();
    console.log('\n✅ Script completed successfully');
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run the script
removeEmailIndex();
