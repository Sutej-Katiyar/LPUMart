# Google Sign-In setup for LPUMart

The web application already has a **Continue with Google / Sign up with Google** button wired to Supabase Auth. The supplied Google Web OAuth Client ID is stored in `supabase-config.js` as `GOOGLE_OAUTH_CLIENT_ID`.

## 1. Configure Google Cloud

In Google Cloud Console, open the OAuth 2.0 Web Client you created and make sure the **Authorized redirect URI** contains:

`https://ywdkdhqvspuxsvtskqmj.supabase.co/auth/v1/callback`

For production, add `https://lpumarketplace.netlify.app` under **Authorized JavaScript origins**. No localhost URL is required for the deployed site.

## 2. Enable Google in Supabase

Open the Supabase project **LPU LPUMart** → **Authentication** → **Providers** → **Google**.

Enable Google and enter:

- Client ID: `1077046321316-03ldijnmmalhacv2d9feetj4jtvornoi.apps.googleusercontent.com`
- Client Secret: paste the secret from Google Cloud Console into Supabase. **Do not put the secret in this website or commit it to Git.**

Save the provider.

## 3. Configure Supabase redirect URLs

In **Authentication → URL Configuration**, set the Site URL to your deployed website URL and add the deployed website URL to the allowed redirect URLs.

For production, add:

`https://lpumarketplace.netlify.app/`

## 4. Test

Open `auth.html`, choose **Login** or **Sign Up**, and click the Google button. Google should authenticate and Supabase should return the user to `index.html`.

The client ID is safe to appear in frontend code. The Google client secret is not.
