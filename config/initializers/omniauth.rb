Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, "1044392998929994", "7dc7f75c9c28179d6736002c762ccd83",
    redirect_uri: ""
end
