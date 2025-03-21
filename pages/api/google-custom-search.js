
export default function handler(req, res) {
  // Check if the request method is not POST
  if (req.method !== 'POST') {
    // Return 405 Method Not Allowed if the request is not a POST
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are accepted on this endpoint'
    });
  }

  try {
    // Process the POST request data
    const data = req.body;
    console.log('data: ', data)
    // TODO: Add your business logic here
    // For example: validate data, store in database, call external services, etc.
    
    // Success response
    return res.status(200).json({ 
      success: true,
      message: 'Data received successfully',
      data: data
    });
  } catch (error) {
    // Error handling
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'An error occurred while processing your request'
    });
  }
}