
// Define the character sets to be used for password generation
const characterSets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  digits: '0123456789',
  special: '!@#$%^&*()_+~`|}{[]\:;?><,./-='
};
const languages = {
  en: {
    title:"Password Generator",
    uppercase: "Include uppercase letters",
    lowercase: "Include lowercase letters",
    numbers: "Include numbers",
    symbols: "Include symbols",
    generate: "Generate Password",
    copy: "Copy to Clipboard",
    copyM: "Password has been copied!",
    length: "Password length:",
    success: "Password copied to clipboard!",
    error: "Unable to copy password to clipboard",
    show:"Show password",
    en:"English",
    fr:"French",
    de:"German",
    a:"Language",
    pass:"Password",
    options:"Options:",
    errorOptions:"At least one option must be selected!",
  },
  fr: {
    title:"Générateur de mot de passe",
    uppercase: "Inclure des lettres majuscules",
    lowercase: "Inclure des lettres minuscules",
    numbers: "Inclure des chiffres",
    symbols: "Inclure des symboles",
    generate: "Générer un mot de passe",
    copy: "Copier dans le presse-papiers",
    copyM: "Le mot de passe a été copié!",
    length: "Longueur du mot de passe:",
    success: "Mot de passe copié dans le presse-papiers !",
    error: "Impossible de copier le mot de passe dans le presse-papiers",
    show:"Afficher le mot de passe",
    en:"Anglais",
    fr:"Français",
    de:"Allemand",
    a:"Langue",
    pass:"Mot de passe",
    options:"Options:",
    errorOptions:"Au moins une option doit être sélectionnée!",
  },
  de: {
    title:"Passwort-Generator",
    uppercase: "Großbuchstaben einschließen",
    lowercase: "Kleinbuchstaben einschließen",
    numbers: "Zahlen einschließen",
    symbols: "Symbole einschließen",
    generate: "Passwort generieren",
    copy: "In Zwischenablage kopieren",
    copyM: "Das Passwort wurde kopiert!",
    length: "Passwortlänge:",
    success: "Passwort in Zwischenablage kopiert!",
    error: "Passwort konnte nicht in Zwischenablage kopiert werden",
    show:"Passwort anzeigen",
    en:"Englisch",
    fr:"Französisch",
    de:"Deutsch",
    a:"Sprache",
    pass:"Passwort",
    options:"Optionen:",
    errorOptions:"Mindestens eine Option muss ausgewählt sein!",
  },
};
let error1 = false;
// Get the select element
const languageSelect = document.getElementById('language');
const lengthRange = document.getElementById('range');
const lengthInput = document.getElementById('length');
const passwordInput = document.getElementById('password');
const progressBar = document.getElementById("progress-bar");
const copy = document.getElementById("copy");
const copyM = document.getElementById("copy-m");
// Add an event listener to the select element
languageSelect.addEventListener('change', function() {
  // Get the selected language
  const selectedLanguage = languageSelect.value;

  // Get the language object for the selected language
  const lang = languages[selectedLanguage];

  // Update the text content of the elements based on the selected language
  document.documentElement.setAttribute('lang',selectedLanguage)
  document.getElementById('title-t').textContent = lang.title;
  document.getElementById('uppercase-t').textContent = lang.uppercase;
  document.getElementById('lowercase-t').textContent = lang.lowercase;
  document.getElementById('digits-t').textContent = lang.numbers;
  document.getElementById('special-t').textContent = lang.symbols;
  document.getElementById('generate-button').textContent = lang.generate;
  document.getElementById('length-t').textContent = lang.length;
  document.getElementById('show-t').textContent = lang.show;
  document.getElementById('lang-en').textContent = lang.en;
  document.getElementById('lang-fr').textContent = lang.fr;
  document.getElementById('lang-de').textContent = lang.de;
  document.getElementById('lang-a').textContent = lang.a;
  document.getElementById('options').textContent = lang.options;
  document.getElementById('options').insertAdjacentHTML('beforeend', ' <span id="option-error"></span>');
  document.getElementById('pass').textContent = lang.pass;
  copy.setAttribute("data-bs-original-title",lang.copy);
  copyM.textContent = lang.copyM;
  if (error1) {
    document.getElementById("option-error").textContent = lang.errorOptions;
  }
});

// Function to generate a random password
function generatePassword(length, options) {
  let password = '';
  let charset = '';
  passwordInput.classList.remove('text-danger');
  for (const option in options) {
    if (options[option]) {
      charset += characterSets[option];
    }
  }
  for (let i = 0; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  // remove desabled
  copy.removeAttribute("disabled");
  passwordStrength(password);
  checkPasswordLength(password)
  return password;
}

// Function to copy password to clipboard
function copyPasswordToClipboard(password) {
  const input = document.createElement('input');
  input.value = password;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}

// Event listener for form submission
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  const length = lengthRange.value; // Change this to the desired length of the password
  const language = document.querySelector('#language').value;
  const options = {
    lowercase: document.querySelector('#lowercase').checked,
    uppercase: document.querySelector('#uppercase').checked,
    digits: document.querySelector('#digits').checked,
    special: document.querySelector('#special').checked
  };  
  const password = generatePassword(length, options);
  document.querySelector('#password').value = password;
});

// Event listener for "Copy to clipboard" button
copy.addEventListener('click', function(event) {
  const password = document.querySelector('#password').value;
  const toastEl = document.querySelector(".toast");
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
  copyPasswordToClipboard(password);
});

// Event listener for "Show password" checkbox
document.querySelector('#show').addEventListener('change', function(event) {
  const passwordInput = document.querySelector('#password');
  if (event.target.checked) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});


// Add an event listener to the range input
lengthRange.addEventListener('input', function() {
  // Update the value of the input element with the value of the range element
  lengthInput.textContent = lengthRange.value;
});

function passwordStrength(password) {

  // Calculate password strength
  let strength = 0;
  if (password.length > 8 ) {
    strength += 1;
  }
  if (password.match(/[a-z]/)) {
    strength += 1;
  }
  if (password.match(/[A-Z]/)) {
    strength += 1;
  }
  if (password.match(/[0-9]/)) {
    strength += 1;
  }
  if (password.match( /(.*[!@#$%^&*()_+~`|}{[\]\\:;?><,./-=]){2,}.*/)) {
    strength += 2;
  }
  else if (password.match(/[!@#$%^&*()_+~`|}{[\]\\:;?><,./-=]/)) {
    strength += 1;
  }
  
  const strengthPercentage = Math.round(strength * 16.67);
  updateProgressBar(strengthPercentage);
};

function setColor(value) {
  if (value <= 20) {
    progressBar.classList.add("bg-danger");
    progressBar.classList.remove("bg-warning", "bg-info", "bg-success", "bg-purple");
  } else if (value <= 40) {
    progressBar.classList.add("bg-warning");
    progressBar.classList.remove("bg-danger", "bg-info", "bg-success", "bg-purple");
  } else if (value <= 60) {
    progressBar.classList.add("bg-info");
    progressBar.classList.remove("bg-danger", "bg-warning", "bg-success", "bg-purple");
  } else if (value <= 80) {
    progressBar.classList.add("bg-success");
    progressBar.classList.remove("bg-danger", "bg-warning", "bg-info", "bg-purple");
  } else {
    progressBar.style.backgroundColor = "#800080";
    progressBar.classList.remove("bg-danger", "bg-warning", "bg-info", "bg-success");
  }
}
function updateProgressBar(value) {
  progressBar.style.width = value + "%";
  progressBar.setAttribute("aria-valuenow", value);
  setColor(value);
}

function checkOptions() {
  const checkboxes = document.querySelectorAll('.check-list');
  const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
  if (!isChecked) {
    document.getElementById('options').classList.add("text-danger")
    document.querySelector("#option-error").textContent =  languages[languageSelect.value].errorOptions;
    document.querySelector("#generate-button").disabled = true;
    error1 = true;

  }else {
    document.getElementById('options').classList.remove("text-danger")
    document.querySelector("#option-error").textContent =  "";
    document.querySelector("#generate-button").disabled = false;
    error1 = false;
  }
}
document.querySelectorAll('.check-list').forEach(checkbox => {
  checkbox.addEventListener('change', checkOptions);
});
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));

tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
  const passwordInput1 = document.querySelector("#password");
  const copyButton = document.querySelector("#copy");

  function checkPasswordLength(password) {
    const inputWidth = passwordInput1.offsetWidth;
    const myTextArea = document.getElementById("password-textarea"); 
    if (myTextArea) {
      console.log("textArea exist");
      myTextArea.remove();
    }   
    if (password.length > 43) {
      console.log("pass: ",password);
      passwordInput1.style.display = "none";
      passwordInput1.insertAdjacentHTML("afterend", `<textarea class="form-control" rows="3" id="password-textarea" readonly>${password}</textarea>`);
      copyButton.disabled = false;
      document.querySelector('#show').style.display = "none";
      document.querySelector('#show-t').style.display = "none";
    } else {
      passwordInput.style.display = "block"; 
      document.querySelector('#password').value = password;
      copyButton.disabled = false;
      document.querySelector('#show').style.display = "block";
      document.querySelector('#show-t').style.display = "block";
    }
  }



