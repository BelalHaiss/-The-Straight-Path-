import arabicErrorMessage from '../../Translations/AR/loginUtcAR';
import englishErrorMessage from '../../Translations/EN/loginUtcEN';
export const checkMail = (registerData) => {
  const re = /^([a-zA-Z0-9_\-?\.?]+)@([a-zA-Z]){2,}\.([a-zA-Z]){2,5}$/;
  let problem = false;
  if (!re.test(registerData.email)) {
    problem = true;
  }
  return { problem };
};

export const checkRegister = (state, registerData, lang) => {
  let error = false;
  let message = false;

  if (state === 'signup') {
    if (!registerData.age || registerData.age < 5) {
      return {
        error: 'age',
        message:
          lang === 'ar' ? arabicErrorMessage.age : englishErrorMessage.age
      };
    }

    if (registerData.name.length < 8) {
      return {
        error: 'name',
        message:
          lang === 'ar' ? arabicErrorMessage.name : englishErrorMessage.name
      };
    }
    const usernameREGEX = /^[\w|ء-ي]{4,}$/;
    if (!usernameREGEX.test(registerData.username)) {
      return {
        error: 'username',
        message:
          lang === 'ar'
            ? arabicErrorMessage.username
            : englishErrorMessage.username
      };
    }
    if (!(registerData.type === 'student' || registerData.type === 'teacher')) {
      return {
        error: 'type',
        message:
          lang === 'ar' ? arabicErrorMessage.type : englishErrorMessage.type
      };
    }
    if (!(registerData.gender === 'female' || registerData.gender === 'male')) {
      return {
        error: 'gender',
        message:
          lang === 'ar' ? arabicErrorMessage.gender : englishErrorMessage.gender
      };
    }
    const mail = checkMail(registerData).problem;

    if (mail) {
      return {
        error: 'mail',
        message:
          lang === 'ar' ? arabicErrorMessage.email : englishErrorMessage.email
      };
    }

    if (registerData.password.length < 8) {
      return {
        error: 'password',
        message:
          lang === 'ar'
            ? arabicErrorMessage.password
            : englishErrorMessage.password
      };
    }
  }
  if (state === 'signin') {
    const mail = checkMail(registerData).problem;

    if (mail) {
      return {
        error: 'mail',
        message:
          lang === 'ar' ? arabicErrorMessage.email : englishErrorMessage.email
      };
    }
    if (registerData.password.length < 8) {
      return {
        error: 'password',
        message:
          lang === 'ar'
            ? arabicErrorMessage.password
            : englishErrorMessage.password
      };
    }
  }
  return { error, message };
};
