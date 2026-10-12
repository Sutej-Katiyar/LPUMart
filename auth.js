const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function setAuthTheme(theme) {
    const dark = theme === "dark";
    document.documentElement.classList.toggle("dark-mode", dark);
    document.body.classList.toggle("dark-mode", dark);
    if (themeIcon) themeIcon.textContent = dark ? "☾" : "☀";
    if (themeToggle) {
        themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
        themeToggle.title = dark ? "Switch to light mode" : "Switch to dark mode";
    }
    localStorage.setItem("marketplaceTheme", dark ? "dark" : "light");
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isDark = document.documentElement.classList.contains("dark-mode") || document.body.classList.contains("dark-mode");
        setAuthTheme(isDark ? "light" : "dark");
    });
    setAuthTheme(document.documentElement.classList.contains("dark-mode") ? "dark" : "light");
}

const form = document.getElementById('authForm');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');
const submitBtn = document.getElementById('submitBtn');
const nameWrap = document.getElementById('nameWrap');
const message = document.getElementById('message');
const googleBtn = document.getElementById('googleBtn');
const googleText = document.getElementById('googleText');

let mode = 'login';

function setMode(m) {
    mode = m;
    const signup = m === 'signup';

    loginTab.classList.toggle('active', !signup);
    signupTab.classList.toggle('active', signup);
    title.textContent = signup ? 'Create your account' : 'Welcome back';
    subtitle.textContent = signup
        ? 'Create a LPUMart account to continue.'
        : 'Sign in to your LPUMart account.';
    submitBtn.textContent = signup ? 'Create Account' : 'Login';
    googleText.textContent = signup ? 'Sign up with Google' : 'Continue with Google';
    nameWrap.classList.toggle('hidden', !signup);
    document.getElementById('name').required = signup;
    message.textContent = '';
}

function showMessage(text, good = false) {
    message.style.color = good ? '#287a45' : '#d33';
    message.textContent = text;
}

function getNextPage() {
    const next = new URLSearchParams(location.search).get('next');
    return next && !next.startsWith('http') ? next : 'index.html';
}

function getOAuthRedirect() {
    // Always return to the deployed Netlify marketplace after OAuth.
    return 'https://lpumarketplace.netlify.app/';
}

loginTab.onclick = () => setMode('login');
signupTab.onclick = () => setMode('signup');

googleBtn.onclick = async () => {
    googleBtn.disabled = true;
    message.textContent = '';

    try {
        const { error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: getOAuthRedirect()
            }
        });

        if (error) throw error;
    } catch (err) {
        showMessage(err.message || 'Google sign-in could not be started.');
        googleBtn.disabled = false;
    }
};

form.onsubmit = async (e) => {
    e.preventDefault();
    message.textContent = '';
    submitBtn.disabled = true;

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value.trim();

    try {
        if (mode === 'login') {
            const { error } = await supabaseClient.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;
            window.location.href = getNextPage();
            return;
        }

        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name
                }
            }
        });

        if (error) throw error;

        // With Supabase "Confirm email" disabled, signUp returns a session and
        // the new user can enter the website immediately.
        if (data.session) {
            window.location.href = getNextPage();
            return;
        }

        // If Confirm email is still enabled in Supabase, there will be no session.
        showMessage(
            'Account created! Please check your email and click the confirmation link before logging in.',
            true
        );
    } catch (err) {
        showMessage(err.message || 'Authentication failed.');
    } finally {
        submitBtn.disabled = false;
    }
};

// Keep authentication dark mode in sync with both html and body.
(function(){
  const sync=()=>{const dark=document.documentElement.classList.contains('dark-mode');document.body.classList.toggle('dark-mode',dark);};
  sync();
  window.addEventListener('storage',e=>{if(e.key==='marketplaceTheme') sync();});
})();
