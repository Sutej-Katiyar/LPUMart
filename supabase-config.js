// Supabase configuration for the marketplace.
// The publishable key is safe to use in browser code when Row Level Security is enabled.
const SUPABASE_URL = "https://ywdkdhqvspuxsvtskqmj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_vNvmo00OW84Z9r8qL92gKQ_Awjyso-5";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

// Google OAuth Web Client ID (configured in Supabase Auth > Providers > Google).
// This is a public client identifier; never put the Google client secret here.
const GOOGLE_OAUTH_CLIENT_ID = "1077046321316-03ldijnmmalhacv2d9feetj4jtvornoi.apps.googleusercontent.com";
