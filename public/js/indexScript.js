const container = document.querySelector(".container");
const cover = document.querySelector(".formCover");
const body = document.querySelector("body");

const sign_up_btn = document.querySelector("#sign-up-btn");
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

const sign_in_btn = document.querySelector("#sign-in-btn");
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

const sign_up_btn2 = document.querySelector("#sign-up-btn2");
sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});

const sign_in_btn2 = document.querySelector("#sign-in-btn2");
sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
    container.classList.remove("sign-up-mode");
});

const closePopup = document.querySelector(".closeBtn");
closePopup.addEventListener("click", () => {
    container.style.opacity='0';
    container.style.visibility='hidden';
    cover.style.opacity='0';
    cover.style.visibility='hidden';
    body.style.overflow = "auto";
});

const closePopup2 = document.querySelector(".closeBtn2");
closePopup2.addEventListener("click", () => {
    container.style.opacity='0';
    container.style.visibility='hidden';
    cover.style.opacity='0';
    cover.style.visibility='hidden';
    body.style.overflow = "auto";
});

const signupModal = document.querySelector("#openModalSignup");
signupModal.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
    container.classList.add("sign-up-mode2");
    cover.style.visibility='visible';
    cover.style.opacity='1';
    container.style.visibility='visible';
    container.style.opacity='1';
    body.style.overflow = "hidden";
});

const signinModal = document.querySelector("#openModalSignin");
signinModal.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
    container.classList.remove("sign-up-mode2");
    cover.style.visibility='visible';
    cover.style.opacity='1';
    container.style.visibility='visible';
    container.style.opacity='1';
    body.style.overflow = "hidden";
});

const home = document.querySelector("#home");
const aboutUs = document.querySelector("#about");
const contact = document.querySelector("#contact");
const homeContent = document.querySelector("#homeContent");
const aboutUsContent = document.querySelector("#aboutContent");
const contactContent = document.querySelector("#contactContent");

function switchContent (contentID){
    const activeNavi = document.querySelector(".navi.active");
    activeNavi.classList.remove("active");

    const activeContent = document.querySelector(".info.active");
    activeContent.classList.remove("active");

    getID = contentID.id;
    
    if (getID === "home") {
        home.classList.add("active");
        homeContent.classList.add("active");
    }
    if (getID === "about") {
        aboutUs.classList.add("active");
        aboutUsContent.classList.add("active");
    }
    if (getID === "contact") {
        contact.classList.add("active");
        contactContent.classList.add("active");
    }
}




//-----------------------------------------------------------------------------------------------------------
// ----- LOGIN POST REQUEST -----
const loginForm = document.querySelector('#signin');
loginForm.addEventListener('submit', async ev => {
    ev.preventDefault();

    const email = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#loginPassword').value;

    const loginInfo = {
        loginEmail: email,
        loginPassword: password
    };
    await postLogin(loginInfo);
});

const postLogin = async loginInfo => {
    try {
        await axios.post(`${BASE_URL}/api/login`, loginInfo, {withCredentials: true});
        window.location = `${BASE_URL}/${NEXT_PATH}`;
    } catch (error) {
        const loginError = error.response.data.msg;
        const sendMsg = document.querySelector('.loginError');
        sendMsg.innerHTML = loginError;
    }
};


// ----- REGISTER POST REQUEST -----
const registerForm = document.querySelector('#signup');
registerForm.addEventListener('submit', async ev => {
    ev.preventDefault();

    const username = document.querySelector('#registerUsername').value;
    const email = document.querySelector('#registerEmail').value;
    const password = document.querySelector('#registerPassword').value;
    const confPassword = document.querySelector('#registerConfirmPassword').value;

    const registerInfo = {
        registerUsername: username,
        registerEmail: email,
        registerPassword: password,
        registerConfirmPassword: confPassword
    };
    await postRegister(registerInfo);
});

const postRegister = async registerInfo => {
    try {
        const getRes = await axios.post(`${BASE_URL}/api/register`, registerInfo, {withCredentials: true});

        // Register Success
        const sendMsg = document.querySelector('.registerSuccess');
        sendMsg.innerHTML = getRes.data.msg + " Please Login";
        
        // Move into login form
        container.classList.remove("sign-up-mode2");
        container.classList.remove("sign-up-mode");
    } catch (error) {
        const registerError = error.response.data.msg;
        const sendMsg = document.querySelector('.registerError');
        sendMsg.innerHTML = registerError;
    }
};
