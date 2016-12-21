/* global $ */
/* global Stripe */
// Document ready function
$(document).on('turbolinks:load',function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  // set stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content'));
  // when user clicks form submit button
  submitBtn.click(function(event){
    // prevent default submission behaviour
    event.preventDefault();
    submitBtn.val('Processing...').prop('disabled',true);
    
    // collect the credit card fields
    var ccNum = $('#card_number').val(), 
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    
    var error = false;
    
    // Valdate card number.
    if (!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert('The credit card number appears to be invalid')
    };
    
    // Valdate cvc number.
    if (!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('The security code appears to be invalid')
    };
    
    // Valdate expiration date.
    if (!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert('The expiration date appears to be invalid')
    };
    
    if (error) {
      // if there are card errors, don't send to stripe.
      submitBtn.prop('disabled', false).val('Sign Up');
      
    } else {
      // send the card info to stripe
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
      
    };
    
    
    return false;
  });
  
  // stripe will return card token
  function stripeResponseHandler(status, response) {
    // Get token from response
    var token = response.id;
    
    // Inject the card toek into a hidden field
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
    // submit form to the rails app
    theForm.get(0).submit();
  }
});
