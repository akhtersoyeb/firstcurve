
import createClient from '@/lib/supabase/api';
import Razorpay from 'razorpay';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = createClient(req, res)
    // Initialize Razorpay instance with your key_id and key_secret
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { data: { user } } = await supabase.auth.getUser()

    const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

    if (profileData?.subscription_id) {
      // fetch that subscription and return it
      const alreadyCreatedSubscription = await razorpay.subscriptions.fetch(profileData?.subscription_id)
      return res.status(200).json({
        success: true,
        data: alreadyCreatedSubscription
      });
    } else {
      throw new Error('No subscription found')
    }
    
  } catch (error) {
    console.error('Razorpay subscription creation error:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Failed to create subscription',
      message: error.message || 'Internal server error',
    });
  }
}