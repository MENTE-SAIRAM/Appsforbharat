Backend 

User Routes:
post '/api/users/register' user to register
post '/api/user/login' user to login

Product Routes:
post '/api/products/' to create product by admin
get '/api/products/'  to get all the listed products for users
get '/api/products/:id/' to get the details of product by id 
delete '/api/products/:id/' to get the product by id
put '/api/products/:id/' to update the product details by id

cart Routes:
get '/api/cart/' to get all the products in a user cart
post '/api/cart/add' to get product to the cart
post '/api/cart/remove' to remove the product from the cart

order Routes:
post 'api/orders/' to order the complete cart and clear cart
get  'api/orders/orderhistory' to get the order history 

Middlewares:
validation middleware: validate the data
auth middleware:for aauthorization the users
admin middleware: to handle the admins


