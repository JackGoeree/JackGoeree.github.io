
var nodemailer = require('nodemailer');

function validateEmail () {

    var email = document.getElementById('reply-email').value;
  
    if(email.length == 0) {
  
      producePrompt('Please enter a reply email address.','email-error', 'red');
      return false;
  
    }
  
    if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    
        producePrompt('Email invalid.', 'email-error', 'red');
        return false;
    
    }
  
    producePrompt('Valid', 'email-error', 'green');
    return true;
  
  }


function validateMessage() {
    var message = document.getElementById('message').value;
    var required = 1;
    var left = required - message.length;

    if (left > 0) {
    producePrompt("At least " + left + ' more character required.','message-error','red');
    return false;
    }

    producePrompt('Valid', 'message-error', 'green');
    return true;


}

function validateHoneypot() {
    var message = document.getElementById('honeypot').value;
    if (message.length > 0) {
    producePrompt("Please leave this blank.",'honeypot-error','red');
    return false;
    }

    producePrompt('Valid', 'honeypot-error', 'green');
    return true;


}

function validateForm() {
    if (!validateEmail() || !validateMessage() || !validateHoneypot()) {
    jsShow('submit-error');
    producePrompt('Please fix errors to submit.', 'submit-error', 'red');
    setTimeout(function(){jsHide('submit-error');}, 2000);
    return false;
    }
    else {
        // send the email
        sendEmail(message)
        // include reply email address
    }
}

function jsShow(id) {
    document.getElementById(id).style.display = 'block';
}

function jsHide(id) {
    document.getElementById(id).style.display = 'none';
}


function producePrompt(message, promptLocation, color) {

    document.getElementById(promptLocation).innerHTML = message;
    document.getElementById(promptLocation).style.color = color;

}



function sendEmail(message) {

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: jack_email,
        pass: jack_password
      }
    });
    
    var mailOptions = {
      from: jack_email,
      to: jack_email,
      subject: '',
      text: message
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}