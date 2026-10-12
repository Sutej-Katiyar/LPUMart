/* LPUMart multilingual UI - translates the complete interface, including dynamically rendered content. */
(function(){
  const KEY='marketplaceLanguage';
  const dict={
    hi:{
      'Home':'होम','Products':'प्रोडक्ट्स','Categories':'श्रेणियाँ','Contact':'संपर्क','Login':'लॉग इन','Account':'अकाउंट','Sign Up':'साइन अप','Deals':'डील्स','Deals & Top Rated':'डील्स और टॉप रेटेड','Compare Products':'प्रोडक्ट तुलना','Wishlist':'विशलिस्ट','Cart':'कार्ट','Checkout':'चेकआउट','My Orders':'मेरे ऑर्डर','Track Order':'ऑर्डर ट्रैक करें','Returns & Help':'रिटर्न और सहायता','My Account':'मेरा अकाउंट','Admin Dashboard':'एडमिन डैशबोर्ड','Contact Support':'सपोर्ट से संपर्क करें','Browse Products':'प्रोडक्ट्स देखें','Features':'फीचर्स','Search':'खोजें','Search products...':'प्रोडक्ट खोजें...','General':'जनरल','Grocery':'किराना','Pharmacy':'फार्मेसी','View Product':'प्रोडक्ट देखें','View all products →':'सभी प्रोडक्ट देखें →','View Products':'प्रोडक्ट देखें','Add to Cart':'कार्ट में जोड़ें','Remove':'हटाएँ','Save Changes':'बदलाव सेव करें','Cancel':'रद्द करें','Edit Details':'जानकारी संपादित करें','Secure marketplace account':'सुरक्षित मार्केटप्लेस अकाउंट','Welcome back':'वापसी पर स्वागत है','Sign in to your LPUMart account.':'अपने मार्केटप्लेस अकाउंट में साइन इन करें।','Full Name':'पूरा नाम','Password':'पासवर्ड','Email':'ईमेल','Phone':'फोन','Address':'पता','City':'शहर','State':'राज्य','PIN code':'पिन कोड','Landmark':'लैंडमार्क','Payment method':'भुगतान का तरीका','Cash on Delivery':'कैश ऑन डिलीवरी','UPI / Online Payment':'UPI / ऑनलाइन भुगतान','Continue with Google':'Google से जारी रखें','Back to LPUMart':'मार्केटप्लेस पर वापस जाएँ','Admin Login':'एडमिन लॉगिन','Order placed':'ऑर्डर प्लेस हो गया','Cancelled':'रद्द किया गया','Loading product…':'प्रोडक्ट लोड हो रहा है…','Ratings & Reviews':'रेटिंग और समीक्षाएँ','Write a review':'समीक्षा लिखें','Share your experience after trying the product.':'प्रोडक्ट इस्तेमाल करने के बाद अपना अनुभव साझा करें।','Rating':'रेटिंग','Title':'शीर्षक','Review':'समीक्षा','Submit Review':'समीक्षा भेजें','You may also like':'आपको यह भी पसंद आ सकता है','More products from the same category.':'इसी श्रेणी के और प्रोडक्ट।','Easy returns':'आसान रिटर्न','Damaged or incorrect item':'क्षतिग्रस्त या गलत प्रोडक्ट','Order cancellation':'ऑर्डर रद्द करना','Need more help?':'और मदद चाहिए?','Your Profile':'आपकी प्रोफाइल','Purchase History':'खरीदारी इतिहास','Current Orders':'वर्तमान ऑर्डर','Your Wishlist':'आपकी विशलिस्ट','Your Cart':'आपका कार्ट','Recently Viewed':'हाल ही में देखे गए','Notifications':'सूचनाएँ','Saved Addresses':'सेव किए गए पते','Sign out':'साइन आउट','Edit your details':'अपनी जानकारी संपादित करें','Profile':'प्रोफाइल','Orders':'ऑर्डर','Addresses':'पते','Place Order':'ऑर्डर करें','Order Summary':'ऑर्डर सारांश','Subtotal':'उप-योग','Free':'मुफ्त','Discount':'छूट','Total':'कुल','Apply':'लागू करें','Coupon code':'कूपन कोड','Have a coupon? Apply it before placing the order.':'कूपन है? ऑर्डर करने से पहले इसे लागू करें।','No products found':'कोई प्रोडक्ट नहीं मिला','Try another search, category or marketplace mode.':'दूसरी खोज, श्रेणी या मार्केटप्लेस मोड आज़माएँ।','All categories':'सभी श्रेणियाँ','Featured':'फीचर्ड','Price: Low to High':'कीमत: कम से अधिक','Price: High to Low':'कीमत: अधिक से कम','Customer Rating':'ग्राहक रेटिंग','Explore Products':'प्रोडक्ट्स देखें','Shop by Category':'श्रेणी के अनुसार खरीदें','Why shop here?':'यहाँ क्यों खरीदें?','LPUMart Overview':'मार्केटप्लेस अवलोकन','Featured Products':'फीचर्ड प्रोडक्ट्स','Ready to start shopping?':'खरीदारी शुरू करने के लिए तैयार?','Discover & Compare':'खोजें और तुलना करें','Find faster':'जल्दी खोजें','Compare before buying':'खरीदने से पहले तुलना करें','Stay in control':'नियंत्रण में रहें','Help after purchase':'खरीदारी के बाद सहायता','Products':'प्रोडक्ट्स','Categories':'श्रेणियाँ','Average Price':'औसत कीमत','Product Management':'प्रोडक्ट प्रबंधन','Total Products':'कुल प्रोडक्ट्स','Low Stock':'कम स्टॉक','Top Rated':'टॉप रेटेड','Discounted':'डिस्काउंटेड','Product':'प्रोडक्ट','Category':'श्रेणी','Price':'कीमत','Stock':'स्टॉक','Actions':'एक्शन','Add Product':'प्रोडक्ट जोड़ें','Product Name':'प्रोडक्ट नाम','LPUMart Mode':'मार्केटप्लेस मोड','Select category':'श्रेणी चुनें','Product Image':'प्रोडक्ट इमेज','Remove image':'इमेज हटाएँ','Original Price (₹)':'मूल कीमत (₹)','Review Count':'समीक्षा संख्या','Badge':'बैज','Delivery Text':'डिलीवरी टेक्स्ट','Description':'विवरण','Logout':'लॉगआउट','ADMIN DASHBOARD':'एडमिन डैशबोर्ड','PRODUCT':'प्रोडक्ट','Add/Edit Modal':'जोड़ें/संपादित करें','ORDER & DELIVERY':'ऑर्डर और डिलीवरी','Complete Your Order':'अपना ऑर्डर पूरा करें','Delivery':'डिलीवरी','Payment':'भुगतान','Review':'समीक्षा','Delivery information':'डिलीवरी जानकारी','Payment method *':'भुगतान का तरीका *','Full name *':'पूरा नाम *','Email *':'ईमेल *','Phone number *':'फोन नंबर *','PIN code *':'पिन कोड *','House / Flat / Street address *':'घर / फ्लैट / सड़क का पता *','City *':'शहर *','State *':'राज्य *','Landmark':'लैंडमार्क','Save this address to my account':'इस पते को मेरे अकाउंट में सेव करें','Offers & confirmation':'ऑफर और पुष्टि','ORDER VISIBILITY':'ऑर्डर विजिबिलिटी','Track Your Order':'अपना ऑर्डर ट्रैक करें','Order number':'ऑर्डर नंबर','Track':'ट्रैक करें','SAVED FOR LATER':'बाद के लिए सेव किया गया','My Wishlist':'मेरी विशलिस्ट','Your saved products':'आपके सेव किए गए प्रोडक्ट्स','Continue shopping →':'खरीदारी जारी रखें →','Contact Us':'संपर्क करें','Get in Touch':'संपर्क में रहें','Our Location':'हमारा स्थान','Email Us':'हमें ईमेल करें','Call Us':'हमें कॉल करें','Working Hours':'काम के घंटे','Send Us a Message':'हमें संदेश भेजें','Your Name':'आपका नाम','Email Address':'ईमेल पता','Subject':'विषय','Message':'संदेश','Send Message':'संदेश भेजें','Frequently Asked Questions':'अक्सर पूछे जाने वाले प्रश्न','Quick answers to common questions':'आम सवालों के त्वरित जवाब','How can I track my order?':'मैं अपना ऑर्डर कैसे ट्रैक कर सकता हूँ?','How do I become a seller?':'मैं विक्रेता कैसे बन सकता हूँ?','How can I request a refund?':'मैं रिफंड का अनुरोध कैसे कर सकता हूँ?','Returns & Customer Help':'रिटर्न और ग्राहक सहायता','Clear policies and quick paths for common post-purchase issues.':'खरीदारी के बाद आम समस्याओं के लिए स्पष्ट नीतियाँ और आसान सहायता।','Contact Support':'सपोर्ट से संपर्क करें','Admin Email':'एडमिन ईमेल','Sign In':'साइन इन','This is a separate admin sign-in. Your normal LPUMart login does not grant access.':'यह अलग एडमिन साइन-इन है। आपका सामान्य मार्केटप्लेस लॉगिन एडमिन एक्सेस नहीं देता।'
    },
    pa:{
      'Home':'ਹੋਮ','Products':'ਉਤਪਾਦ','Categories':'ਸ਼੍ਰੇਣੀਆਂ','Contact':'ਸੰਪਰਕ','Login':'ਲਾਗ ਇਨ','Account':'ਅਕਾਊਂਟ','Sign Up':'ਸਾਈਨ ਅੱਪ','Deals':'ਡੀਲ','Deals & Top Rated':'ਡੀਲ ਅਤੇ ਟੌਪ ਰੇਟਡ','Compare Products':'ਉਤਪਾਦ ਤੁਲਨਾ','Wishlist':'ਵਿਸ਼ਲਿਸਟ','Cart':'ਕਾਰਟ','Checkout':'ਚੈੱਕਆਉਟ','My Orders':'ਮੇਰੇ ਆਰਡਰ','Track Order':'ਆਰਡਰ ਟ੍ਰੈਕ ਕਰੋ','Returns & Help':'ਰਿਟਰਨ ਅਤੇ ਮਦਦ','My Account':'ਮੇਰਾ ਅਕਾਊਂਟ','Admin Dashboard':'ਐਡਮਿਨ ਡੈਸ਼ਬੋਰਡ','Contact Support':'ਸਪੋਰਟ ਨਾਲ ਸੰਪਰਕ','Browse Products':'ਉਤਪਾਦ ਵੇਖੋ','Features':'ਫੀਚਰ','Search':'ਖੋਜੋ','Search products...':'ਉਤਪਾਦ ਖੋਜੋ...','General':'ਜਨਰਲ','Grocery':'ਕਿਰਿਆਨਾ','Pharmacy':'ਫਾਰਮੇਸੀ','View Product':'ਉਤਪਾਦ ਵੇਖੋ','View all products →':'ਸਾਰੇ ਉਤਪਾਦ ਵੇਖੋ →','View Products':'ਉਤਪਾਦ ਵੇਖੋ','Add to Cart':'ਕਾਰਟ ਵਿੱਚ ਪਾਓ','Remove':'ਹਟਾਓ','Save Changes':'ਬਦਲਾਅ ਸੇਵ ਕਰੋ','Cancel':'ਰੱਦ ਕਰੋ','Edit Details':'ਵੇਰਵੇ ਸੋਧੋ','Secure marketplace account':'ਸੁਰੱਖਿਅਤ ਮਾਰਕੀਟਪਲੇਸ ਅਕਾਊਂਟ','Welcome back':'ਜੀ ਆਇਆਂ ਨੂੰ','Sign in to your LPUMart account.':'ਆਪਣੇ ਮਾਰਕੀਟਪਲੇਸ ਅਕਾਊਂਟ ਵਿੱਚ ਸਾਈਨ ਇਨ ਕਰੋ।','Full Name':'ਪੂਰਾ ਨਾਮ','Password':'ਪਾਸਵਰਡ','Email':'ਈਮੇਲ','Phone':'ਫੋਨ','Address':'ਪਤਾ','City':'ਸ਼ਹਿਰ','State':'ਰਾਜ','PIN code':'ਪਿੰਨ ਕੋਡ','Landmark':'ਲੈਂਡਮਾਰਕ','Payment method':'ਭੁਗਤਾਨ ਦਾ ਤਰੀਕਾ','Cash on Delivery':'ਕੈਸ਼ ਆਨ ਡਿਲਿਵਰੀ','UPI / Online Payment':'UPI / ਆਨਲਾਈਨ ਭੁਗਤਾਨ','Continue with Google':'Google ਨਾਲ ਜਾਰੀ ਰੱਖੋ','Back to LPUMart':'ਮਾਰਕੀਟਪਲੇਸ ਵੱਲ ਵਾਪਸ','Admin Login':'ਐਡਮਿਨ ਲਾਗਿਨ','Order placed':'ਆਰਡਰ ਪਲੇਸ ਹੋ ਗਿਆ','Cancelled':'ਰੱਦ ਕੀਤਾ ਗਿਆ','Loading product…':'ਉਤਪਾਦ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ…','Ratings & Reviews':'ਰੇਟਿੰਗ ਅਤੇ ਸਮੀਖਿਆਵਾਂ','Write a review':'ਸਮੀਖਿਆ ਲਿਖੋ','Share your experience after trying the product.':'ਉਤਪਾਦ ਵਰਤਣ ਤੋਂ ਬਾਅਦ ਆਪਣਾ ਅਨੁਭਵ ਸਾਂਝਾ ਕਰੋ।','Rating':'ਰੇਟਿੰਗ','Title':'ਸਿਰਲੇਖ','Review':'ਸਮੀਖਿਆ','Submit Review':'ਸਮੀਖਿਆ ਭੇਜੋ','You may also like':'ਤੁਹਾਨੂੰ ਇਹ ਵੀ ਪਸੰਦ ਆ ਸਕਦਾ ਹੈ','More products from the same category.':'ਇਸੇ ਸ਼੍ਰੇਣੀ ਦੇ ਹੋਰ ਉਤਪਾਦ।','Easy returns':'ਆਸਾਨ ਰਿਟਰਨ','Damaged or incorrect item':'ਨੁਕਸਾਨਿਆ ਜਾਂ ਗਲਤ ਉਤਪਾਦ','Order cancellation':'ਆਰਡਰ ਰੱਦ ਕਰਨਾ','Need more help?':'ਹੋਰ ਮਦਦ ਚਾਹੀਦੀ ਹੈ?','Your Profile':'ਤੁਹਾਡੀ ਪ੍ਰੋਫਾਈਲ','Current Orders':'ਮੌਜੂਦਾ ਆਰਡਰ','Your Wishlist':'ਤੁਹਾਡੀ ਵਿਸ਼ਲਿਸਟ','Your Cart':'ਤੁਹਾਡਾ ਕਾਰਟ','Recently Viewed':'ਹਾਲ ਹੀ ਵਿੱਚ ਵੇਖੇ','Notifications':'ਸੂਚਨਾਵਾਂ','Saved Addresses':'ਸੇਵ ਕੀਤੇ ਪਤੇ','Sign out':'ਸਾਈਨ ਆਊਟ','Edit your details':'ਆਪਣੇ ਵੇਰਵੇ ਸੋਧੋ','Profile':'ਪ੍ਰੋਫਾਈਲ','Orders':'ਆਰਡਰ','Addresses':'ਪਤੇ','Place Order':'ਆਰਡਰ ਕਰੋ','Order Summary':'ਆਰਡਰ ਸਾਰਾਂਸ਼','Subtotal':'ਉਪ-ਜੋੜ','Free':'ਮੁਫ਼ਤ','Discount':'ਛੂਟ','Total':'ਕੁੱਲ','Apply':'ਲਾਗੂ ਕਰੋ','Coupon code':'ਕੂਪਨ ਕੋਡ','Have a coupon? Apply it before placing the order.':'ਕੂਪਨ ਹੈ? ਆਰਡਰ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਲਾਗੂ ਕਰੋ।','No products found':'ਕੋਈ ਉਤਪਾਦ ਨਹੀਂ ਮਿਲਿਆ','Try another search, category or marketplace mode.':'ਹੋਰ ਖੋਜ, ਸ਼੍ਰੇਣੀ ਜਾਂ ਮਾਰਕੀਟਪਲੇਸ ਮੋਡ ਅਜ਼ਮਾਓ।','All categories':'ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ','Featured':'ਫੀਚਰਡ','Price: Low to High':'ਕੀਮਤ: ਘੱਟ ਤੋਂ ਵੱਧ','Price: High to Low':'ਕੀਮਤ: ਵੱਧ ਤੋਂ ਘੱਟ','Customer Rating':'ਗਾਹਕ ਰੇਟਿੰਗ','Explore Products':'ਉਤਪਾਦ ਵੇਖੋ','Shop by Category':'ਸ਼੍ਰੇਣੀ ਅਨੁਸਾਰ ਖਰੀਦੋ','Why shop here?':'ਇੱਥੇ ਕਿਉਂ ਖਰੀਦੋ?','LPUMart Overview':'ਮਾਰਕੀਟਪਲੇਸ ਝਲਕ','Featured Products':'ਫੀਚਰਡ ਉਤਪਾਦ','Ready to start shopping?':'ਖਰੀਦਦਾਰੀ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਤਿਆਰ?','Discover & Compare':'ਖੋਜੋ ਅਤੇ ਤੁਲਨਾ ਕਰੋ','Find faster':'ਤੇਜ਼ੀ ਨਾਲ ਲੱਭੋ','Compare before buying':'ਖਰੀਦਣ ਤੋਂ ਪਹਿਲਾਂ ਤੁਲਨਾ ਕਰੋ','Stay in control':'ਕੰਟਰੋਲ ਵਿੱਚ ਰਹੋ','Help after purchase':'ਖਰੀਦ ਤੋਂ ਬਾਅਦ ਮਦਦ','Average Price':'ਔਸਤ ਕੀਮਤ','Product Management':'ਉਤਪਾਦ ਪ੍ਰਬੰਧਨ','Total Products':'ਕੁੱਲ ਉਤਪਾਦ','Low Stock':'ਘੱਟ ਸਟਾਕ','Top Rated':'ਟੌਪ ਰੇਟਡ','Discounted':'ਛੂਟ ਵਾਲੇ','Product':'ਉਤਪਾਦ','Category':'ਸ਼੍ਰੇਣੀ','Price':'ਕੀਮਤ','Stock':'ਸਟਾਕ','Actions':'ਕਾਰਵਾਈਆਂ','Add Product':'ਉਤਪਾਦ ਜੋੜੋ','Product Name':'ਉਤਪਾਦ ਨਾਮ','LPUMart Mode':'ਮਾਰਕੀਟਪਲੇਸ ਮੋਡ','Select category':'ਸ਼੍ਰੇਣੀ ਚੁਣੋ','Product Image':'ਉਤਪਾਦ ਤਸਵੀਰ','Remove image':'ਤਸਵੀਰ ਹਟਾਓ','Original Price (₹)':'ਮੂਲ ਕੀਮਤ (₹)','Review Count':'ਸਮੀਖਿਆ ਗਿਣਤੀ','Badge':'ਬੈਜ','Delivery Text':'ਡਿਲਿਵਰੀ ਟੈਕਸਟ','Description':'ਵੇਰਵਾ','Logout':'ਲਾਗਆਉਟ','ADMIN DASHBOARD':'ਐਡਮਿਨ ਡੈਸ਼ਬੋਰਡ','PRODUCT':'ਉਤਪਾਦ','Add/Edit Modal':'ਜੋੜੋ/ਸੋਧੋ','ORDER & DELIVERY':'ਆਰਡਰ ਅਤੇ ਡਿਲਿਵਰੀ','Complete Your Order':'ਆਪਣਾ ਆਰਡਰ ਪੂਰਾ ਕਰੋ','Delivery':'ਡਿਲਿਵਰੀ','Payment':'ਭੁਗਤਾਨ','Review':'ਸਮੀਖਿਆ','Delivery information':'ਡਿਲਿਵਰੀ ਜਾਣਕਾਰੀ','Payment method *':'ਭੁਗਤਾਨ ਦਾ ਤਰੀਕਾ *','Full name *':'ਪੂਰਾ ਨਾਮ *','Email *':'ਈਮੇਲ *','Phone number *':'ਫੋਨ ਨੰਬਰ *','PIN code *':'ਪਿੰਨ ਕੋਡ *','House / Flat / Street address *':'ਘਰ / ਫਲੈਟ / ਗਲੀ ਦਾ ਪਤਾ *','City *':'ਸ਼ਹਿਰ *','State *':'ਰਾਜ *','Landmark':'ਲੈਂਡਮਾਰਕ','Save this address to my account':'ਇਸ ਪਤੇ ਨੂੰ ਮੇਰੇ ਅਕਾਊਂਟ ਵਿੱਚ ਸੇਵ ਕਰੋ','Offers & confirmation':'ਆਫਰ ਅਤੇ ਪੁਸ਼ਟੀ','ORDER VISIBILITY':'ਆਰਡਰ ਵਿਜ਼ਿਬਿਲਟੀ','Track Your Order':'ਆਪਣਾ ਆਰਡਰ ਟ੍ਰੈਕ ਕਰੋ','Order number':'ਆਰਡਰ ਨੰਬਰ','Track':'ਟ੍ਰੈਕ','SAVED FOR LATER':'ਬਾਅਦ ਲਈ ਸੇਵ ਕੀਤਾ','My Wishlist':'ਮੇਰੀ ਵਿਸ਼ਲਿਸਟ','Your saved products':'ਤੁਹਾਡੇ ਸੇਵ ਕੀਤੇ ਉਤਪਾਦ','Continue shopping →':'ਖਰੀਦਦਾਰੀ ਜਾਰੀ ਰੱਖੋ →','Contact Us':'ਸੰਪਰਕ ਕਰੋ','Get in Touch':'ਸੰਪਰਕ ਵਿੱਚ ਰਹੋ','Our Location':'ਸਾਡਾ ਸਥਾਨ','Email Us':'ਸਾਨੂੰ ਈਮੇਲ ਕਰੋ','Call Us':'ਸਾਨੂੰ ਕਾਲ ਕਰੋ','Working Hours':'ਕੰਮ ਦੇ ਘੰਟੇ','Send Us a Message':'ਸਾਨੂੰ ਸੁਨੇਹਾ ਭੇਜੋ','Your Name':'ਤੁਹਾਡਾ ਨਾਮ','Email Address':'ਈਮੇਲ ਪਤਾ','Subject':'ਵਿਸ਼ਾ','Message':'ਸੁਨੇਹਾ','Send Message':'ਸੁਨੇਹਾ ਭੇਜੋ','Frequently Asked Questions':'ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ','Quick answers to common questions':'ਆਮ ਸਵਾਲਾਂ ਦੇ ਤੁਰੰਤ ਜਵਾਬ','How can I track my order?':'ਮੈਂ ਆਪਣਾ ਆਰਡਰ ਕਿਵੇਂ ਟ੍ਰੈਕ ਕਰ ਸਕਦਾ ਹਾਂ?','How do I become a seller?':'ਮੈਂ ਵਿਕਰੇਤਾ ਕਿਵੇਂ ਬਣ ਸਕਦਾ ਹਾਂ?','How can I request a refund?':'ਮੈਂ ਰਿਫੰਡ ਦੀ ਬੇਨਤੀ ਕਿਵੇਂ ਕਰ ਸਕਦਾ ਹਾਂ?','Returns & Customer Help':'ਰਿਟਰਨ ਅਤੇ ਗਾਹਕ ਮਦਦ','Clear policies and quick paths for common post-purchase issues.':'ਖਰੀਦ ਤੋਂ ਬਾਅਦ ਆਮ ਸਮੱਸਿਆਵਾਂ ਲਈ ਸਪਸ਼ਟ ਨੀਤੀਆਂ ਅਤੇ ਆਸਾਨ ਮਦਦ।','Contact Support':'ਸਪੋਰਟ ਨਾਲ ਸੰਪਰਕ','Admin Email':'ਐਡਮਿਨ ਈਮੇਲ','Sign In':'ਸਾਈਨ ਇਨ','This is a separate admin sign-in. Your normal LPUMart login does not grant access.':'ਇਹ ਵੱਖਰਾ ਐਡਮਿਨ ਸਾਈਨ-ਇਨ ਹੈ। ਤੁਹਾਡਾ ਆਮ ਮਾਰਕੀਟਪਲੇਸ ਲਾਗਿਨ ਐਡਮਿਨ ਐਕਸੈਸ ਨਹੀਂ ਦਿੰਦਾ।'
    }
  };
  let current='en';
  let translating=false;
  const reverse={hi:new Set(Object.values(dict.hi)),pa:new Set(Object.values(dict.pa))};

  function textKey(el){
    if(!el || el.nodeType!==1 || ['SCRIPT','STYLE','NOSCRIPT'].includes(el.tagName)) return null;
    if(el.children.length) return null;
    const text=el.textContent.trim();
    if(!text || text.length>220) return null;
    if(!el.dataset.i18nKey || (current==='en' && !reverse.hi.has(text) && !reverse.pa.has(text) && text!==dict.hi[el.dataset.i18nKey] && text!==dict.pa[el.dataset.i18nKey])){
      el.dataset.i18nKey=text;
    }
    return el.dataset.i18nKey;
  }

  function translateElement(el,lang){
    if(!el || translating || ['SCRIPT','STYLE','NOSCRIPT'].includes(el.tagName)) return;
    const key=textKey(el);
    if(key){
      const translated=lang==='en'?key:(dict[lang]&&dict[lang][key]);
      if(translated && el.textContent.trim()!==translated) el.textContent=translated;
    }
    ['placeholder','title','aria-label'].forEach(attr=>{
      if(!el.hasAttribute(attr)) return;
      const marker='i18n'+attr.replace('-','');
      const original=el.dataset[marker]||el.getAttribute(attr);
      if(!el.dataset[marker] && !reverse[hi]?.has(original) && !reverse[pa]?.has(original)) el.dataset[marker]=original;
      const base=el.dataset[marker]||original;
      const translated=lang==='en'?base:(dict[lang]&&dict[lang][base]);
      if(translated) el.setAttribute(attr,translated);
    });
  }

  function apply(lang){
    current=['en','hi','pa'].includes(lang)?lang:'en';
    translating=true;
    document.documentElement.setAttribute('lang',current==='pa'?'pa-IN':current==='hi'?'hi-IN':'en');
    document.querySelectorAll('body *').forEach(el=>translateElement(el,current));
    document.querySelectorAll('.language-selector').forEach(s=>s.value=current);
    const title=document.querySelector('title');
    if(title){
      const base=title.dataset.i18nKey||title.textContent.trim();
      if(!title.dataset.i18nKey) title.dataset.i18nKey=base;
      title.textContent=current==='en'?base:(dict[current]?.[base]||base);
    }
    localStorage.setItem(KEY,current);
    translating=false;
  }

  function addControl(){
    if(document.querySelector('.language-selector')) return;
    const select=document.createElement('select');
    select.className='language-selector';
    select.setAttribute('aria-label','Website language');
    select.innerHTML='<option value="en">EN</option><option value="hi">हिंदी</option><option value="pa">ਪੰਜਾਬੀ</option>';
    const host=document.querySelector('.nav-actions')||document.querySelector('.auth-actions')||document.querySelector('.feature-drawer-head');
    if(host) host.appendChild(select); else document.body.appendChild(select);
    select.addEventListener('change',()=>apply(select.value));
  }

  const observer=new MutationObserver(mutations=>{
    if(translating || current==='en') return;
    translating=true;
    for(const m of mutations){
      m.addedNodes.forEach(node=>{
        if(node.nodeType===1){
          translateElement(node,current);
          node.querySelectorAll?.('body *').forEach(el=>translateElement(el,current));
          node.querySelectorAll?.('*').forEach(el=>translateElement(el,current));
        }
      });
    }
    translating=false;
  });

  function init(){
    addControl();
    observer.observe(document.body,{childList:true,subtree:true});
    apply(localStorage.getItem(KEY)||'en');
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
  window.marketplaceSetLanguage=apply;
})();
