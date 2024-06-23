

import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalPrice: 0,
  totalItems: 0,
};


export const useCartStore = create(persist((set,get)=>({
    products:INITIAL_STATE.products,
    totalItems:INITIAL_STATE.totalItems,
    totalPrice:INITIAL_STATE.totalPrice,
    addToCart:(item)=>{
        const productsInstate = get().products
        const findProduct = productsInstate.find(each=>each.id===item.id)
        if(findProduct){

  const updatedProducts= productsInstate.map(each=>each.id===findProduct.id?{...findProduct,price:findProduct.price+item.price,quantity:findProduct.quantity+item.quantity}:each)

            set((state)=>({
                products:updatedProducts,
                totalItems:state.totalItems+item.quantity,
                totalPrice:state.totalPrice+item.price
            }))

        }else{
            set(state=>({
                products:[...state.products,item],
                totalItems:state.totalItems+item.quantity,
                totalPrice:state.totalPrice+item.price
            }))
        }
    },
    removeFromCart:(item)=>{
        set(state=>({
            products:state.products.filter(each=>each.id !==item.id),
            totalItems:state.totalItems-item.quantity,
            totalPrice:state.totalPrice-item.price
        }))
    },
    clearFromCart:()=>{
        set(()=>({
            products:[],
            totalItems:0,
            totalPrice:0
        }))
    }
}),{skipHydration:true,name:"cart"}))

// export const useCartStore = create(
//   persist(
//     (set, get) => ({
//       products: INITIAL_STATE.products,
//       totalItems: INITIAL_STATE.totalItems,
//       totalPrice: INITIAL_STATE.totalPrice,
      
//       addToCart: (item) => {
//         const { products, totalPrice, totalItems } = get();
//         const productInState = products.find((product) => product.id === item.id);
        
//         if (productInState) {
//           const updatedProducts = products.map((each) =>
//             each.id === productInState.id
//               ? { ...productInState, price: productInState.price + item.price, quantity: productInState.quantity + item.quantity }
//               : each
//           );
          
//           set(() => ({
//             products: updatedProducts,
//             totalPrice: totalPrice + item.price,
//             totalItems: totalItems + item.quantity,
//           }));
//         } else {
//           set(() => ({
//             products: [...products, item],
//             totalPrice: totalPrice + item.price,
//             totalItems: totalItems + item.quantity,
//           }));
//         }
//       },
      
//       removeFromCart: (item) => {
//         set((state) => ({
//           products: state.products.filter((each) => each.id !== item.id),
//           totalItems: state.totalItems - item.quantity,
//           totalPrice: state.totalPrice - item.price,
//         }));
//       },
      
//       clearFromCart: () => {
//         set(() => ({
//           products: [],
//           totalItems: 0,
//           totalPrice: 0,
//         }));
//       },
//     }),
//     {
//       name: "cart1",
//       skipHydration: true,
//     }
//   )
// );




