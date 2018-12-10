module.exports.getEmailVerificationTemplate = (name, link) => {
  const template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Email verification</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <style>
      * {
        margin: 0;
      }

      .wrapper {
        color: #666666;
        line-height: 1.4;
        font-family: 'Century Gothic', sans-serif;
        width: 40%;   
        padding: 15px;
      }

      .logo {
        font-size: 2.5em;
        font-weight: 500;
      }

      .greeting {
        font-size: 1.9em;
        padding: 15px 0;
      }

      .major-info {
        font-size: 1.2em;
      }

      .username {
        color: #d35151;
      }

      .verification-link {
        display: inline-block;
        text-decoration: none;
        color: #d1cdcd;
        background: #d35151;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 1.3em;
        transition: 0.3s;
        margin: 20px 0;
      }

      .verification-link:hover {
        background: #504b4b;
      }

    </style>
  </head>
  <body>

    <div class="wrapper">

      <h1 class="logo">BarsHunters</h1>

      <hr size="1px" color="#d1cdcd">

      <p class="greeting">Hi, <span class="username">${name}</span></p>

      <p class="major-info">
        To finish setting up this account, we just need to make sure this email address is yours.
        Simply click the big button below to verify your email address.
      </p>

      <a style="color: #fff;" class="verification-link" href="${link}">Confirm Email</a>
      
      <p color="color: #fff;">or just click the link below</p>
      <br>
      <a href="${link}">${link}</a>
      <br>
      
      <p class="major-info"> 
        If you didn't register on BarsHunters, ignore this email.
        Someone may have made a mistake typing their own email address.
      </p>

      <br>

      <p class="major-info">The BarsHunters team.</p>

    </div>

  </body>
  </html>
  `;
  
  return template;
};




module.exports.getPasswordResetTemplate = (name, link) => {

  const template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Reset password</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <style>
      * {
        margin: 0;
      }
  
      .wrapper {
        color: #666666;
        line-height: 1.4;
        font-family: 'Century Gothic', sans-serif;
        width: 40%;   
        padding: 15px;
      }
  
      .logo {
        font-size: 2.5em;
        font-weight: 500;
      }
  
      .greeting {
        font-size: 1.9em;
        padding: 15px 0;
      }
  
      .major-info {
        font-size: 1.2em;
      }
  
      .username {
        color: #d35151;
      }
  
      .verification-link {
        display: inline-block;
        text-decoration: none;
        color: #d1cdcd;
        background: #d35151;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 1.3em;
        transition: 0.3s;
        margin: 20px 0;
      }
  
      .verification-link:hover {
        background: #504b4b;
      }
  
    </style>
  </head>
  <body>
  
    <div class="wrapper">
    
      <h1 class="logo">BarsHunters</h1>
    
      <hr size="1px" color="#d1cdcd">
    
      <p class="greeting">Forgot your password?</p>
    
      <p class="major-info">
        No need to worry, <span class="username">${name}</span>!
        To reset your password, click the button below.
      </p>
    
      <a style="color: #fff;" class="verification-link" href="${link}">Reset password</a>
      
      <p class="major-info"> 
        If you didn't request a password reset, you can ignore this message.
        Someone probably typed in your email by accident.
      </p>
    
      <br>
    
      <p class="major-info">The BarsHunters team.</p>
    
    </div>
  
  </body>
  </html>
  `;

  return template;
};


module.exports.getNotificationTemplate = () => {

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  const resetPasswordPage = 'http://localhost:4200/BarsHunters/forgot-pw';

  const template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Notification</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <style>
      * {
        margin: 0;
      }
  
      .wrapper {
        color: #666666;
        line-height: 1.4;
        font-family: 'Century Gothic', sans-serif;
        width: 40%;   
        padding: 15px;
      }
  
      .logo {
        font-size: 2.5em;
        font-weight: 500;
      }
  
      .topic {
        font-size: 1.7em;
        padding: 15px 0;
        color: #d35151;
      }
  
      .major-info {
        font-size: 1.2em;
        padding-bottom: 12px;
      }
  
      .main-words {
        color: #d35151;
      }
  
    </style>
  </head>
  <body>
  
    <div class="wrapper">
    
      <h1 style="color: #666666;" class="logo">BarsHunters</h1>
    
      <hr size="1px" color="#d1cdcd">
    
      <p class="topic">Your password has been changed!</p>
    
      <p class="major-info">
        This is a confirmation that your password was changed at
        <span class="main-words">${new Date().toLocaleString('en-US', options)}</span>.
      </p>
      
      <p style="color: #666666;" class="major-info">If this was you, then you can safely ignore this email.</p>
      
      <p style="color: #666666;" class="major-info"> 
        If this wasn't you, your account has been compromised. 
        Please, <a style="color: #d35151;" href="${resetPasswordPage}">reset your password</a> 
        or contact <a href="mailto:supportBH@gmail.com" style="color: #d35151;">supportBH@gmail.com</a>.
      </p>
    
      <br>
    
      <p style="color: #666666;" class="major-info">The BarsHunters team.</p>
    
    </div>
  
  </body>
  </html>
  `;
  
  return template;
};