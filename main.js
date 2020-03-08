const form = document.querySelector('#pwdGeneratorForm');
form.addEventListener('submit', e => requestForPasswordGeneration(e));

const clipboard = document.querySelector("#clipboard");
clipboard.addEventListener('click', e => {
    const pwd = document.querySelector('#password');

    pwd.select();
    document.execCommand('copy')
    alert("Copied the text: " + pwd.value); 
})

function requestForPasswordGeneration(e) {
    e.preventDefault();
    const { pwdLength, capitalCase, lowerCase, number, symbol } = e.target;
    const pwd = new GeneratePassword(pwdLength.value, lowerCase.checked, capitalCase.checked,
        number.checked, symbol.checked);

    const itext = document.querySelector('#password');
    itext.value = pwd.generatePassword();
}

function GeneratePassword(length = 8, isLowerCaseSupported = true,
    isUpperCaseSupported = false, isDigitSupported = true, isSymbolSuported = false) {

    const min_length = 8;
    const max_length = 12;

    if (length < min_length || length > max_length)
        throw "password length should between 8 and 12 (both inclusive)";

    const lowerCase = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const upperCase = "ABCDEFGHIJKLMONPQRSTUVWXYZ".split('');
    const digit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbols = '({}[]()/\'"`~,;:.<>)'.split('');

    var dictionary = [];

    createDictionary = function () {
        if (isLowerCaseSupported)
            dictionary = dictionary.concat(lowerCase);

        if (isUpperCaseSupported)
            dictionary = dictionary.concat(upperCase);

        if (isDigitSupported)
            dictionary = dictionary.concat(digit);

        if (isSymbolSuported)
            dictionary = dictionary.concat(symbols);

        //default 
        if (dictionary.length == 0) {
            dictionary = dictionary.concat(digit, lowerCase, upperCase);
        }
    },

    this.generatePassword = function () {
        createDictionary();
        var dictLength = dictionary.length;

        while (true) {
            var pwd = '';
            for (let index = 0; index < 8; index++) {
                var floor = Math.floor(Math.random() * dictLength);
                pwd += dictionary[floor];
            }

            if (validatePassword(pwd))
                return pwd;
            continue;                 
        }
    },

    validatePassword = function(pwd) {
        if (isLowerCaseSupported && !/[a-z]/.test(pwd))
            return false;

        if (isUpperCaseSupported && !/[A-Z]/.test(pwd))
            return false;

        if (isDigitSupported && !/[0-9]/.test(pwd))
            return false;

        if (isSymbolSuported && !/[({}\[\]()\/\'"`~,;:.<>\)]/.test(pwd))
            return false;

        return true;
    }
}