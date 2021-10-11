export const checkMail = (registerData) => {
  const re = /^([a-zA-Z0-9_\-?\.?]+)@([a-zA-Z]){2,}\.([a-zA-Z]){2,5}$/;
  let problem = false;
  if (!re.test(registerData.email)) {
    problem = true;
  }
  return { problem };
};

export const checkRegister = (state, registerData) => {
  let error = false;
  let message = false;

  if (state === 'signup') {
    if (registerData.name.length < 8) {
      return {
        error: 'name',
        message: 'برجاء ادخال الاسم كاملا'
      };
    }
    const usernameREGEX = /^[\w|ء-ي]{4,}$/;
    if (!usernameREGEX.test(registerData.username)) {
      return {
        error: 'username',
        message: 'تاكد من عدم وجود مسافة او استخدام رموز خاصة ولا يقل عن 4 احرف'
      };
    }

    if (!(registerData.gender === 'female' || registerData.gender === 'male')) {
      return {
        error: 'gender',
        message: 'برجاء تحديد الجنس'
      };
    }
    const mail = checkMail(registerData).problem;

    if (mail) {
      return {
        error: 'mail',
        message: 'البريد الالكتروني خطا'
      };
    }

    if (registerData.password.length < 8) {
      return {
        error: 'password',
        message: 'كلمة السر لا تقل عن 8 احرف'
      };
    }
  }
  if (state === 'signin') {
    const mail = checkMail(registerData).problem;

    if (mail) {
      return {
        error: 'mail',
        message: 'البريد الالكتروني خطا'
      };
    }
    if (registerData.password.length < 8) {
      return {
        error: 'password',
        message: 'كلمة السر لا تقل عن 8 احرف'
      };
    }
  }
  return { error, message };
};
