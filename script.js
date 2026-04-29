document.addEventListener('DOMContentLoaded', () => {
    // Parallax Scroll Effect
    const parallaxBg = document.getElementById('parallax-bg');
    window.addEventListener('scroll', () => {
        if (parallaxBg) {
            const scrolled = window.scrollY;
            parallaxBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });

    // Scroll Reveal Function
    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -20px 0px"
        });

        const elementsToReveal = document.querySelectorAll('.step-card, .timeline-item, .info-box');
        elementsToReveal.forEach(el => {
            el.classList.add('reveal-on-scroll');
            // Small delay to allow layout to settle
            setTimeout(() => observer.observe(el), 50);
        });
    }

    // Preloader Logic
    const preloader = document.getElementById('preloader');
    const appContainer = document.querySelector('.app-container');
    
    // Hold the splash screen for 3.5 seconds, then reveal the app
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('hidden');
            appContainer.classList.add('visible');
            
            // Remove preloader from DOM after transition completes
            setTimeout(() => {
                preloader.remove();
            }, 1000);
        }
    }, 3500);

    // DOM Elements
    const topicsGrid = document.getElementById('topicsGrid');
    const contentDisplay = document.getElementById('contentDisplay');
    const contentTitle = document.getElementById('contentTitle');
    const contentBody = document.getElementById('contentBody');
    const backBtn = document.getElementById('backBtn');

    const assistantMessage = document.getElementById('assistantMessage');
    const typingIndicator = document.getElementById('typingIndicator');

    const topicCards = document.querySelectorAll('.topic-card');
    const navBtns = document.querySelectorAll('.nav-btn');

    // Default Assistant Message
    const defaultAssistantHTML = `
        <h2 class="welcome-title">Hello! I'm ElectAssist.</h2>
        <p>I'm here to demystify the election process for you. Whether you're a first-time voter or just need a refresher on the timeline, I've got you covered.</p>
        <p class="prompt-text">What would you like to learn about today?</p>
    `;

    // Data for topics
    const topicsData = {
        registration: {
            title: "Voter Registration Process",
            assistantMsg: "Registering to vote is the first and most crucial step! It's how you ensure your voice can be heard. Make sure you check your local state deadlines.",
            html: `
                <div class="step-grid">
                    <div class="step-card">
                        <div class="step-number">01</div>
                        <div class="step-details">
                            <h4>Check Your Eligibility</h4>
                            <p>Generally, you must be a U.S. citizen, meet your state's residency requirements, and be 18 years old on or before Election Day.</p>
                        </div>
                    </div>
                    <div class="step-card">
                        <div class="step-number">02</div>
                        <div class="step-details">
                            <h4>Gather Necessary Documents</h4>
                            <p>You typically need a state-issued ID, driver's license, or the last 4 digits of your Social Security Number.</p>
                        </div>
                    </div>
                    <div class="step-card">
                        <div class="step-number">03</div>
                        <div class="step-details">
                            <h4>Submit Your Application</h4>
                            <p>You can register online in most states, by mail, or in-person at local election offices or the DMV.</p>
                        </div>
                    </div>
                    <div class="step-card">
                        <div class="step-number">04</div>
                        <div class="step-details">
                            <h4>Verify Your Status</h4>
                            <p>Always verify your registration status a few weeks before the deadline, especially if you've recently moved or changed your name.</p>
                        </div>
                    </div>
                </div>
                <div class="info-box">
                    <p><i class="fa-solid fa-circle-info"></i> <strong>Tip:</strong> Many states offer Same-Day Voter Registration, allowing you to register and vote at the same time!</p>
                </div>
            `
        },
        timeline: {
            title: "The Election Timeline",
            assistantMsg: "The election cycle is a marathon, not a sprint. Here is a typical timeline leading up to the big day.",
            html: `
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-date">Spring - Summer (Election Year)</div>
                        <div class="timeline-content">
                            <h4>Primaries & Caucuses</h4>
                            <p>States hold primary elections or caucuses to choose the presidential nominees for the major political parties.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date">July - August</div>
                        <div class="timeline-content">
                            <h4>National Conventions</h4>
                            <p>Parties hold conventions to officially nominate their candidate for President and Vice President.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date">September - October</div>
                        <div class="timeline-content">
                            <h4>Presidential Debates & Early Voting</h4>
                            <p>Candidates debate on national television. Many states begin sending out mail-in ballots and open early voting centers.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date">Early November</div>
                        <div class="timeline-content">
                            <h4>Election Day</h4>
                            <p>The first Tuesday after the first Monday in November. Millions cast their ballots in person.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date">December - January</div>
                        <div class="timeline-content">
                            <h4>Electoral College & Inauguration</h4>
                            <p>Electors cast official votes in December. The President is inaugurated on January 20th.</p>
                        </div>
                    </div>
                </div>
            `
        },
        methods: {
            title: "Ways to Cast Your Ballot",
            assistantMsg: "Did you know you don't always have to go to a polling place on Election Day? Let's explore the different ways you can vote.",
            html: `
                <div class="step-grid">
                    <div class="step-card">
                        <div class="step-number"><i class="fa-solid fa-check-to-slot"></i></div>
                        <div class="step-details">
                            <h4>In-Person on Election Day</h4>
                            <p>The traditional method. Go to your designated polling place on Election Day. Polls usually open early in the morning and close in the evening.</p>
                        </div>
                    </div>
                    <div class="step-card">
                        <div class="step-number"><i class="fa-solid fa-calendar-check"></i></div>
                        <div class="step-details">
                            <h4>Early Voting (In-Person)</h4>
                            <p>Many states allow you to vote in person before Election Day. This helps avoid long lines and gives you flexibility with your schedule.</p>
                        </div>
                    </div>
                    <div class="step-card">
                        <div class="step-number"><i class="fa-solid fa-envelope"></i></div>
                        <div class="step-details">
                            <h4>Mail-in / Absentee Voting</h4>
                            <p>Request a ballot be sent to your home. You fill it out and mail it back or drop it in a secure drop box. Great for convenience or if you are away from home.</p>
                        </div>
                    </div>
                </div>
                <div class="info-box">
                    <p><i class="fa-solid fa-triangle-exclamation"></i> <strong>Important:</strong> Rules for early and mail-in voting vary significantly by state. Always check your local election office website for specific deadlines and requirements.</p>
                </div>
            `
        },
        faq: {
            title: "Frequently Asked Questions",
            assistantMsg: "It's completely normal to have questions! Here are some of the most common things people ask me about voting.",
            html: `
                <div class="step-grid">
                    <div class="step-card">
                        <div class="step-number">Q.</div>
                        <div class="step-details">
                            <h4>Do I need an ID to vote?</h4>
                            <p>It depends on your state. About two-thirds of states require you to show some form of identification at the polls. Check your state's specific Voter ID laws.</p>
                        </div>
                    </div>
                    <div class="step-card">
                        <div class="step-number">Q.</div>
                        <div class="step-details">
                            <h4>What if I'm in line when the polls close?</h4>
                            <p>STAY IN LINE! As long as you are in line before the official closing time, you have the legal right to cast your ballot.</p>
                        </div>
                    </div>
                    <div class="step-card">
                        <div class="step-number">Q.</div>
                        <div class="step-details">
                            <h4>Can I take a selfie with my ballot?</h4>
                            <p>Laws vary by state. In some states, "ballot selfies" are illegal to protect the secrecy of the ballot and prevent vote-buying. It's best to take your selfie with your "I Voted" sticker outside the polling place instead.</p>
                        </div>
                    </div>
                </div>
            `
        },
        search_roll: {
            title: "Search in Electoral Roll",
            assistantMsg: "It's always a good idea to verify your name on the voter list before Election Day! Here is how you can search.",
            html: `
                <div class="step-grid">
                    <div class="step-card">
                        <div class="step-number"><i class="fa-solid fa-id-badge"></i></div>
                        <div class="step-details">
                            <h4>Search by EPIC (Voter ID Number)</h4>
                            <p>If you already have your Voter ID card, simply enter the unique EPIC number printed on it. This is the fastest way to find your exact details and polling station.</p>
                        </div>
                    </div>
                    <div class="step-card">
                        <div class="step-number"><i class="fa-solid fa-users-viewfinder"></i></div>
                        <div class="step-details">
                            <h4>Search by Details</h4>
                            <p>Don't have your EPIC number handy? You can search by entering your Name, Father's/Husband's Name, Age/Date of Birth, Gender, State, and District.</p>
                        </div>
                    </div>
                    <div class="step-card">
                        <div class="step-number"><i class="fa-solid fa-mobile-screen-button"></i></div>
                        <div class="step-details">
                            <h4>Search by Mobile Number</h4>
                            <p>If your mobile number is linked to your Voter ID, you can quickly verify your details by entering your phone number and an OTP.</p>
                        </div>
                    </div>
                </div>
                <div class="info-box">
                    <p><i class="fa-solid fa-lightbulb"></i> <strong>Tip:</strong> Once you find your name, you can view your Booth Level Officer (BLO) details and the exact address of your designated Polling Booth.</p>
                </div>
            `
        },
        forms: {
            title: "Voter Services & Forms",
            assistantMsg: "Different forms serve different purposes. Let me break down the most common forms you might need on the Voters' Portal.",
            html: `
                <div class="step-grid">
                    <div class="step-card">
                        <div class="step-number">6</div>
                        <div class="step-details">
                            <h4>Form 6: New Registration</h4>
                            <p>For first-time voters or citizens who have never registered before. Use this form to apply for inclusion of your name in the electoral roll.</p>
                        </div>
                    </div>
                    <div class="step-card">
                        <div class="step-number">8</div>
                        <div class="step-details">
                            <h4>Form 8: Corrections & Shifting</h4>
                            <p>Moved to a new home? Need to correct a spelling mistake in your name? Lost your Voter ID and need a replacement? Form 8 is your go-to application.</p>
                        </div>
                    </div>
                    <div class="step-card">
                        <div class="step-number">6B</div>
                        <div class="step-details">
                            <h4>Form 6B: Aadhaar Linkage</h4>
                            <p>Use this form to voluntarily link your Aadhaar number to your Voter ID (EPIC) for authentication and deduplication purposes.</p>
                        </div>
                    </div>
                </div>
                <div class="info-box">
                    <p><i class="fa-solid fa-download"></i> <strong>e-EPIC:</strong> You can also download a digital, printable copy of your Voter ID card (e-EPIC) directly from the portal once your mobile number is linked.</p>
                </div>
            `
        },
        track_status: {
            title: "Track Application Status",
            assistantMsg: "Submitted a form recently? You don't have to guess what's happening. You can track its exact progress online.",
            html: `
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-date">Step 1</div>
                        <div class="timeline-content">
                            <h4>Find Your Reference ID</h4>
                            <p>When you submit any form (like Form 6 or 8), you receive a unique Reference ID via SMS or email. Keep this number safe!</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date">Step 2</div>
                        <div class="timeline-content">
                            <h4>Visit the Track Status Page</h4>
                            <p>Go to the official Voters' Services Portal and click on the 'Track Application Status' button.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date">Step 3</div>
                        <div class="timeline-content">
                            <h4>Enter Details & Track</h4>
                            <p>Enter your Reference ID and select your State. The system will show you the real-time status of your application (e.g., Submitted, BLO Appointed, Field Verified, Accepted/Rejected).</p>
                        </div>
                    </div>
                </div>
            `
        },
        cvigil: {
            title: "cVIGIL App for Citizens",
            assistantMsg: "The cVIGIL app empowers citizens to be the eyes and ears of the Election Commission. You can report violations instantly!",
            html: `
                <div class="content-banner">
                    <img src="cvigil_app_mockup.png" alt="cVIGIL App on Phone" style="width: 100%; max-width: 300px; border-radius: 0; margin: 0 auto 2rem auto; display: block; box-shadow: var(--glass-shadow);">
                </div>
                <div class="step-grid">
                    <div class="step-card">
                        <div class="step-number"><i class="fa-solid fa-camera"></i></div>
                        <div class="step-details">
                            <h4>Capture Violations</h4>
                            <p>See a Model Code of Conduct violation? (Like distributing money, liquor, or campaigning after deadlines). Just take a photo or a 2-minute video.</p>
                        </div>
                    </div>
                    <div class="step-card">
                        <div class="step-number"><i class="fa-solid fa-location-arrow"></i></div>
                        <div class="step-details">
                            <h4>Auto-Location Tracking</h4>
                            <p>The app automatically captures your GPS location when you take the photo, so the flying squads know exactly where to go.</p>
                        </div>
                    </div>
                    <div class="step-card">
                        <div class="step-number"><i class="fa-solid fa-stopwatch"></i></div>
                        <div class="step-details">
                            <h4>100-Minute Resolution</h4>
                            <p>The ECI aims to resolve cVIGIL complaints within 100 minutes. A flying squad is dispatched immediately to the location to take action.</p>
                        </div>
                    </div>
                </div>
            `
        },
        kyc: {
            title: "Know Your Candidate (KYC)",
            assistantMsg: "An informed voter is a powerful voter. The ECI ensures you have access to crucial information about the people asking for your vote.",
            html: `
                <div class="step-grid">
                    <div class="step-card">
                        <div class="step-number"><i class="fa-solid fa-scale-balanced"></i></div>
                        <div class="step-details">
                            <h4>Criminal Antecedents</h4>
                            <p>Candidates with criminal records must declare them. The KYC app allows you to easily view if a candidate contesting in your constituency has any pending criminal cases.</p>
                        </div>
                    </div>
                    <div class="step-card">
                        <div class="step-number"><i class="fa-solid fa-file-invoice-dollar"></i></div>
                        <div class="step-details">
                            <h4>Affidavits & Assets</h4>
                            <p>View the official affidavits filed by candidates, which detail their financial assets, liabilities, and educational qualifications.</p>
                        </div>
                    </div>
                    <div class="step-card">
                        <div class="step-number"><i class="fa-solid fa-building-columns"></i></div>
                        <div class="step-details">
                            <h4>Political Party Disclosures</h4>
                            <p>The ECI also mandates that political parties publish the criminal antecedents of the candidates they have chosen, along with the reasons for their selection.</p>
                        </div>
                    </div>
                </div>
                <div class="info-box">
                    <p><i class="fa-solid fa-mobile-screen"></i> <strong>Accessibility:</strong> You can access this information via the "KYC-ECI" mobile app available on Android and iOS, or through the official ECI portal.</p>
                </div>
            `
        }
    };

    // Helper: Simulate typing effect for assistant
    const updateAssistantMessage = (htmlContent) => {
        assistantMessage.classList.add('hidden');
        typingIndicator.classList.remove('hidden');

        // Simulate thinking/typing delay
        setTimeout(() => {
            typingIndicator.classList.add('hidden');
            assistantMessage.innerHTML = htmlContent;
            assistantMessage.classList.remove('hidden');
        }, 800);
    };

    // Topic Selection Logic
    topicCards.forEach(card => {
        card.addEventListener('click', () => {
            const topicKey = card.getAttribute('data-topic');
            const data = topicsData[topicKey];

            if (data) {
                // Update Assistant
                updateAssistantMessage(`<p style="font-size: 1.1rem;">${data.assistantMsg}</p>`);

                // Update Content Area
                contentTitle.textContent = data.title;
                contentBody.innerHTML = data.html;

                // Animate transition
                topicsGrid.classList.add('hidden');
                contentDisplay.classList.remove('hidden');
                initScrollReveal();
            }
        });
    });

    // Back Button Logic
    backBtn.addEventListener('click', () => {
        contentDisplay.classList.add('hidden');
        topicsGrid.classList.remove('hidden');

        // Reset Assistant
        updateAssistantMessage(defaultAssistantHTML);
    });

    // Simple Navigation Logic
    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            navBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            e.target.classList.add('active');

            // For this demo, clicking nav buttons mostly resets to home view
            if (e.target.id === 'homeBtn') {
                contentDisplay.classList.add('hidden');
                topicsGrid.classList.remove('hidden');
                updateAssistantMessage(defaultAssistantHTML);
            } else if (e.target.id === 'timelineBtn') {
                // Manually trigger timeline click
                document.querySelector('[data-topic="timeline"]').click();
            } else if (e.target.id === 'aboutBtn') {
                updateAssistantMessage(`
                    <h2 class="welcome-title">About ElectAssist</h2>
                    <p>This interactive guide was built to help citizens understand the democratic process.</p>
                `);

                contentTitle.textContent = "About ElectAssist";
                contentBody.innerHTML = `
                    <div class="banner-image" style="margin-bottom: 2rem;">
                        <img src="eci_vote_illustration.png" alt="Indian Citizen Voting Illustration" class="feature-image">
                    </div>
                    <div class="info-box">
                        <p>Democracy works best when everyone participates! Our platform empowers you with the knowledge to navigate the election process with confidence.</p>
                    </div>
                `;

                topicsGrid.classList.add('hidden');
                contentDisplay.classList.remove('hidden');
                initScrollReveal();
            } else if (e.target.id === 'helpBtn') {
                updateAssistantMessage(`
                    <h2 class="welcome-title">AI Help Center</h2>
                    <p>Got a question about the election process? Ask me anything! You can type or use your voice.</p>
                `);

                contentTitle.textContent = "AI Election Assistant";
                contentBody.innerHTML = `
                    <div class="chat-container">
                        <div class="chat-messages" id="chatMessages">
                            <div class="chat-message ai">
                                Hello! I'm your AI Election Assistant. How can I help you today?
                            </div>
                        </div>
                        <div class="chat-input-area">
                            <button class="chat-action-btn" id="voiceBtn" title="Use Voice"><i class="fa-solid fa-microphone"></i></button>
                            <input type="text" class="chat-input" id="chatInput" placeholder="Type your question here...">
                            <button class="chat-action-btn" id="sendBtn" title="Send"><i class="fa-solid fa-paper-plane"></i></button>
                        </div>
                    </div>
                `;

                topicsGrid.classList.add('hidden');
                contentDisplay.classList.remove('hidden');

                initChatLogic();
            }
        });
    });

    let GEMINI_API_KEY = ""; 

    // Fetch the API key from the backend securely
    async function fetchConfig() {
        try {
            const response = await fetch('http://localhost:3000/api/config');
            const data = await response.json();
            GEMINI_API_KEY = data.apiKey;
        } catch (error) {
            console.error("Failed to load API config:", error);
        }
    }
    fetchConfig();

    function initChatLogic() {
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        const voiceBtn = document.getElementById('voiceBtn');
        const chatMessages = document.getElementById('chatMessages');

        function addMessage(sender, text) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-message ${sender}`;
            msgDiv.textContent = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        async function fetchGeminiResponse(userText) {
            if (!GEMINI_API_KEY) {
                return "This is a demo response. To enable real AI responses, please configure your GEMINI_API_KEY in script.js!";
            }
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: "You are an expert on the Indian Election Process. Answer briefly and simply. User asked: " + userText }] }]
                    })
                });
                const data = await response.json();
                if (data.candidates && data.candidates[0].content) {
                    return data.candidates[0].content.parts[0].text;
                } else if (data.error) {
                    console.error("Gemini API Error:", data.error);
                    return "API Error: " + data.error.message;
                }
                console.error("Unexpected response:", data);
                return "Sorry, I couldn't understand the response from the server.";
            } catch (err) {
                console.error(err);
                return "Sorry, there was an error connecting to the AI.";
            }
        }

        async function handleSend() {
            const text = chatInput.value.trim();
            if (!text) return;
            
            // Add user message
            addMessage('user', text);
            chatInput.value = '';
            
            // Add thinking indicator
            const typingId = 'typing-' + Date.now();
            const typingDiv = document.createElement('div');
            typingDiv.className = 'chat-message ai';
            typingDiv.id = typingId;
            typingDiv.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Thinking...';
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Fetch AI Response
            const aiResponseText = await fetchGeminiResponse(text);
            
            // Replace thinking indicator with actual response
            const typingEl = document.getElementById(typingId);
            if(typingEl) typingEl.remove();
            
            addMessage('ai', aiResponseText);
        }

        sendBtn.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });

        // Voice Recognition (Speech to Text)
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            
            recognition.onstart = function() {
                voiceBtn.classList.add('recording');
                chatInput.placeholder = "Listening...";
            };
            
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                chatInput.value = transcript;
                handleSend(); // Auto send after voice input
            };
            
            recognition.onerror = function(event) {
                console.error("Speech error", event);
                voiceBtn.classList.remove('recording');
                chatInput.placeholder = "Type your question here...";
            };
            
            recognition.onend = function() {
                voiceBtn.classList.remove('recording');
                chatInput.placeholder = "Type your question here...";
            };

            voiceBtn.addEventListener('click', () => {
                if (voiceBtn.classList.contains('recording')) {
                    recognition.stop();
                } else {
                    recognition.start();
                }
            });
        } else {
            voiceBtn.style.display = 'none';
        }
    }
});
