/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as FiveStars} from './reviews/fiveStars.jsx'
export {default as UserHome} from './user-home'
export {default as Login} from './login.jsx'
export {default as Signup} from './signup.jsx'
export {default as AllUsers} from './all-users.jsx'

export {default as ShoppingCart} from './shoppingCart/shoppingCart.jsx'
export {default as Checkout} from './checkout/checkout.jsx'
export {default as OrderPreview} from './checkout/orderPreview.jsx'
export {default as Confirmation} from './checkout/confirmation.jsx'

export {default as AllProductsHome} from './products/all-products.jsx'
export {ProductCardView} from './products/product-card.jsx'
export {default as AllReviews} from './reviews/all-reviews.jsx'
export {ReviewCardView} from './reviews/review-card.jsx'
export {default as NewReview} from './reviews/new-review.jsx'
export {default as SingleProduct} from './products/single-product.jsx'
export {default as AddProduct} from './products/addProduct.jsx'
export {default as EditProduct} from './products/editProduct.jsx'
export {default as AllCategories} from './all-categories.jsx'
export {default as CategoryCardView} from './category-card.jsx'

export {default as OrderDetail} from './orders/order-detail.jsx'
export {default as OrderView} from './orders/order-view.jsx'
export {default as AdminSort} from './orders/admin-sort.jsx'
