
import createClient from '@/lib/supabase/api';
import Razorpay from 'razorpay';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body
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
    }
    
    

    // Validate required parameters
    // if (!plan_id) {
    //   return res.status(400).json({ error: 'Plan ID is required' });
    // }

    // Create subscription object
    const subscriptionOptions = {
      plan_id: process.env.RAZORPAY_BASE_PLAN_ID,
      customer_notify: 1, // 1 for notify the customer, 0 otherwise
      // quantity: 1,
      total_count: 12
    };

    // Add customer_id if provided
    if (data?.customerId) {
      subscriptionOptions.customer_id = data?.customerId;
    }

    // Create the subscription on Razorpay
    const subscription = await razorpay.subscriptions.create(subscriptionOptions);

    // Update current user with subscription_id
    const { error: updatedUserError, data: updatedUser } = await supabase
            .from('profiles')
            .update({ 
              subscription_id: subscription?.id,
              subscription_status: subscription?.status,
              // Add any other fields you want to update
            })
            .eq('id', user.id);

    if (updatedUserError) {
      console.log('error: ', updatedUserError)
    } else {
      console.log('updatedUser: ', updatedUser)
    }

    // Return the subscription details
    return res.status(200).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    console.error('Razorpay subscription creation error:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Failed to create subscription',
      message: error.message || 'Internal server error',
    });
  }
}