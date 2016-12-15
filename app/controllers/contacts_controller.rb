class ContactsController < ApplicationController
  
  # GET request to /contact-us
  # Show new contact form
  def new
    @contact = Contact.new
  end
  
  # POST request to /contacts
  def create
    # Mass assignment of form fields into contact object
    @contact = Contact.new(contact_params)
    # Save the contact object into the database
    if @contact.save
      # Store form fields via parameters into variables
      name = params[:contact][:name]
      email = params[:contact][:email]
      body = params[:contact][:comments]
      # PLug variables into ContactMailer method and send email
      ContactMailer.contact_email(name, email, body).deliver
      # Store success message in flash hash
      flash[:success] = "Message sent."
      # Redirect to new action
      redirect_to new_contact_path
      
    else
      # If contact object doesn't save store errors in flash hash
      flash[:danger] = @contact.errors.full_messages.join(", ")
      # Redirect to new page anyway
      redirect_to new_contact_path
    end
  end
        
  private
  # To collect data from form we need to use strong parameters
  # Whitelist form fields
    def contact_params
      params.require(:contact).permit(:name, :email, :comments)
    end
  
    
end